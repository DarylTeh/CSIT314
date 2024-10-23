import mongoose from 'mongoose';

const priceChangeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const CarSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  coeLeft: { type: String, required: true },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
  transmission: { type: String, enum: ['Automatic', 'Manual', 'CVT'], required: true },
  category: { type: String, enum: ['new', 'used'], required: true },
  engineCapacity: { type: Number, required: true },
  seatingCapacity: { type: Number, required: true },
  color: { type: String, required: true },
  imageUrl: { type: String, required: false },
  ownerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  priceHistory: [priceChangeSchema],
  views: { type: Number, default: 0 },
}, { timestamps: true });

CarSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
CarSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Car', CarSchema);
