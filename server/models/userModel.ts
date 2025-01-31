import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
  favorites: IFavorite[];
  generateAuthToken(): string;
}

export interface IFavorite {
  _id: mongoose.Types.ObjectId;
  latitude: number;
  longitude: number;
  label?: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: { type: String, default: "" },
    favorites: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.generateAuthToken = function (): string {
  const user = this as IUser;

  const jsonWebTokenKey = process.env.JWT_SECRET || "your_jwt_secret";
  const token = jwt.sign({ id: this._id, }, jsonWebTokenKey, {
    expiresIn: "1h",
  });
  return token;
};

export const User = mongoose.model<IUser>("User", userSchema);