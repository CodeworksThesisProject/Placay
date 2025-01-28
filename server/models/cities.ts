import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  pointsOfInterest: { type: mongoose.Schema.Types.Mixed },
});


export const City = mongoose.model('City', citySchema);
