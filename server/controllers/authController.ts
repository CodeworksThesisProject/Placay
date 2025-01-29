import { Request, Response } from "express";

export const checkAuth = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};