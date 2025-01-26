import { NextFunction, Request, Response } from "express";

// Wrap async route handlers to catch errors
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
