
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const stripePromise = loadStripe("pk_test_51PPqa300ZFc4Qay5rrvGMytEMBuiH0Ji5fNVw6FTuzQkvt3i8r7KNBaKBGAeKNNciTRFP3gUbRAb8Wpk0YgD3jI700f0nh1Qdh");

const PropertyBought = () => {
  const [propertiesBought, setPropertiesBought] = useState([]);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosSecure();
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
              />
            ))}
          </div>
        )}
      </div>
    </Elements>
  );
};

const PropertyCard = ({ property, email }) => {
  const axiosPublic = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    try {
      const response = await axiosPublic.post(
        "/create-payment-intent",
        {
          amount: property.offered_amount,
          email,
        }
      );

      const { clientSecret } = response.data;
      setClientSecret(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email,
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Update property status to 'bought'
          await axiosPublic.put(`/update-offer-status/${property.estateId}`, {
            status: "bought",
            transactionId: result.paymentIntent.id,
          });
          // Reload properties
          const updatedProperties = await axiosPublic.get(`/offers/${email}`);
          setPropertiesBought(updatedProperties.data);
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={property.property_image}
        alt={property.property_title}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{property.property_title}</h2>
      <p className="text-gray-600 mb-2">
        Location: {property.property_location}
      </p>
      <p className="text-gray-600 mb-2">Agent: {property.agent_name}</p>
      <p className="text-gray-600 mb-2">
        Offered Amount: {property.offered_amount}
      </p>
      {property.status === "accepted" ? (
        <>
          <CardElement />
          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Pay
          </button>
        </>
      ) : (
        <p>Status: Pending</p>
      )}
    </div>
  );
};

export default PropertyBought;
