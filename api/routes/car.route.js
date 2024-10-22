import express from 'express';
import { 
  addCar, 
  getCar, 
  getAllCars,
  updateCar, 
  deleteCar,
  getMyListing,
  searchCars,
  updateView
} from '../controllers/car.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
const uploadImage = upload.single('imageUrl');

// Tetst search
router.get('/get', searchCars);

// Car route 
router.post('/add', isAuthenticated, uploadImage, addCar);
router.get('/', isAuthenticated, getMyListing);
router.get('/all', getAllCars);
router.get('/:id', getCar);
router.put('/views/:id', updateView)
router.put('/update/:id', isAuthenticated, uploadImage, updateCar);
router.delete('/delete/:id', isAuthenticated, deleteCar);

export default router;