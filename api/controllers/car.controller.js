import { v2 as cloudinary } from 'cloudinary';
import Car from '../models/car.model.js';
import createError from '../helpers/createError.js';

// Add car
export const addCar = async (req, res, next) => {
  const { title, description, address, price, listingType, 
    category, bedrooms, bathrooms, furnished, parking, views
  } = req.body;

  try {
    // Ensure that all required fields are provided
    if (!title || !description || !address || !price || 
      !listingType || !category || !bedrooms || !bathrooms) {
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
      title,
      description,
      address,
      price,
      listingType, 
      category,
      furnished,
      parking,
      bedrooms,
      bathrooms,
      imageUrl: result.secure_url,
      ownerId,
      views
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
  const propID = req.params.id;

  try{
    const car = await Car.findById(propID).populate('ownerId', '-password -refreshToken');
    if (!car) {
      return next(createError(404, 'No car found'));
    } 
    res.status(200).json(car);
  } catch(error){
    next(error);
  }
};

export const updateView = async (req, res, next) => {
  const propID = req.params.id;

  try{
    const car = await Car.findById(propID).populate('ownerId', '-password -refreshToken');
    if(!car){
      return next(createError(404, 'No car found'));
    }
    car.views+=1;
    await car.save();
    if(!car){
      return next(createError(404, 'Car\'s views fail to update.'));
    }
    res.status(200).json({
      message: 'Car\'s views updated successfully.',
      car
    });
  }catch(err){
    console.log("updateViews : "+err.message);
  }
}

// Retrieve all cars
export const getAllCars = async (req, res, next) => {
  let { search, minPrice, maxPrice, bedroomNumber, listingType, category, furnished, parking } = req.query;
  let query = {};

  // Filter cars by listing type
  if (!listingType || listingType === 'all') {
    query.listingType = { $in: ['apartments', 'houses', 'offices'] };
  } else {
    query.listingType = listingType;
  }

  // Filter cars by category
  if (!category || category === 'all') {
    query.category = { $in: ['sale', 'rent'] };
  } else {
    query.category = category;
  }

  // Filter cars by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  // Filter cars by bedroom number
  if (bedroomNumber) {
    query.bedrooms = parseInt(bedroomNumber, 10);
  }

  // Filter cars by furnished status
  if (furnished) {
    query.furnished = furnished === 'yes';
  }

  // Filter cars by parking status
  if (parking) {
    query.parking = parking === 'yes';
  }

  // Filter cars by search term (title or description)
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
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
        { title: { $regex: search, $options: 'i' } }, 
        { description: { $regex: search, $options: 'i' } }, 
        // Search by car description (case-insensitive)
      ],
    }).populate('ownerId', '-password -refreshToken');
    
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Retrive my cars list
export const getMyListing = async (req, res, next) => {
  try {
    const ownerID = req.user;
    // Check if ownerID is a valid ObjectId
    if (!ownerID) return next(createError(400, 'Invalid user ID format'));

    const cars = await Car.find({ownerId: ownerID});

    // Check if cars array is empty
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

  const { title, description, address, price, listingType, 
    category, bedrooms, bathrooms, furnished, parking, imageUrl
  } = req.body;

  try {
    // Find the car by id
    let car = await Car.findById(id);

    //  Check if the car exists
    if (!car) {
      return next(createError(404, "Car not found"));
    }
    
    // Ensure that the user owns the car
    const ownerId = req.user;
    if (!ownerId) {
      return next(createError(404, "Owner not found"));
    }

    if (car.ownerId.toString() !== ownerId) {
      return next(createError(403, "You are not authorized to edit this car"));
    }

    // Get the uploaded file if it exists
    const file = req.file;
    // if (!file) return next(createError(400, 'No image in the request'));
    let newImageUrl;

    // Check if a file was uploaded
    if (file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      newImageUrl = result.secure_url;
    } 

    // Update the car
    car = await Car.findByIdAndUpdate(id, {
      title,
      description,
      address,
      price,
      listingType, 
      category,
      furnished,
      parking,
      bedrooms,
      bathrooms,
      imageUrl: newImageUrl,
    }, { new: true });

    if (!car) {
      throw createError(404, 'No car found');
    }

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
    // Find the car by ID
    const car = await Car.findById(req.params.id);

    // Check if the car exists
    if (!car) {
      return res.status(404).json({ error: 'Car not found!' });
    }

    console.log(req.user !== car.ownerId.toString());

    // Check if the user is authorized to delete the car
    if (req.user !== car.ownerId.toString()) {
      return res.status(401).json({ error: 'You can only delete your own cars!' });
    }

    // Delete the car
    await Car.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).json({ message: 'Car has been deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};