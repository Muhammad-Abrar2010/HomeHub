import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosSecure.get("/estates");
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };

    fetchProperties();
  }, [axiosSecure]);

  const handleVerify = async (id) => {
    try {
      await axiosSecure.patch(`/verifyProperty/${id}`);
      setProperties(properties.map(prop => prop._id === id ? { ...prop, verification_status: "verified" } : prop));
    } catch (error) {
      console.error("Failed to verify property", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/rejectProperty/${id}`);
      setProperties(properties.map(prop => prop._id === id ? { ...prop, verification_status: "rejected" } : prop));
    } catch (error) {
      console.error("Failed to reject property", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Properties</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Property Title</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Agent Name</th>
            <th className="p-4 text-left">Agent Email</th>
            <th className="p-4 text-left">Price Range</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property._id} className="border-t border-gray-200">
              <td className="p-4">{property.property_title}</td>
              <td className="p-4">{property.property_location}</td>
              <td className="p-4">{property.agent_name}</td>
              <td className="p-4">{property.agent_email}</td>
              <td className="p-4">{property.price_range}</td>
              <td className="p-4">
                {property.verification_status === "verified" && (
                  <span className="text-green-600 font-semibold">Verified</span>
                )}
                {property.verification_status === "rejected" && (
                  <span className="text-red-600 font-semibold">Rejected</span>
                )}
                {property.verification_status === "pending" && (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
              </td>
              <td className="p-4">
                {property.verification_status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleVerify(property._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleReject(property._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
