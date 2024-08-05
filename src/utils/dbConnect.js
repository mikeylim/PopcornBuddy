import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current connection
    return;
  }
  // Use new database connection
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('MongoDB connected successfully.');
};

export default connectDB;
