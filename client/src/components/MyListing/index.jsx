import React, { useEffect, useState } from 'react';
import TableData from '../TableData';
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const MyListing = () => {
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const getMyListing = async () => {
      try {
        const token = userInfo.accessToken;
        const res = await api.get('/cars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getMyListing();
  }, [userInfo.accessToken]);

  const handleDeleteCar = async (carId) => {
    try {
      const token = userInfo.accessToken;
      await api.delete(`/cars/delete/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(cars.filter((car) => car.id !== carId));
      toast.success('Car deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete the car.');
    }
  };

  return (
    <div>
      <div className="lg:w-11/12 w-full mx-auto overflow-auto">
        {loading ? (
          <div className='flex items-center justify-center text-center h-64 min-w-[45vh]'>
            <BeatLoader color="#064862" size={20} aria-label="Loading..." data-testid="loader" />
          </div>
        ) : cars ? (
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Transmission</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, i) => (
                <TableData propsTable={car} key={i} onDelete={handleDeleteCar} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className='w-full h-32 m-auto'>
            <p className='text-3xl text-gray-400 font-semibold mb-7'>No Listings to Show!</p>
            <Link to='/add-car' className='py-2 px-3 bg-secondary text-gray-200 rounded-md hover:bg-gray-600 hover:shadow-md'>Create Listing</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;
