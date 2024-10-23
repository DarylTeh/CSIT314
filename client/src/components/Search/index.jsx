import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function Search({ setSearchTerm, setOtherTerm }) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
    setOtherTerm({
      minPrice,
      maxPrice,
      fuelType,
      transmission,
      engineCapacity,
      seatingCapacity,
      category,
      color,
    });
  };

  const handleFilterClick = (filterName) => {
    setActiveFilter((prevFilter) => (prevFilter === filterName ? '' : filterName));
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative flex">
        <input
          type="text"
          className="block p-4 w-full text-lg text-gray-900 bg-white rounded-lg border-none focus-visible:border-none shadow-sm"
          placeholder="Search By Brand/Model"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <div className="flex absolute right-4 top-4 items-center pl-5">
            <span className="text-4xl">
              <IoSearch />
            </span>
          </div>
        </button>
      </div>
      <div className="text-gray-200 flex space-x-2 my-4">
        {['price', 'fuelType', 'transmission', 'engineCapacity', 'seatingCapacity', 'category', 'color'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-400 focus:outline-none`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      {activeFilter && (
        <div className="text-gray-200">
          {activeFilter === 'price' && (
            <div className="flex space-x-4">
              <input
                type="number"
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                placeholder="Enter min price"
                min={1}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                placeholder="Enter max price"
                min={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          )}
          {activeFilter === 'fuelType' && (
            <div>
              <label>
                Fuel Type:
                <select
                  className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>
            </div>
          )}
          {activeFilter === 'transmission' && (
            <div>
              <label>
                Transmission:
                <select
                  className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </label>
            </div>
          )}
          {activeFilter === 'engineCapacity' && (
            <div>
              <label>
                Engine Capacity (cc):
                <input
                  type="number"
                  className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                  placeholder="Enter engine capacity"
                  min={0}
                  value={engineCapacity}
                  onChange={(e) => setEngineCapacity(e.target.value)}
                />
              </label>
            </div>
          )}
          {activeFilter === 'seatingCapacity' && (
            <div>
              <label>
                Seating Capacity:
                <input
                  type="number"
                  className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                  placeholder="Enter seating capacity"
                  min={1}
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                />
              </label>
            </div>
          )}
          {activeFilter === 'category' && (
            <div>
              <label>
                Category:
                <select
                  className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </label>
            </div>
          )}
          {activeFilter === 'color' && (
            <div>
              <label>
                Color:
                <input
                  type="text"
                  className="block w-full p-2 text-lg text-gray-900 bg-white rounded-lg border-none shadow-sm"
                  placeholder="Enter car color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  setOtherTerm: PropTypes.func.isRequired,
};
