// pages/api/auth/login.js
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
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ success: false, error: "Invalid username or password. Please try again." });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ success: false, error: "Invalid username or password. Please try again." });
    }

    // Generate JWT token with 10 minutes expiration time
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

    // Set the token in a HttpOnly cookie
    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 600,
      sameSite: "strict",
      path: "/"
    }));

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "An unexpected error occurred" });
  }
};