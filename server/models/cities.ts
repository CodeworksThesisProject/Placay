import mongoose from 'mongoose';

const pointOfInterestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  categoyy: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});


const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  pointsOfInterest: [pointOfInterestSchema],
});


export const City = mongoose.model('City', citySchema);
