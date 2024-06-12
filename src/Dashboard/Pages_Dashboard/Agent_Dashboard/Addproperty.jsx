


import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic"; // Fixed import

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const imgBBSecret = import.meta.env.VITE_IMGBB_SECRET_KEY;
  const imgBBApi = `https://api.imgbb.com/1/upload?key=${imgBBSecret}`;
  const axiosPublic = useAxiosPublic();
  const [propertyData, setPropertyData] = useState({
    property_title: "",
    property_location: "",
    property_image: null,
    min_price: "",
    max_price: "",
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

    try {
      const property_image_url = await uploadImage(propertyData.property_image);
      const propertyDetails = {
        ...propertyData,
        agent_name: user?.displayName,
        agent_email: user?.email,
        agent_image: user?.photoURL,
        property_image: property_image_url,
      };

      await axiosSecure.post("/addProperty", propertyDetails);
      toast.success("Data added successfully");

      setPropertyData({
        property_title: "",
        property_location: "",
        property_image: null,
        min_price: "",
        max_price: "",
      });
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Error adding property");
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosPublic.post(imgBBApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
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
            Min Price
          </label>
          <input
            type="text"
            name="min_price"
            value={propertyData.min_price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            type="text"
            name="max_price"
            value={propertyData.max_price}
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
