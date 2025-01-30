import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";

process.env.NODE_ENV == 'develop'
  ? require('dotenv').config({ path: '.env.development.local' })
  : require('dotenv').config({ path: '.env.production.local' });

const createAdminUser = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("admin", 10);

    const adminUser = new User({
      name: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created:", adminUser);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("DB_NAME:", process.env.DB_NAME);

  } catch (error) {
    console.error("Error creating admin user:", (error as Error).message);
  } finally {
    process.exit();
  }
};

createAdminUser().catch((err) => console.error(err));