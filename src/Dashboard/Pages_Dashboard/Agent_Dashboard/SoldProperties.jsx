import  { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/Axios/useAxiosSecure';

const SoldProperties = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await axiosSecure.get(`/sold-properties/${user?.displayName}`);
        setSoldProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch sold properties:", error);
      }
    };

    fetchSoldProperties();
  }, [user,axiosSecure]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Sold Properties</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Property Title</th>
            <th className="px-4 py-2">Property Location</th>
            <th className="px-4 py-2">Buyer Email</th>
            <th className="px-4 py-2">Buyer Name</th>
            <th className="px-4 py-2">Sold Price</th>
          </tr>
        </thead>
        <tbody>
          {soldProperties.map(property => (
            <tr key={property._id}>
              <td className="border px-4 py-2">{property.property_title}</td>
              <td className="border px-4 py-2">{property.property_location}</td>
              <td className="border px-4 py-2">{property.buyer_email}</td>
              <td className="border px-4 py-2">{property.buyer_name}</td>
              <td className="border px-4 py-2">{property.offered_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoldProperties;
