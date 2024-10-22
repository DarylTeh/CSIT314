import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { addCarSave, getAllSavedCars, getSavedCar, removeSavedCar } from '../controllers/buyerCarSaved.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.get('/:userId', getAllSavedCars);
router.get('/:userId/:carId', getSavedCar);
router.post('/add', addCarSave);
router.delete('/remove/:userId/:carId', removeSavedCar);
// router.put('/:id', updateNote);
// router.delete('/delete/:id', deleteNote);

export default router;