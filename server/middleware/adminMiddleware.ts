import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel";

interface AdminRequest extends Request {
  user?: IUser;
}

process.env.NODE_ENV == 'develop'
  ? require('dotenv').config({ path: '.env.development.local' })
  : require('dotenv').config({ path: '.env.production.local' })

export const adminMiddleware = (req: AdminRequest, res: Response, next: NextFunction): void => {
  
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only. Sorry" });
    return;
  }

};