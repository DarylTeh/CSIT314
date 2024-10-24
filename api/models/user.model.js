import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const { Schema } = mongoose;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 70;

class UserSchema {
  constructor() {
    const userSchema = new Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        min: MIN_NAME_LENGTH,
        max: MAX_NAME_LENGTH,
      },
      email: { type: String, required: true, unique: true },
      phone: { type: Number, optional: true, unique: true },
      password: {
        type: String,
        required: true,
        min: MIN_PASSWORD_LENGTH,
        max: MAX_PASSWORD_LENGTH,
      },
      confirmPassword: {
        type: String,
        optional: true,
        min: MIN_PASSWORD_LENGTH,
        max: MAX_PASSWORD_LENGTH,
      },
      refreshToken: { type: String, required: false },
      avatar: { type: String, required: false },
      newPassword: { type: String, required: false },
      biography: {
        type: String,
        required: false,
      },
      role: {
        type: String,
        required: true,
        enum: ["2nd hand car listing Admin", "Seller", "Buyer", "Admin"],
      },
    }, { timestamps: true });

    // Hash the user's password before saving it
    userSchema.pre('save', async function (next) {
      const user = this;
      if (!user.isModified('password')) return next();
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    });

    // Adding virtual id for frontend friendliness
    userSchema.virtual('id').get(function () {
      return this._id.toHexString();
    });
    userSchema.set('toJSON', { virtuals: true });

    return userSchema;
  }
}

// Joi schema for user sign up validation
class UserSignUpValidation {
  static schema() {
    return Joi.object({
      username: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH).alphanum(),
      email: Joi.string().required().email(),
      phone: Joi.number().optional().integer().positive(),
      password: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
      confirmPassword: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
      role: Joi.string().required(),
    });
  }
}

// Joi schema for user update details
class UserUpdateDetailsValidation {
  static schema() {
    return Joi.object({
      username: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH).alphanum(),
      email: Joi.string().required().email(),
      phone: Joi.number().optional().integer().positive(),
    });
  }
}

// Joi schema for user change password validation
class UserChangePasswordValidation {
  static schema() {
    return Joi.object({
      password: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
      newPassword: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
    });
  }
}

// Use mongoose.models to prevent overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model('User', new UserSchema());

// Export the User model and validation schemas
export default User;
export {
  UserSignUpValidation,
  UserUpdateDetailsValidation,
  UserChangePasswordValidation,
};
