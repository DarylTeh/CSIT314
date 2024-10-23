import { v2 as cloudinary } from 'cloudinary';
import Car from '../models/car.model.js';
import createError from '../helpers/createError.js';

// Add car
export const addCar = async (req, res, next) => {
  const { brand, model, description, price, mileage, coeLeft, fuelType, 
    transmission, category, engineCapacity, seatingCapacity, color 
  } = req.body;

  try {
    // Ensure that all required fields are provided
    if (!brand || !model || !description || !price || !mileage || 
        !coeLeft || !fuelType || !transmission || !category || 
        !engineCapacity || !seatingCapacity || !color) {
      return next(createError(400, "Please provide all required fields."));
    }
    
    // Get the uploaded file
    const file = req.file;
    if (!file) return next(createError(400, 'No image in the request'));
    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Ensure that ownerId is present in the request (assuming it's populated by middleware)
    const ownerId = req.user;
    if (!ownerId) {
      return next(createError(404, "Owner not found"));
    }

    // Create a new car
    const newCar = await Car.create({
      brand,
      model,
      description,
      price,
      mileage,
      coeLeft,
      fuelType,
      transmission,
      category,
      engineCapacity,
      seatingCapacity,
      color,
      imageUrl: result.secure_url,
      ownerId,
    });
  
    res.status(201).json({ 
      message: 'Car added successfully', 
      newCar 
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single car using its ID.
export const getCar = async (req, res, next) => {
  const carID = req.params.id;

  try {
    const car = await Car.findById(carID).populate('ownerId', '-password -refreshToken');
    if (!car) {
      return next(createError(404, 'No car found'));
    }
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

// Update view count for a car
export const updateView = async (req, res, next) => {
  const carID = req.params.id;

  try {
    const car = await Car.findById(carID).populate('ownerId', '-password -refreshToken');
    if (!car) {
      return next(createError(404, 'No car found'));
    }
    car.views += 1;
    await car.save();
    res.status(200).json({
      message: 'Car\'s views updated successfully.',
      car
    });
  } catch (err) {
    console.error("updateView:", err.message);
    next(err);
  }
};

// Retrieve all cars
export const getAllCars = async (req, res, next) => {
  let { search, minPrice, maxPrice, brand, category, fuelType, transmission } = req.query;
  let query = {};

  // Filter cars by brand
  if (brand) {
    query.brand = { $regex: brand, $options: 'i' };
  }

  // Filter cars by category
  if (category) {
    query.category = category;
  }

  // Filter cars by fuel type
  if (fuelType) {
    query.fuelType = fuelType;
  }

  // Filter cars by transmission type
  if (transmission) {
    query.transmission = transmission;
  }

  // Filter cars by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  // Filter cars by search term (brand or model)
  if (search) {
    query.$or = [
      { brand: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  console.log("Search query:", query);

  try {
    const cars = await Car.find(query)
      .sort({ createdAt: 'desc' })
      .populate('ownerId', '-password -refreshToken');
    res.status(200).json(cars);
  } catch (error) {
    console.error("getAllCars:", error.message);
    next(error);
  }
};

// Retrieve cars based on search query
export const searchCars = async (req, res, next) => {
  try {
    const { search } = req.query;
    const cars = await Car.find({
      $or: [
        { brand: { $regex: search, $options: 'i' } }, 
        { model: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ],
    }).populate('ownerId', '-password -refreshToken');
    
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Retrieve my car listings
export const getMyListing = async (req, res, next) => {
  try {
    const ownerID = req.user;
    if (!ownerID) return next(createError(400, 'Invalid user ID format'));

    const cars = await Car.find({ ownerId: ownerID });

    if (cars.length === 0) return next(createError(404, 'No cars found for this user'));

    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update car by ID
export const updateCar = async (req, res, next) => {
  const { id } = req.params;
  const { brand, model, description, price, mileage, coeLeft, 
    fuelType, transmission, category, engineCapacity, seatingCapacity, color 
  } = req.body;

  try {
    // Find the car by id
    let car = await Car.findById(id);

    if (!car) {
      return next(createError(404, "Car not found"));
    }
    
    const ownerId = req.user;
    if (car.ownerId.toString() !== ownerId) {
      return next(createError(403, "You are not authorized to edit this car"));
    }

    const file = req.file;
    let newImageUrl = car.imageUrl;

    // Check if a file was uploaded
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      newImageUrl = result.secure_url;
    } 

    // Update the car
    car = await Car.findByIdAndUpdate(id, {
      brand, model, description, price, mileage, coeLeft, 
      fuelType, transmission, category, engineCapacity, 
      seatingCapacity, color, imageUrl: newImageUrl,
    }, { new: true });

    res.status(200).json({ 
      message: 'Car updated successfully', 
      car
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete car by ID
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found!' });
    }

    if (req.user !== car.ownerId.toString()) {
      return res.status(401).json({ error: 'You can only delete your own cars!' });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Car has been deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
