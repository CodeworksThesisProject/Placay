import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const HOST = process.env.Host || '127.0.0.1'
    const DATABASE = process.env.DATABASE || 'placay'
    const conn = await mongoose.connect(`mongodb://${HOST}:27017/${DATABASE}`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
