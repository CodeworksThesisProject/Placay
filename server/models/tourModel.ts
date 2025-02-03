import mongoose, { Schema, Document } from "mongoose";

// Model for the whole Tour
export interface ITour extends Document {
  user_id: string;       // User ID of the user
  title: string;         // Name of the Tour
  destination: string;   // Where we're going
  startDate: Date;       // Start of the Tour
  endDate: Date;         // End of the tour
  duration?: number;     // Calculated duration in days
  days: ITourDay[];      // Different Days with different places
}

// Model for one day on the Tour
export interface ITourDay {
  _id: mongoose.Types.ObjectId;
  date: Date;
  locations: ITourPlace[]; // Save many places for one tour
}

// Model for Places on one selected day
export interface ITourPlace {
  _id: mongoose.Types.ObjectId;
  label?: string;
  latitude: number;
  longitude: number;
}

const tourPlaceSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  label: { type: String },
  googlePOIId: { type: String },
});

const tourDaySchema = new Schema({
  date: { type: Date, required: true },
  locations: [tourPlaceSchema],
});

const tourSchema = new Schema(
  {
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [tourDaySchema],
  },
  { timestamps: true }
);

tourSchema.virtual('duration').get(function(this: ITour) {
  const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

tourSchema.set('toJSON', { virtuals: true });
tourSchema.set('toObject', { virtuals: true });

export const Tour = mongoose.model<ITour>("Tour", tourSchema);