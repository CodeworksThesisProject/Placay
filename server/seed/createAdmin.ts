import dotenv from 'dotenv';
import { connectDB } from "../config/db";
import { User } from "../models/userModel";
// The userModel contains the function to hash the password, so no need to do it here

dotenv.config({ path: process.env.NODE_ENV === 'develop' ? '.env.development.local' : '.env.production.local' });

const createAdminUser = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("An admin user already exists, no need to create one. E-Mail of admin:", existingAdmin.email);
      process.exit();
    }

    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "admin1",
      role: "admin",
      profileImage: "/asserts/images/profilePictures/default-profile-picture.png",
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