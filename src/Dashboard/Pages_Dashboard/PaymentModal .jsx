import  { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const PaymentModal = ({ clientSecret, closeModal, updatePropertiesBought, property, email }) => {
  const axiosPublic = useAxiosSecure();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      if (!stripe || !elements) {
        setIsProcessing(false);
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
          await axiosPublic.put(`/update-offer-status/${property.estateId}/${property._id}`, {
            status: "bought",
            transactionId: result.paymentIntent.id,
          });
          updatePropertiesBought();
        }
        closeModal(); // Close the modal after successful payment
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <CardElement className="mb-4" />
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white py-2 px-4 rounded"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
