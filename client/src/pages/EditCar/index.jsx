import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../Layout/DashLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import api from '../../utils/api';

export default function EditCar() {
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const fileRef = useRef(null);
  const params = useParams();
  const [imageForDisplay, setImageForDisplay] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    price: 0,
    mileage: 0,
    coeLeft: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    category: 'new',
    engineCapacity: 0,
    seatingCapacity: 0,
    color: '',
    imageUrl: null,
  });

  useEffect(() => {
    const getCar = async () => {
      try {
        const res = await api.get(`/cars/${params.carId}`);
        setFormData(res.data);
        if (res.data.imageUrl) {
          setImageForDisplay(res.data.imageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCar();
  }, [params.carId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrl') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setImageForDisplay(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEditCar = async (e) => {
    e.preventDefault();
    try {
      if (!formData.price || !formData.brand || !formData.model || !formData.description) {
        toast.error("Please fill in all required fields");
        return;
      }

      const carData = {
        ...formData,
        ownerId: userInfo.data._id,
      };

      const res = await api.put(`/cars/update/${params.carId}`, carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      });

      toast.success(res.data.message);
      navigate('/my-listing');
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
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
                      Edit Car
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-300" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-6 pt-0">
                  <form onSubmit={handleEditCar}>
                    {/* Brand */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Brand</label>
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
                      <label className="block text-gray-700 text-xs font-bold mb-2">Model</label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="model"
                        placeholder="Model"
                        onChange={handleChange}
                        value={formData.model}
                      />
                    </div>
                    {/* Description */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Description</label>
                      <textarea
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        rows="5"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={formData.description}
                      ></textarea>
                    </div>
                    {/* Price */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Price</label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="price"
                        min="1"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Mileage */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Mileage</label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="mileage"
                        min="0"
                        value={formData.mileage}
                        onChange={handleChange}
                      />
                    </div>
                    {/* COE Left */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">COE Left</label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="coeLeft"
                        placeholder="COE Left"
                        onChange={handleChange}
                        value={formData.coeLeft}
                      />
                    </div>
                    {/* Fuel Type */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Fuel Type</label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="fuelType"
                        onChange={handleChange}
                        value={formData.fuelType}>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    {/* Transmission */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Transmission</label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="transmission"
                        onChange={handleChange}
                        value={formData.transmission}>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>
                    {/* Category */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Category</label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="category"
                        onChange={handleChange}
                        value={formData.category}>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                      </select>
                    </div>
                    {/* Engine Capacity */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Engine Capacity (cc)</label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="engineCapacity"
                        min="1"
                        value={formData.engineCapacity}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Seating Capacity */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Seating Capacity</label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="seatingCapacity"
                        min="1"
                        value={formData.seatingCapacity}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Color */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Color</label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="color"
                        placeholder="Color"
                        onChange={handleChange}
                        value={formData.color}
                      />
                    </div>
                    {/* Image Upload */}
                    <div className="relative w-full mb-5">
                      <label className="block text-gray-700 text-xs font-bold mb-2">Image Upload</label>
                      <input
                        type="file"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="imageUrl"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      {imageForDisplay && <img src={imageForDisplay} alt="Preview" className="mt-2 h-32 object-cover" />}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        disabled={isLoading}
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full transition duration-150 ease-in-out"
                        type="submit">
                        {isLoading ? 'Loading...' : 'Edit Car'}
                      </button>
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
