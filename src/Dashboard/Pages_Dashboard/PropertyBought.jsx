import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const PropertyBought = () => {
//   const navigate = useNavigate();
  const [propertiesBought, setPropertiesBought] = useState([]);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const userEmail = loading ? null : user && user.email;

  useEffect(() => {
    const fetchPropertiesBought = async () => {
      try {
        if (userEmail) {
          const response = await axiosPublic.get(`/offers/${userEmail}`);
          setPropertiesBought(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch properties bought:", error);
      }
    };

    fetchPropertiesBought();
  }, [userEmail, axiosPublic]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Properties Bought</h1>
      {loading ? (
        <p>Loading...</p>
      ) : propertiesBought.length === 0 ? (
        <p>No properties bought yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertiesBought.map((property) => (
            <div
              key={property.estateId}
              className="border p-4 rounded-lg shadow-md"
            >
              <img
                src={property.property_image}
                alt={property.property_title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">
                {property.property_title}
              </h2>
              <p className="text-gray-600 mb-2">
                Location: {property.property_location}
              </p>
              <p className="text-gray-600 mb-2">Agent: {property.agent_name}</p>
              <p className="text-gray-600 mb-2">Offered Amount: {property.offered_amount}</p>
              <p className="text-gray-600 mb-2">Status: {property.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
