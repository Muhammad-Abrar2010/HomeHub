import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import PaymentModal from "./PaymentModal ";
// import PaymentModal from "./PaymentModal";


const PropertyCard = ({ property, email, updatePropertiesBought }) => {
  const axiosPublic = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await axiosPublic.post("/create-payment-intent", {
        amount: property.offered_amount,
        email,
      });

      const { clientSecret } = response.data;
      setClientSecret(clientSecret);
      setShowModal(true);
    } catch (error) {
      console.error("Payment failed:", error);
      setShowModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
        <div>
          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </div>
      ) : (
        <p>Status: {property.status}</p>
      )}
      {showModal && (
        <PaymentModal
          clientSecret={clientSecret}
          closeModal={closeModal}
          updatePropertiesBought={updatePropertiesBought}
          property={property}
          email={email}
        />
      )}
    </div>
  );
};

export default PropertyCard;
