import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState({
    property_title: "",
    property_location: "",
    price_range: "",
    property_image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosSecure.get(`/estates/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError("Failed to fetch property. Please try again later.");
        toast.error("Failed to fetch property. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [axiosSecure, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.put(`/updateProperty/${id}`, property);
      if (response.status === 200) {
        toast.success("Property updated successfully");
        navigate("/dashboard/my-property");
      } else {
        throw new Error("Failed to update property");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating property");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg">Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Update Property</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="property_title"
          >
            Property Title
          </label>
          <input
            id="property_title"
            name="property_title"
            type="text"
            value={property.property_title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="property_location"
          >
            Property Location
          </label>
          <input
            id="property_location"
            name="property_location"
            type="text"
            value={property.property_location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price_range"
          >
            Price Range
          </label>
          <input
            id="price_range"
            name="price_range"
            type="text"
            value={property.price_range}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 "
            htmlFor="agent_name"
          >
            Agent Name
          </label>
          <input
            id="agent_name"
            name="agent_name"
            type="text"
            value={property.agent_name}
            onChange={handleChange}
            className="shadow cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="agent_image"
          >
            Agent Image URL
          </label>
          <input
            id="agent_image"
            name="agent_image"
            type="text"
            value={property.agent_image}
            onChange={handleChange}
            className="shadow cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            disabled
          />
        </div>
     
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
