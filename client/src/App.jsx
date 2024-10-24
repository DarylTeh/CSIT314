import React, { useState } from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Header from "./components/Header";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import ChangePassword from './pages/ChangePassword';
import RoutePrivate from './pages/RoutePrivate';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import Car from './pages/Car';
import CarList from './pages/CarList';
import Cars from './pages/Cars';
import FavDashboard from "./pages/FavDashboard";
import Calculator from "./pages/Calculator";


// From routes/index
// import Routes from './routes';


export default function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const handleFileSelect = (event) => {
//     const file = event.target.files;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const image = reader.result.split(",")[1];
//       uploadImage(image, file.type);
//     };
//     reader.readAsDataURL(file);
//   };

// const uploadImage = async (image, type) => {
//     const response = await fetch("/api/upload", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         image: {
//           name: selectedFile.name,
//           type: type,
//           data: image,
//         },
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//   };
//   const retrieveImage = async (id) => {
//     const response = await fetch(`/api/images/${id}`);
//     if (response.ok) {
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       const img = new Image();
//       img.src = url;
//       document.body.appendChild(img);
//     } else {
//       console.error("Error retrieving image");
//     }
//   };
//   const handleRetrieve = () => {
//     const id = prompt("Enter image ID:");
//     retrieveImage(id);
//   };

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <RouteWrapper path="/profile" element={<Profile/>} isPrivate /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/cars">
            <Route index element={<Cars />} />
            <Route path=":carId" element={<Car />} />
          </Route>
          <Route path="" element={<RoutePrivate />} >
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/add-car" element={<AddCar />}/>
            <Route path="/edit-car/:carId" element={<EditCar />}/>
            <Route path="/my-listing" element={<CarList />}/>
            <Route path="/fav-listing" element={<FavDashboard />} /> 
            <Route path="/loan-calculator" element={<Calculator />} />
          </Route>
          <Route path="*" element={<ErrorPage/>} />
      </Routes>

      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}
