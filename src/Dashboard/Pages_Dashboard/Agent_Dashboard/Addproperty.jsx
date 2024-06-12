


import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [propertyData, setPropertyData] = useState({
    property_title: "",
    property_location: "",
    property_image: null,
    price_range: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "property_image") {
      setPropertyData({ ...propertyData, property_image: files[0] });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const property_image_url = await uploadImage(propertyData.property_image);
    const propertyDetails = {
      ...propertyData,
      agent_name: user?.displayName,
      agent_email: user?.email,
      agent_image: user?.photoURL,
      property_image: property_image_url,
    };

    try {
      axiosSecure
        .post("/addproperty", propertyDetails)
        .then(() => {
          toast.success("data added successfully");
          setPropertyData({
            property_title: "",
            property_location: "",
            property_image: null,
            price_range: "",
          });
        });
    } catch (error) {
      console.error(error);
      alert("Error adding property");
    }
  };

  const uploadImage = async (file) => {
    // Implement your image upload logic here
    // For now, return a placeholder URL
    return "http://example.com/uploaded-property-image.jpg";
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            name="property_title"
            value={propertyData.property_title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Location
          </label>
          <input
            type="text"
            name="property_location"
            value={propertyData.property_location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Image
          </label>
          <input
            type="file"
            name="property_image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            type="text"
            name="agent_name"
            value={user?.displayName || "loading..."}
            readOnly
            className="mt-1 block w-full border cursor-not-allowed border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agent Email
          </label>
          <input
            type="email"
            name="agent_email"
            value={user?.email || "loading..."}
            readOnly
            className="mt-1 block w-full border cursor-not-allowed border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agent Image
          </label>
          <input
            type="text"
            name="agent_image"
            value={user?.photoURL || "loading..."}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
          />
        </div>
      
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <input
            type="text"
            name="price_range"
            value={propertyData.price_range}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
