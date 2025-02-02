import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export {};