import React, { useState, useEffect } from 'react';
import Layout from "../../Layout";
import { toast } from 'react-toastify';
// import { AiFillPlusCircle } from 'react-icons/ai';
import CarCard from '../../components/CarCard';
import BeatLoader from 'react-spinners/BeatLoader';
import Search from '../../components/Search';
import api from '../../utils/api';

export default function Cars() {
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [otherTerm, setOtherTerm] = useState({
    minPrice: '',
    maxPrice: '',
    bedroomNumber: '',
    listingType: '',
    category: '',
    furnished: '',
    parking: ''
  });

  useEffect(() => {
    const getCars = async () => {
      const {minPrice, maxPrice, bedroomNumber, listingType, category, furnished, parking} = otherTerm;
      try {
        const res = await api.get(`/cars/all`, {params: 
          // {search: searchTerm}
          // searchTerm
          {
            search: searchTerm,
            minPrice: minPrice,
            maxPrice: maxPrice,
            bedrooms: bedroomNumber,
            listingType: listingType,
            category: category,
            furnished: furnished,
            parking: parking
          }
      });
        setCars(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCars();
  }, [searchTerm, otherTerm]);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col items-center text-center w-full mb-20 bg-slate-300 pt-16 rounded-md shadow-lg">
            <strong className="text-secondary sm:text-4xl text-3xl font-medium title-font mb-2">
              Cars
            </strong>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Search for a car!</p>
            {/* <Search /> */}
            <div className='w-4/5 max-w-[30rem] min-w-72 mt-8 mb-16'>
              <Search setSearchTerm={setSearchTerm} setOtherTerm={setOtherTerm} /> {/* Pass setSearchTerm to the Search component */}
            </div>
          </div>

          { loading ? 
          (<div className='flex justify-center text-center w-full'>
            <BeatLoader
              color="#064862"
              size={20} 
              aria-label="Loading..."
              data-testid="loader"
            />
          </div>
          ) : cars ? (
            <div>
              <div className="flex flex-wrap justify-center gap-8">
                {cars.map((prop, i) => (
                  <CarCard propsCard={prop} key={i} />
                ))}
              </div>
            </div>
          ) : ( 
            <p className='text-2xl text-center text-gray-400 font-bold'>
              Cars not found
            </p>
          )}
        </div>
      </section>
    </Layout>
  )
}