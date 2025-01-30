import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { User, IFavorite } from "../models/userModel";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = req.body;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, label } = req.body;
    const user = req.body;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ error: "Invalid location data" });
    }

    const newFavorite = {
      _id: new mongoose.Types.ObjectId(),
      latitude,
      longitude,
      label,
    };

    user.favorites.push(newFavorite);
    await user.save();

    res.status(201).json({ message: "Favorite added successfully", favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const favoriteId = req.params.id;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const favoriteIndex = user.favorites.findIndex((fav: IFavorite) => fav._id.toString() === favoriteId);

    if (favoriteIndex === -1) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    user.favorites.splice(favoriteIndex, 1);
    await user.save();

    res.status(200).json({ message: "Favorite removed successfully", favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageFile = req.files.image as UploadedFile;
    const uploadDir = path.join(__dirname, "../../uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    imageFile.mv(filePath, async (err: any) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }

      user.profileImage = `/uploads/${fileName}`;
      await user.save();

      res.status(200).json({ message: "Profile image updated", profileImage: user.profileImage });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. So sorry" });
  }
};