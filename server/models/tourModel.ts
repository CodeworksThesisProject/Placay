import mongoose, { Document, Schema } from "mongoose";


export interface ITour extends Document {
  user_id: string;       // User ID of the user
  title: string;
  duration?: string;
  like?: Number,
  location: {
    latitude: number;
    longitude: number;
    name?: string;
    googlePOIId?: string;
  }[];

  //TODO for feature
  destination?: string;   // Where we're going
  startDate?: Date;       // Start of the Tour
  endDate?: Date;         // End of the tour
}

// Model for the whole Tour
const tourPlaceSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String, required: false },
  googlePOIId: { type: String, required: false },
});

const tourSchema = new Schema(
  {
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    like: Number,
    location : [tourPlaceSchema],
  },
  { timestamps: true }
);


export const Tour = mongoose.model<ITour>("Tour", tourSchema);