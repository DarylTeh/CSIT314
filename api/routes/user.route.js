import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  deleteUser, 
  updateUser,
  updatePassword,
  getUsers,
  getUserDetails,
} from '../controllers/user.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
const uploadImage = upload.single('avatar');

router.route('/profile')
  .get(isAuthenticated, getUserDetails)
  .put(isAuthenticated, uploadImage, updateUser); // Only update user details here

router.put('/profile/password', isAuthenticated, updatePassword);

router.delete('/delete/:id', deleteUser);
// router.post('/dashboard', verifyToken, dashdoard)

export default router;