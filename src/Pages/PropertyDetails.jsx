import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetEstateData from "../Hooks/GetEstateData";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheckCircle,
  FaInfoCircle,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import useWishlist from "../Hooks/useWishlist";
import "sweetalert2/src/sweetalert2.scss";

const PropertyDetails = () => {
  const { id } = useParams();
  const estates = GetEstateData();
  const [estate, setEstate] = useState(null);
  const { wishlist,  toggleWishlist } = useWishlist();

  useEffect(() => {
    const selectedEstate = estates.find((estate) => estate._id === id);
    setEstate(selectedEstate);
  }, [id, estates]);
  const reloadPage=()=> {
    setTimeout(function () {
      location.reload();
    }, 500);
  }
  const isWishlisted = wishlist.some((item) => item.estateId === id);

  const handleToggleWishlist = async () => {
    await toggleWishlist(id);
    if (isWishlisted) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
      reloadPage();
    }
    
  };

  if (!estate) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-64 object-cover rounded-t-lg"
        src={estate.property_image}
        alt={estate.property_title}
      />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mt-4 mb-2">
            {estate.property_title}
          </h2>
          <button className="text-red-500 text-2xl" onClick={handleToggleWishlist}>
            {!isWishlisted ? <FaRegHeart /> : <FaHeart />}
          </button>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>Location: {estate.property_location}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaDollarSign className="mr-2" />
          <span>Price Range: {estate.price_range}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaCheckCircle className="mr-2" />
          <span>Verification Status: {estate.verification_status}</span>
        </div>
        <div className="text-gray-700 mt-4">
          <FaInfoCircle className="mr-2 inline" />
          <span>{estate.property_description}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
