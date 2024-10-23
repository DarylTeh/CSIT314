import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from "react-router-dom";
import { SlNote, SlTrash } from "react-icons/sl";
import { useSelector } from 'react-redux';

const TableData = ({ propsTable, onDelete }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return ( 
    <tr className="border-b-2 border-gray-200" key={propsTable._id}>
      <td className="px-4 py-3 border-x-2">{propsTable.brand}</td>
      <td className="px-4 py-3 border-r-2">{propsTable.model}</td>
      <td className="px-4 py-3 border-r-2 text-gray-700">{propsTable.price}</td>
      <td className="px-4 py-3 border-r-2">{propsTable.category}</td>
      <td className="px-4 py-3 border-r-2">{propsTable.transmission}</td>
      <td className="px-4 py-3 border-r-2">{propsTable.createdAt.slice(0, 10)}</td>
      <td className="px-4 py-3 border-r-2 flex justify-evenly items-center h-16 w-36 text-lg text-center">
        <Link to={`/edit-car/${propsTable._id}`} className="text-green-500 flex justify-center items-center h-10 w-10 text-xl font-bold bg-gray-100 rounded-md shadow-md hover:bg-gray-300">
          <SlNote />
        </Link>
        <Link onClick={() => onDelete(propsTable._id)} className="text-red-500 flex justify-center items-center h-10 w-10 text-xl font-bold bg-gray-100 rounded-md shadow-md hover:bg-gray-300">
          <SlTrash />
        </Link>
      </td>
    </tr>
  );
};

// Define propsTable for your component
TableData.propTypes = {
  propsTable: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Use _id instead of id
    price: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired, // Updated property
    model: PropTypes.string.isRequired, // Updated property
    category: PropTypes.string.isRequired, // Retained
    transmission: PropTypes.string.isRequired, // New property
    createdAt: PropTypes.string.isRequired, // New property for date
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableData;
