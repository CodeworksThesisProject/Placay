import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/userModel";

interface AdminRequest extends Request {
  user?: IUser;
}

export const profileMiddleware = async (req: AdminRequest, res: Response, next: NextFunction): Promise<void> => {

  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    res.status(401).json({ error: "Unauthorized. No cookies provided." });
    return;
  }

  const cookies = cookieHeader.split(";").reduce((acc: Record<string, string>, cookie) => {
    const [key, ...value] = cookie.split("=");
    acc[key.trim()] = decodeURIComponent(value.join("="));
    return acc;
  }, {});

  const token = cookies?.[process.env.COOKIE_NAME || "token"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ error: "Unauthorized. User not found." });
      return;
    }
    req.body = user;

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ error: "Invalid token." });
  }
};