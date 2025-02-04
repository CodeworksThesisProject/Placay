import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profileImage } = req.body;
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";
    const fullProfileImagePath = "/asserts/images/profilePictures/" + profileImage;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    if (password.length < 6)
      return res.status(400).json({ error: "password is too short" });

    const newUser = new User({ name, email, password, role, profileImage: fullProfileImagePath });
    await newUser.save();

    const token = newUser.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res
      .status(201)
      .json({ message: "Registration successful!", user: newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

 
    const token = user.generateAuthToken();
 
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful!", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: false });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Error logging out" });
  }
};