import connectDB from "@/utils/dbConnect";
import User from "@/utils/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

connectDB();

export default async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { firstName, lastName, email, password } = req.body;
    console.log('Sign up request received:', { firstName, lastName, email });

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 600,
      sameSite: "strict",
      path: "/"
    }));

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};


// // pages/api/auth/signup.js
// import connectDB from "@/utils/dbConnect";
// import User from "@/utils/userModel";

// connectDB();

// export default async (req, res) => {
// 	const { method } = req;

// 	if (method !== "POST") {
// 		return res.status(405).json({ error: "Method not allowed" });
// 	}

// 	const { firstName, lastName, email, password } = req.body;

// 	if (!firstName || !lastName || !email || !password) {
// 		return res.status(400).json({ error: "All fields are required" });
// 	}

// 	try {
// 		// Check if user already exists
// 		const existingUser = await User.findOne({ email });
// 		if (existingUser) {
// 			return res.status(400).json({ error: "User already exists" });
// 		}

// 		// Create new user
// 		const user = new User({
// 			firstName,
// 			lastName,
// 			email,
// 			password,
// 		});

// 		await user.save();

// 		res.status(201).json({ message: "User created successfully" });
// 	} catch (error) {
// 		console.error("Signup error:", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };