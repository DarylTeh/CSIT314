import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

// Define Account schema
const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  photo: {
    type: Buffer, // Assuming you want to store images as binary data
  },
  bio: {
    type: String,
  },
});

// Define BuyerCarSaved schema
const buyerCarSavedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
});

// Define Rating schema
const ratingSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: String,
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  createdDt: {
    type: Date,
    default: Date.now,
  },
});

// Define Note schema
const noteSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define PriceHistory schema
const priceHistorySchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  },
  amount: {
    type: Number,
    required: true,
  },
  createdDt: {
    type: Date,
    default: Date.now,
  },
});

// Define Contract schema
const contractSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  createdDt: {
    type: Date,
    default: Date.now,
  },
  terminatedDt: Date,
});

// Define Transaction schema
const transactionSchema = new mongoose.Schema({
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  createdDt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['successful', 'failed'],
    required: true,
  },
});

// Create models from the schemas using `mongoose.models`
export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
export const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);
export const BuyerCarSaved = mongoose.models.BuyerCarSaved || mongoose.model('BuyerCarSaved', buyerCarSavedSchema);
export const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);
// export const Car = mongoose.models.Car || mongoose.model('Car', carSchema);
export const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export const PriceHistory = mongoose.models.PriceHistory || mongoose.model('PriceHistory', priceHistorySchema);
export const Contract = mongoose.models.Contract || mongoose.model('Contract', contractSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
