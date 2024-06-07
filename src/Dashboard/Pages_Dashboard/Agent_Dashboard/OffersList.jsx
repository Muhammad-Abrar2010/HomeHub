import { useState, useEffect } from "react";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosPublic.get("/offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      }
    };

    fetchOffers();
  }, [axiosPublic]);

  const handleUpdateStatus = async (offerId, status) => {
    try {
      await axiosPublic.patch(`/offers/${offerId}/status`, { status });
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, status } : offer
        )
      );
    } catch (error) {
      console.error("Failed to update offer status:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">All Offers</h1>
      {offers.length === 0 ? (
        <p>No offers yet.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Property Title</th>
              <th className="py-2">Property Location</th>
              <th className="py-2">Buyer Email</th>
              <th className="py-2">Buyer Name</th>
              <th className="py-2">Offered Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="py-2">{offer.property_title}</td>
                <td className="py-2">{offer.property_location}</td>
                <td className="py-2">{offer.buyer_email}</td>
                <td className="py-2">{offer.buyer_name}</td>
                <td className="py-2">{offer.offered_amount}</td>
                <td className="py-2">{offer.status}</td>
                <td className="py-2">
                  {offer.status === "pending" && (
                    <>
                      <button
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleUpdateStatus(offer._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleUpdateStatus(offer._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OffersList;
