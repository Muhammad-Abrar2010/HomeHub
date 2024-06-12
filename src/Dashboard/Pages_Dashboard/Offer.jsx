import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Offer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state;
  const { user } = useAuth();
  const axiosPublic = useAxiosSecure();

  const [offeredAmount, setOfferedAmount] = useState("");
  const [error, setError] = useState(null);

  const handleOfferSubmit = async (e) => {
    e.preventDefault();

    // Validate the property and price range
    // if (!property || !property.price_range) {
    //   setError("Invalid property data.");
    //   return;
    // }

    const MinP = parseFloat(property.min_price);
    const MaxP = parseFloat(property.max_price);

    // if (isNaN(price)) {
    //   setError("Invalid price range value.");
    //   return;
    // }

    // if (offeredAmount === price) {
    //   setError("Offered amount must be exactly the specified price.");
    //   return;
    // }

    if (offeredAmount > MaxP) {
      setError("offered amount must be lower than max price");
      return;
    }

    if (offeredAmount < MinP) {
      setError("offered amount must be higher than min price");
      return;
    }

    try {
      await axiosPublic.post("/offers", {
        estateId: property._id,
        property_title: property.property_title,
        property_location: property.property_location,
        agent_name: property.agent_name,
        offered_amount: offeredAmount,
        buyer_email: user.email,
        buyer_name: user.displayName,
        buying_date: new Date().toISOString(),
        status: "pending",
      });

      navigate("/dashboard/property-bought", { state: { status: "pending" } });
    } catch (error) {
      console.error("Failed to submit offer:", error);
      setError("Failed to submit offer. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Make an Offer</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleOfferSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Property Title</label>
          <input
            type="text"
            value={property?.property_title || ""}
            readOnly
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Location</label>
          <input
            type="text"
            value={property?.property_location || ""}
            readOnly
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Name</label>
          <input
            type="text"
            value={property?.agent_name || ""}
            readOnly
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Offered Amount</label>
          <input
            type="number"
            value={offeredAmount}
            onChange={(e) => setOfferedAmount(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default Offer;
