import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jsonWebTokenKey = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "No token, authorization denied" });
    console.log("No token provided");
    return;
  }

  try {
    const decoded = jwt.verify(token, jsonWebTokenKey) as { _id: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
