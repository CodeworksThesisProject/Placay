import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  latitude: number;
  longitude: number;
  label?: string;
}

const favoriteSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    label: { type: String },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model<IFavorite>("Favorite", favoriteSchema);