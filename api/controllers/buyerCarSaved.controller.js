import { v2 as cloudinary } from 'cloudinary';
import { BuyerCarSaved } from '../models/models.js';
import createError from '../helpers/createError.js';
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

// Add car
export const addCarSave = async (req, res, next) => {
  const { userId, carId } = req.body;

  console.log("userId in addCarSave : "+userId);
  console.log("carId in addCarSave : "+carId);

  try {
    // Ensure that all required fields are provided
    if (!userId) {
      return next(createError(400, "Cannot get userId."));
    }
    if(!carId){
      return next(createError(400, "Cannot get carId."));
    }

    // TODO: for now comment out to bypass this checking

    // Ensure that ownerId is present in the request (assuming it's populated by middleware)
    // const ownerId = req.user;
    // if (!ownerId) {
    //   return next(createError(404, "Owner not found"));
    // }

    // Create a new car
    const newSavedCar = await BuyerCarSaved.create({
      userId,
      carId
    });
  
    res.status(201).json({ 
      message: 'newSavedCar added successfully', 
      newSavedCar
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single car using its ID.
export const getAllSavedCars = async (req, res, next) => {
  console.log("getAllSavedCars method executed.");
  // const propID =  mongoose.Types.ObjectId(req.params.carId);
  const userID = req.params.userId;

  try{
    // const note = await Note.findById(propID).populate('ownerId', '-password -refreshToken');
    const cars = await BuyerCarSaved.find({ userId : userID});
    if (!cars) {
      return next(createError(404, 'User has no any cars added into favourite list'));
    } 
    res.status(200).json(cars);
    // console.log("getNotes notes : "+notes);
  } catch(error){
    next(error);
  }
};

// Retrieve a single car using its ID.
export const getSavedCar = async (req, res, next) => {
  console.log("getSavedCar method executed.");
  // const propID =  mongoose.Types.ObjectId(req.params.carId);
  const userID = req.params.userId;
  const carID = req.params.carId;

  try{
    // const note = await Note.findById(propID).populate('ownerId', '-password -refreshToken');
    const cars = await BuyerCarSaved.find({ userId : userID, carId: carID});
    if (cars.length === 0) {
      console.log("User "+userID+" does not save car "+carId);
      return;
    } 
    res.status(200).json(cars);
  } catch(error){
    next(error);
  }
};

// Delete car by ID
export const removeSavedCar = async (req, res, next) => {

  const userId = req.params.userId;
  const carId = req.params.carId;

  try {
    // Find the buyerSavedCar by _id
    // const savedCar = await BuyerCarSaved.findById(req.params.id);
    const savedCar = await BuyerCarSaved.find({userId: userId, carId: carId});

    console.log("savedCar _id : "+savedCar._id);

    // Check if the car exists
    if (!savedCar) {
      return res.status(404).json({ error: 'saveCar not found!' });
    }

    // Delete the savedCar
    await BuyerCarSaved.deleteOne(savedCar._id);

    // Respond with success message
    res.status(200).json({ message: 'SavedCar has been unsaved!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to unsave savedCar' });
  }
};