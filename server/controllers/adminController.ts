import { Request, Response } from "express";
import { User } from "../models/userModel";
import fs from "fs";
import path from "path";
import { UploadedFile } from "express-fileupload"

// Fetch all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let profileImagePath;

    if (req.files && req.files.profileImage) {
      const imageFile = req.files.profileImage as UploadedFile;

      const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      imageFile.mv(filePath, (err) => {
        if (err) {
          console.error("File upload error:", err);
          return res.status(500).json({ message: "File upload failed" });
        }
      });

      profileImagePath = `/uploads/${fileName}`;
    } else if (req.body.profileImage) {
      profileImagePath = req.body.profileImage;
    }

    const newUser = new User({ name, email, password, role, profileImage: profileImagePath });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to add user", error: error.message });
  }
};

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role, profileImage } = req.body;
    let profileImagePath: string | undefined = profileImage || undefined;

    const userBeforeUpdate = await User.findById(id);

    if (req.files && req.files.profileImage) {
      const imageFile = req.files.profileImage as UploadedFile;

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      imageFile.mv(filePath, (err) => {
        if (err) {
          console.error("File upload error:", err);
          return res.status(500).json({ message: "File upload failed" });
        }
      });

      profileImagePath = `/uploads/${fileName}`;

      if (
        userBeforeUpdate &&
        userBeforeUpdate.profileImage &&
        userBeforeUpdate.profileImage.startsWith("/uploads/")
      ) {
        const oldImagePath = path.join(process.cwd(), userBeforeUpdate.profileImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
      }
    } else if (profileImagePath) {
      if (
        !profileImagePath.startsWith("/uploads/") &&
        userBeforeUpdate &&
        userBeforeUpdate.profileImage &&
        userBeforeUpdate.profileImage.startsWith("/uploads/")
      ) {
        const oldImagePath = path.join(process.cwd(), userBeforeUpdate.profileImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
      }
    }

    const updateData: any = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
    };

    if (profileImagePath !== undefined) {
      updateData.profileImage = profileImagePath;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully updated", user });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted", user });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};