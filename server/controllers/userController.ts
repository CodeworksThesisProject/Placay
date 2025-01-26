import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "User already exists" });
    
    if (password.length < 6) return res.status(400).json({ error: "password is too short" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = newUser.generateAuthToken();
    res.status(201).json({ token, user: newUser });
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
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
