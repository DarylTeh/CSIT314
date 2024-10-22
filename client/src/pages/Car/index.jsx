import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { SlHeart, SlLocationPin, SlNote, SlShare } from 'react-icons/sl';
import BeatLoader from 'react-spinners/BeatLoader';
import Map from '../../components/Map';
import ThreeDTour from '../../components/ThreeDTour';
import api from '../../utils/api';

// EmailJS To sendMail 
import emailjs from '@emailjs/browser';
import NotesApp from './Note';
import LikeButton from '../../components/LikeButton';

export default function Car() {
  const {userInfo} = useSelector((state) => state.auth);
  const params = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef()

  // EmailJS To sendMail
  const serviceID = "service_41cm1tg"
  const templateID = "template_a1jbeck"
  const publicKey = "3oVeRi36B1VGdWtUZ"
  const messageRef = useRef();

  const sendEmail = (e) => {
  e.preventDefault();

  const message = messageRef.current.value.trim();
  const placeholderText = `I am interested in your car '${car?.title}'.`;

  if (message === '') {
    messageRef.current.value = placeholderText;
    return;
  }

  emailjs.sendForm(
    serviceID,
    templateID,
    formRef.current,
    { publicKey: publicKey, message: message }
  )
  .then(
    () => {
      toast.success("Email sent successfully!");
      console.log('Success!');
    },
    (error) => {
      toast.error("Failed to send email. Please try again.");
      console.log('Failed...', error.text);
    },
  );
};

  useEffect(() => {
    const getCar = async () => {
      try {
        const res = await api.get(`/cars/${params.carId}`);
        setCar(res.data);
        setLoading(false);
        const viewRes = await api.put(`/cars/views/${params.carId}`);
        // toast.success("ViewRes : "+viewRes.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCar();
  }, [params.carId]);


  // console.log(car?.ownerId?.avatar);

  return (
    <Layout>
      <section className=" text-gray-600 body-font">
        <div className="container flex items-center justify-center flex-col w-full px-5 py-24 mx-auto min-h-[30vh]">
        {loading ? (
          <div className='h-3/4 w-screen text-center'>
            <BeatLoader
              color="#064862"
              size={30}
              aria-label="Loading..."
              data-testid="loader"
            />
          </div>
        ) : car ? (
          <div className="lg:w-8/12 mx-auto">
            <div className="flex justify-between items-center w-full relative mb-4">
              <h1 className="text-3xl font-semibold text-gray-800">{car.title}</h1>
              <span className='hidden md:block bg-secondary text-sm px-3 py-2 ml-3 text-gray-50 rounded-md'>For {car.category.toUpperCase()}</span>
              {( userInfo?.data?._id == car?.ownerId?.id) ? (
                <div className="absolute top-0 right-0 flex gap-3">
                  <SlShare className='text-3xl font-bold cursor-pointer w-10 h-10 py-2 bg-gray-200 shadow-sm rounded-md hover:shadow-md hover:text-secondary'/>
                  <Link
                    className="text-white bg-green-600 py-2 px-5 hover:bg-gray-500 rounded text-2xl"
                    to={`/edit-car/${car.id}`}
                  ><SlNote /></Link>
                </div>
                ) : (
                  <div className="absolute top-0 right-0 flex gap-3">
                    {/* <SlHeart className='text-3xl font-bold cursor-pointer w-10 h-10 py-2 bg-gray-200 shadow-sm rounded-md hover:shadow-md hover:text-secondary'/> */}
                    <LikeButton userId={userInfo.data._id} carId={params.carId}/>
                    <SlShare className='text-3xl font-bold cursor-pointer w-10 h-10 py-2 bg-gray-200 shadow-sm rounded-md hover:shadow-md hover:text-secondary'/>
                  </div>
                )}
            </div>
            <div className="h-96 my-2">
              <img
                src={car.imageUrl}
                alt="Car"
                className="object-cover object-center h-full w-full rounded-md shadow-md"
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-2/3 sm:pr-4 sm:py-8 mt-4 sm:mt-0 border-b border-gray-200">
              <div className="flex justify-between w-full mb-3">
                  <p className="text-lg mb-3 flex items-center gap-1">
                    {car.views} views
                  </p>
                </div>
                {/* Address */}
                <div className="flex justify-between w-full mb-3">
                  <p className="text-lg mb-3 flex items-center gap-1">
                    <SlLocationPin /> {car.address}
                  </p>
                  {/* <p className="mb-3">{car.city} London</p> */}
                  <h3 className="text-gray-800 text-2xl"> ${car.price}</h3>
                </div>

                {/* Description */}
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-5">
                    Description
                  </h2>
                  <p>{car.description}</p>
                  <Link className="text-secondary inline-flex items-center">
                    Learn More
                  </Link>
                </div>

                {/* Car Details */}
                <div className=" p-4 bg-slate-50 rounded-md shadow-md mb-7">
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-5">
                    Car Details
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    <div className="flex flex-col mb-1">
                      <ul>
                        <li className='flex gap-3'><p>Car ID: </p><span>{car.id.slice(0, 15)}...</span></li>
                        <li className='flex gap-3'><p>Type: </p> <span>{car.listingType}</span></li>
                        <li className='flex gap-3'><p>Category: </p><span>{car.category}</span></li>
                        <li className='flex gap-3'><p>Price: </p><span>{car.price}$</span></li>
                      </ul>
                    </div>

                    <div className="flex flex-col">
                    <ul>
                      <li className='flex gap-3'><p>Bedrooms: </p><span>{car.bedrooms}</span></li>
                      <li className='flex gap-3'><p>Bathrooms: </p><span>{car.bathrooms}</span></li>
                      <li className='flex gap-3'><p>Furnished: </p><span>{car.furnished ? 'Yes' : 'No'}</span></li>
                      <li className='flex gap-3'><p>Parking: </p><span>{car.parking ? 'Yes' : 'No'}</span></li>
                    </ul>
                  </div>
                  </div>
                </div>

                {/* Location */}
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <div className="flex justify-between w-full mb-7">
                      <h2 className="title-font font-medium text-lg text-gray-900">
                        Map Location
                      </h2>
                      <div className="">
                        <p className="text-lg flex items-center gap-1">
                          <SlLocationPin /> {car.address}
                        </p>
                      </div>
                  </div>
                  <article className="md:h-72 w-full h-56">
                    <Map />
                  </article>
                </div>

                {/* 3D Tour */}
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-7">
                    3D Tour
                  </h2>
                  <article className="md:h-72 w-full h-56">
                    <ThreeDTour />
                  </article>
                </div>
                
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-7">
                    Notes
                  </h2>
                  <article className="md:h-72 w-full h-56">
                    <NotesApp carId={params.carId}/>
                  </article>
                </div>
              </div>

              {/* Send Message to the Car's Owner */}
              <div className="sm:w-1/3 text-center sm:pl-4 sm:py-8 sm:border-l border-gray-200 mt-4 ">
                <div className="w-18 h-18 rounded-full inline-flex items-center justify-center ">
                  <img src={car?.ownerId?.avatar} alt="Car Owner" className="object-cover object-center h-full w-full rounded-full " />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-2 text-gray-900 text-lg">{car?.ownerId?.username}</h2>
                  <div className="w-12 h-1 bg-secondary rounded mt-1 mb-4"></div>

                  <form className='min-w-[85%]' ref={formRef} onSubmit={sendEmail}>
                    {/* To Email*/}
                    <div className="relative w-full mb-3">
                      <input
                          type="email"
                          name="receiver_email"
                          defaultValue={car?.ownerId?.email}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="To email"
                          autoComplete="email"
                          required
                          readOnly
                          style={{backgroundColor: '#e5e7eb', cursor: 'not-allowed'}}
                      />
                    </div>


                    {/* from name */}
                    <div className="relative w-full mb-3">
                      <input
                          type="text"
                          name='sender_name'
                          defaultValue={userInfo?.data?.username}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder='My name is...'
                          autoComplete='username'
                          required
                      />
                    </div>
                    {/* to name */}
                    <div className="relative w-full mb-3">
                      <input
                          type="text"
                          name='receiver_name'
                          hidden
                          defaultValue={car?.ownerId?.username}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder='To name'
                          autoComplete='username'
                          required
                      />
                    </div>
                    {/* From Email*/}
                    <div className="relative w-full mb-3">
                      <input
                          type="email"
                          name='sender_email'
                          defaultValue={userInfo?.data?.email}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder='My Email is...'
                          autoComplete='email'
                          required
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative w-full mb-3">
                      <input
                          type="tel"
                          name="phone"
                          defaultValue={userInfo?.data?.phone}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="My number is..."
                          autoComplete='phone'
                          required
                      />
                    </div>
                    {/* Message */}
                    <div className="relative w-full mb-3">
                      <textArea
                          name="message"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full h-32"
                          placeholder={`I am interested in your car '${car?.title}'.`}
                          autoComplete='Message'
                          ref={messageRef}
                      ></textArea>
                    </div>
                    {/* Submit */}
                    <div className="text-center mt-3">
                      <button
                          type="submit"
                          disabled={loading}
                          className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <p className='text-2xl text-center text-gray-400 font-bold'>
              Car not found
            </p>
        )}

        </div>
      </section>
    </Layout>
  )
}
