// utils/dbConnect.js
import mongoose from "mongoose";

const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		// Use current connection
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully.");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

export default connectDB;
