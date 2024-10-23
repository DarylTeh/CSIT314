import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../Layout/DashLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import api from '../../utils/api';

export default function AddCar() {
  const fileRef = useRef(null);
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const [imageForDisplay, setImageForDisplay] = useState(false);  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    mileage: 0,
    coeLeft: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    category: 'new',
    engineCapacity: 1000,
    seatingCapacity: 4,
    color: '',
    price: 10000,
    imageUrl: null,
  });

  const handleChange = (e) => {
    const { name, checked, value, files } = e.target;
    if (name === 'imageUrl') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setImageForDisplay(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: name === 'parking' || name === 'furnished' ? checked : value
      });
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
  
    try {
      // Validate that all required fields are provided
      if (!formData.brand || !formData.model || !formData.description || !formData.price) {
        toast.error("Please fill in all required fields");
        return;
      }  
  
      const carData = {
        ...formData,
        ownerId: userInfo.data._id,
        views: 1
      };
  
      const res = await api.post('/cars/add', 
      carData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.accessToken}`
        }
      });
  
      toast.success(res?.data?.message);
      navigate('/my-listing');
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <section className="w-full h-full">
        <div className="container flex content-center items-center justify-center mx-auto px-6 md:px-12 my-12 h-full">
          <div className="flex sm:w-full lg:max-w-5xl content-center items-center justify-center h-full">
            <div className="w-full px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
                      Add Car
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-300" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-6 pt-0">
                  <form onSubmit={handleAddCar}>
                    {/* Brand */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="brand">
                        Brand
                      </label>
                      <input 
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="brand"
                        placeholder="Brand"
                        onChange={handleChange}
                        value={formData.brand}
                      />
                    </div>

                    {/* Model */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="model">
                        Model
                      </label>
                      <input 
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="model"
                        placeholder="Model"
                        onChange={handleChange}
                        value={formData.model}
                      />
                    </div>

                    {/* Mileage */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="mileage">
                        Mileage (KM)
                      </label>
                      <input 
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="mileage"
                        placeholder="Mileage"
                        onChange={handleChange}
                        value={formData.mileage}
                      />
                    </div>

                    {/* COE Left */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="coeLeft">
                        COE Left (Years)
                      </label>
                      <input 
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="coeLeft"
                        placeholder="COE Left"
                        onChange={handleChange}
                        value={formData.coeLeft}
                      />
                    </div>

                    {/* Transmission */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="transmission">
                        Transmission
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="transmission"
                        onChange={handleChange}
                        value={formData.transmission}
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>

                    {/* Fuel Type */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="fuelType">
                        Fuel Type
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="fuelType"
                        onChange={handleChange}
                        value={formData.fuelType}
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                        Category
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="category"
                        onChange={handleChange}
                        value={formData.category}
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                      </select>
                    </div>

                    {/* Engine Capacity */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="engineCapacity">
                        Engine Capacity (cc)
                      </label>
                      <input 
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="engineCapacity"
                        placeholder="Engine Capacity"
                        onChange={handleChange}
                        value={formData.engineCapacity}
                      />
                    </div>

                    {/* Seating Capacity */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="seatingCapacity">
                        Seating Capacity
                      </label>
                      <input 
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="seatingCapacity"
                        placeholder="Seating Capacity"
                        onChange={handleChange}
                        value={formData.seatingCapacity}
                      />
                    </div>

                    {/* Color */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="color">
                        Color
                      </label>
                      <input 
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="color"
                        placeholder="Color"
                        onChange={handleChange}
                        value={formData.color}
                      />
                    </div>

                    {/* Price */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="price">
                        Price
                      </label>
                      <input 
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value={formData.price}
                      />
                    </div>

                    {/* Image */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="imageUrl">
                        Image
                      </label>
                      <div className="flex items-center justify-center border-dashed border-2 border-gray-300 py-3 rounded">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileRef}
                          onChange={handleChange}
                          name="imageUrl"
                        />
                        <button
                          type="button"
                          className="text-secondary flex flex-col items-center text-sm"
                          onClick={() => fileRef.current.click()}
                        >
                          <AiOutlineCloudUpload className="text-3xl" />
                          Upload Image
                        </button>
                      </div>
                      {imageForDisplay && (
                        <img
                          src={imageForDisplay}
                          alt="Selected car"
                          className="mt-4 h-48 w-full object-contain"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                        Description
                      </label>
                      <input 
                        type="string"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="description"
                        placeholder="Description here"
                        onChange={handleChange}
                        value={formData.description}
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        type="submit"
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full transition-all duration-150"
                      >
                        Add Car
                      </button>
                    </div>
                    <div className="mt-2">
                      <Link to="/dashboard" className="text-secondary text-sm font-bold">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
