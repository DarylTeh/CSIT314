import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import { toast } from 'react-toastify';

const LikeButton = (props) => {
  // const {userInfo} = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getSavedCar = async() => {
      console.log("getSavedCar in LikeButton executed.");
      try{
        // if(props.userId != null || props.userId != undefined){
        const res = await api.get(`cars/save/${props.userId}/${props.carId}`);
        console.log("getSavedCar res : "+res.data);
        res.data.length === 0 || res.data === null ? setSaved(false) : setSaved(true);
      // }
      } catch(err){
        console.log("Fail to check whether user has saved this car.");
        toast.error(err.message);
        // toast.error("Fail to check whether user has saved this car.");
      }
    }
    getSavedCar();
  }, [props.carId]);

  const toggleLike = () => {
    setSaved(!saved);

    console.log("LikeButton userId : "+props.userId);
    console.log("LikeButton carId : "+props.carId);

    const buyerSavedCar = {
      userId: props.userId,
      carId: props.carId
    }

    if(!saved){
      try{
        const res = api.post(`cars/save/add`, 
          buyerSavedCar
          // ,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // }
        );
        toast.success("Car added into favourite list.");
      } catch(err){
        toast.error(err.message);
        console.log(err.message);
      }
    }
    else{
      try{
        const res = api.delete(`cars/save/remove/${props.userId}/${props.carId}`
        // ,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   }
        );
        toast.success("Saved car removed successfully.");
      }
      catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
  };

  return (
    <button
      className={`heart-button ${saved ? 'saved' : ''}`}
      onClick={toggleLike}
    >
      ❤️
    </button>
  );
};

export default LikeButton;