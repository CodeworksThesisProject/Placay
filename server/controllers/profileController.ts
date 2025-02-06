import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { User } from "../models/userModel";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const user = await User.findById(userId);

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

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { name, email, password, profileImage } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
      }
      user.password = password;
    }

    if (req.files && req.files.profileImage) {
      const imageFile = req.files.profileImage as UploadedFile;

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      await new Promise<void>((resolve, reject) => {
        imageFile.mv(filePath, (err: any) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      if (user.profileImage && user.profileImage.startsWith("/uploads/")) {
        const oldImagePath = path.join(process.cwd(), user.profileImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
      }

      user.profileImage = `/uploads/${fileName}`;
    } else if (profileImage) {

      if (user.profileImage && user.profileImage.startsWith("/uploads/")) {
        const oldImagePath = path.join(process.cwd(), user.profileImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
      }

      user.profileImage = profileImage;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.files || !req.files.profileImage) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageFile = req.files.profileImage as UploadedFile;

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    imageFile.mv(filePath, async (err: any) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }

      if (user.profileImage && user.profileImage.startsWith("/uploads/")) {
        const oldImagePath = path.join(process.cwd(), user.profileImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
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
//Get /user/likedTour/:userId => get all tours which user liked
export const getUsersLikedTour = async (req: Request, res: Response) => {
  try {
    const {  userId } = req.params;
    const user = await User.findById(userId).populate("likedTours");;
    
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (!user.likedTours) {
      user.likedTours = [];
    }

    res.json({ message: "liked tour is send", tours: user.likedTours });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

//get /user/like/:userId/:tourId => check if current tour is liked by user
export const checkLikeTour = async (req: Request, res: Response) => {
  try {
    const {  userId, tourId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (!user.likedTours) {
      user.likedTours = [];
    }

    const exists = user.likedTours.some((tour) => tour.toString() === tourId);

    res.json({ message: "Liked tour status of user sent", response: exists });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};