import mongoose from 'mongoose';

class PriceChangeSchema {
  constructor() {
    return new mongoose.Schema({
      date: { type: Date, required: true },
      price: { type: Number, required: true },
    });
  }
}

class CarSchema {
  constructor() {
    const schema = new mongoose.Schema({
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
      priceHistory: [new PriceChangeSchema()],
      views: { type: Number, default: 0 },
    }, { timestamps: true });

    schema.virtual('id').get(function () {
      return this._id.toHexString();
    });
    schema.set('toJSON', { virtuals: true });

    return schema;
  }
}

// Instead of 'const Car = mongoose.model'
export default mongoose.models.Car || mongoose.model('Car', new CarSchema());
