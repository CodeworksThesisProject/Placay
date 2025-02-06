import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  name?: string;
  latitude: number;
  longitude: number;
  googlePOIId?: string;
}

const favoriteSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    googlePOIId: { type: String }
  },
  { timestamps: true }
);

export const Favorite = mongoose.model<IFavorite>("Favorite", favoriteSchema);