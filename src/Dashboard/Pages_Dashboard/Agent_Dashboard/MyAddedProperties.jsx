import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?.email) return;

      try {
        const response = await axiosSecure.get(
          `/properties/?agentEmail=${user.email}`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, [axiosSecure, user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleUpdate = (id) => {
    navigate(`/updateProperty/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/deleteProperty/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete property");
      }

      setProperties(properties.filter((property) => property._id !== id));
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting property");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">My Added Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={property.property_image}
              alt={property.property_title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">
              {property.property_title}
            </h2>
            <p className="text-gray-600 mb-2">{property.property_location}</p>
            <div className="flex items-center mb-2">
              <img
                src={property.agent_image}
                alt={property.agent_name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span>{property.agent_name}</span>
            </div>
            <p className="text-gray-600 mb-2">
              Status: {property.verification_status}
            </p>
            <p className="text-gray-600 mb-2">
              Price Range: {property.price_range}
            </p>
            {property.verification_status !== "rejected" && (
              <button
                onClick={() => handleUpdate(property._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Update
              </button>
            )}
            <button
              onClick={() => handleDelete(property._id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
