import { v2 as cloudinary } from 'cloudinary';
import { Note } from '../models/models.js';
import createError from '../helpers/createError.js';
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

// Add car
export const addNote = async (req, res, next) => {
  const { carId, description } = req.body;

  console.log("CarId in addNote : "+carId);
  console.log("Description in addNote : "+description);

  try {
    // Ensure that all required fields are provided
    if (!description) {
      return next(createError(400, "Please fill in note for saving."));
    }
    if(!carId){
      return next(createError(400, "No car detected for this note."));
    }

    // TODO: for now comment out to bypass this checking

    // Ensure that ownerId is present in the request (assuming it's populated by middleware)
    // const ownerId = req.user;
    // if (!ownerId) {
    //   return next(createError(404, "Owner not found"));
    // }

    // Create a new car
    const newNote = await Note.create({
      carId,
      description
    });
  
    res.status(201).json({ 
      message: 'Note added successfully', 
      newNote 
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single car using its ID.
export const getNotes = async (req, res, next) => {
  console.log("getNotes method executed.");
  const propID = req.params.carId;

  try{
    // const note = await Note.findById(propID).populate('ownerId', '-password -refreshToken');
    const notes = await Note.find({ carId : propID});
    if (!notes) {
      return next(createError(404, 'No note has been created'));
    } 
    res.status(200).json(notes);
    console.log("getNotes notes : "+notes);
  } catch(error){
    next(error);
  }
};

// Update car by ID
export const updateNote = async (req, res, next) => {
  const { id } = req.params;

  const { description } = req.body;

  try {
    // Find the car by id
    let note = await Note.findById(id);

    //  Check if the car exists
    if (!note) {
      return next(createError(404, "Note not found"));
    }
    
    // Update the car
    note = await Note.findByIdAndUpdate(id, {
      description
    }, { new: true });

    if (!note) {
      throw createError(404, 'No note found');
    }

    res.status(200).json({ 
      message: 'Note updated successfully', 
      note
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete car by ID
export const deleteNote = async (req, res, next) => {

  try {
    // Find the car by ID
    const note = await Note.findById(req.params.id);

    // Check if the car exists
    if (!note) {
      return res.status(404).json({ error: 'Note not found!' });
    }

    // Delete the car
    await Note.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).json({ message: 'Note has been deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};