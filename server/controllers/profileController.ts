import { Request, Response } from "express";
import { User } from "../models/userModel";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};