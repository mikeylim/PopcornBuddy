// // pages/api/auth/signup.js
// import connectDB from '@/utils/dbConnect';
// import User from '@/utils/userModel';

// const handler = async (req, res) => {
//   const { method } = req;
//   await connectDB();

//   switch (method) {
//     case 'POST':
//       try {
//         const { firstName, lastName, email, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           return res.status(400).json({ success: false, error: 'Email already in use' });
//         }

//         // Create a new user
//         const newUser = new User({
//           firstName,
//           lastName,
//           email,
//           password
//         });

//         await newUser.save();
//         res.status(201).json({ success: true, data: { id: newUser._id, email: newUser.email } });
//       } catch (error) {
//         console.error('Signup error:', error);
//         if (error.code === 11000) {
//           res.status(400).json({ success: false, error: 'Email already in use' });
//         } else {
//           res.status(500).json({ success: false, error: 'An unexpected error occurred' });
//         }
//       }
//       break;
//     default:
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// };

// export default handler;

// pages/api/auth/signup.js
import connectDB from "@/utils/dbConnect";
import User from "@/utils/userModel";

connectDB();

export default async (req, res) => {
	const { method } = req;

	if (method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Create new user
		const user = new User({
			firstName,
			lastName,
			email,
			password,
		});

		await user.save();

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.error("Signup error:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
