import React, { useState, useEffect } from 'react';
import Layout from "../../Layout/DashLayout";
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import CarCard from '../../components/CarCard';

const FavDashboard = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);
  const [savedCars, setSavedCars] = useState([]);

  useEffect(() => {
    const getSavedCars = async () => {
      try {
        console.log("FavDashboard userId : "+userInfo.data._id);
        const savedres = await api.get(`cars/save/${userInfo.data._id}`);
        console.log("FavDashboard savedCars : "+savedres.data);
        setSavedCars(savedres.data);
        const carsData = await Promise.all(
          savedres.data.map(async (p) => {
            console.log("FavDashboard carId : "+p.carId);
            const res = await api.get(`/cars/${p.carId}`);
            console.log("FavDashboard Cars : "+res.data);
            return res.data;
          })
        )
        console.log("FavDashBoard carsData : "+carsData);
        setCars(carsData);
        console.log("Retrieved savedCars successfully.");
      }catch(error){
        toast.error(error.message);
        console.log(error.message);
      }
    }
    getSavedCars();
  }, [userInfo.data._id]);

  useEffect(() => {
    console.log("FavDashBoard cars : "+cars);
  }, [cars]);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto h-[79vh]">
        <div className="flex flex-col text-center w-full mb-16">
          <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
            Favourite Cars
          </strong>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Welcome to your favourtite dashboard!</p>
        </div>
          { savedCars.length === 0 || cars === null? 
            <div className='w-full h-32 m-auto '>
              <p className='text-3xl text-gray-400 font-samibold mb-7'>No favorite cars</p>
            </div> :        
            cars.map((p, index) => {
              return <CarCard propsCard={p} key={index} />
            })
          }
        </div>
      </section>
    </Layout>
  );
};

export default FavDashboard;
