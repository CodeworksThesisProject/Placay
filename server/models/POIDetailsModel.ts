import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
  point_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String},
  phone: { type: String},
  images: { type: mongoose.Schema.Types.Mixed },
});


export const Details = mongoose.model('Details', detailsSchema);
