import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: Number, required: true },
  duration: { type: String, required: true },
  locations: { type: mongoose.Schema.Types.Mixed },
});


export const Tour = mongoose.model('City', tourSchema);