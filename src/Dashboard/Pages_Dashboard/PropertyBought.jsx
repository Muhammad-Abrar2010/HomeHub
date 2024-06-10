import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import PropertyCard from "./PropertyCard";

const stripePromise = loadStripe(
  "pk_test_51PPqa300ZFc4Qay5rrvGMytEMBuiH0Ji5fNVw6FTuzQkvt3i8r7KNBaKBGAeKNNciTRFP3gUbRAb8Wpk0YgD3jI700f0nh1Qdh"
);

const PropertyBought = () => {
  const [propertiesBought, setPropertiesBought] = useState([]);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosSecure();
  const userEmail = loading ? null : user && user.email;

  useEffect(() => {
    let isMounted = true;
    const fetchPropertiesBought = async () => {
      try {
        if (userEmail && isMounted) {
          const response = await axiosPublic.get(`/offers/${userEmail}`);
          if (isMounted) setPropertiesBought(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch properties bought:", error);
      }
    };

    fetchPropertiesBought();

    return () => {
      isMounted = false;
    };
  }, [userEmail, axiosPublic]);

  const updatePropertiesBought = async () => {
    try {
      const response = await axiosPublic.get(`/offers/${userEmail}`);
      setPropertiesBought(response.data);
    } catch (error) {
      console.error("Failed to update properties bought:", error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Properties Bought</h1>
        {loading ? (
          <p>Loading...</p>
        ) : propertiesBought.length === 0 ? (
          <p>No properties bought yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesBought.map((property) => (
              <PropertyCard
                key={property.estateId}
                property={property}
                email={userEmail}
                updatePropertiesBought={updatePropertiesBought}
              />
            ))}
          </div>
        )}
      </div>
    </Elements>
  );
};

export default PropertyBought;
