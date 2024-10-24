import mongoose from 'mongoose';

class RoleSchema {
  constructor() {
    return new mongoose.Schema({
      description: {
        type: String,
        required: true,
      },
    });
  }
}

class AccountSchema {
  constructor() {
    return new mongoose.Schema({
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
  }
}

class BuyerCarSavedSchema {
  constructor() {
    return new mongoose.Schema({
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
  }
}

class RatingSchema {
  constructor() {
    return new mongoose.Schema({
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
  }
}

class NoteSchema {
  constructor() {
    return new mongoose.Schema(
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
  }
}

class PriceHistorySchema {
  constructor() {
    return new mongoose.Schema({
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
  }
}

class ContractSchema {
  constructor() {
    return new mongoose.Schema({
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
  }
}

class TransactionSchema {
  constructor() {
    return new mongoose.Schema({
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
  }
}

// Create models from the schemas using `mongoose.models`
export const Role = mongoose.models.Role || mongoose.model('Role', new RoleSchema());
export const Account = mongoose.models.Account || mongoose.model('Account', new AccountSchema());
export const BuyerCarSaved = mongoose.models.BuyerCarSaved || mongoose.model('BuyerCarSaved', new BuyerCarSavedSchema());
export const Rating = mongoose.models.Rating || mongoose.model('Rating', new RatingSchema());
export const Note = mongoose.models.Note || mongoose.model('Note', new NoteSchema());
export const PriceHistory = mongoose.models.PriceHistory || mongoose.model('PriceHistory', new PriceHistorySchema());
export const Contract = mongoose.models.Contract || mongoose.model('Contract', new ContractSchema());
export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', new TransactionSchema());
