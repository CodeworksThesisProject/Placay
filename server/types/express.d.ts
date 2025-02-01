import { IUser } from "../models/userModel";

declare namespace Express {
  export interface Request {
    user?: IUser;
  }
}