import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import bgImg from '/src/assets/images/bg.png'
import Search from '../../components/Search';
import CarCard from '../../components/CarCard';
import BeatLoader from 'react-spinners/BeatLoader';
import api from '../../utils/api';

export default function Home() {
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
      try {
        const {minPrice, maxPrice, bedroomNumber, listingType, category, furnished, parking} = otherTerm;
        const res = await api.get(`/cars/all`, {params: {
          search: searchTerm,
          minPrice: minPrice,
          maxPrice: maxPrice,
          bedrooms: bedroomNumber,
          listingType: listingType,
          category: category,
          furnished: furnished,
          parking: parking
        }});
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
        <div className={`w-full h-[90vh] flex justify-center items-center bg-center bg-cover bg-no-repeat bg-gray-100`} 
        style={{backgroundImage: `url(${bgImg})`}}>
          <div className="flex flex-col justify-center items-start py-4 mt-16 w-1/2">
            <div className="hero-title">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold lg:font-bold text-gray-200">
                Good Cars Low Prices!
              </h1>
            </div>
            {/* <Search /> */}
            <div className='w-full max-w-[43rem] min-w-60 mt-8 mb-16'>
              <Search setSearchTerm={setSearchTerm} setOtherTerm={setOtherTerm} /> {/* Pass setSearchTerm to the Search component */}
            </div>
          </div>
        </div>

        <div className='pt- px-4 md:px-10 pb-10 '>
          <div className="container flex items-center justify-center flex-col w-full px-5 py-16 mx-auto min-h-[30vh]">
            {/* Propereties here */}
            {loading ? (
              <div className='text-center h-3/4 w-screen'>
                <BeatLoader
                  color="#064862"
                  size={20} 
                  aria-label="Loading..."
                  data-testid="loader"
                />
              </div>
            ) : cars && cars.length > 0 ? (

              <div className='w-full'>
                <div className="flex flex-wrap justify-center gap-5 mt-8 -m-4">
                  {cars.map((prop, i) => (
                    <CarCard propsCard={prop} key={i} />
                  ))}
                </div>
              </div>
            ) : ( 
              <p className='text-2xl text-center text-gray-400 font-bold'>
                Car not found
              </p>
            )}
          </div> 
        </div>
      </section>
    </Layout>
  );
}
