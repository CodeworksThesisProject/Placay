import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const HOST = process.env.DB_HOST || '127.0.0.1';
    const DATABASE = process.env.DB_NAME || 'placay';
    const conn = await mongoose.connect(`mongodb://${HOST}:27017/${DATABASE}`);

    console.log(`MongoDB Connected: ${conn.connection.host} on DB: ${DATABASE}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
