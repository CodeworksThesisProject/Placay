import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel";

interface AdminRequest extends Request {
  user?: IUser;
}

export const adminMiddleware = (req: AdminRequest, res: Response, next: NextFunction): void => {
  
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only. Sorry" });
    return;
  }

};