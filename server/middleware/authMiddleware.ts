import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

process.env.NODE_ENV == 'develop'
  ? require('dotenv').config({ path: '.env.development.local' })
  : require('dotenv').config({ path: '.env.production.local' })

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { _id: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};