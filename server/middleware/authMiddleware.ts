import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret") as { _id: string };
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
