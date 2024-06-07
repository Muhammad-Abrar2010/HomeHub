


import { useNavigate } from "react-router-dom";
import useWishlist from "../../Hooks/useWishlist";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, loading, toggleWishlist } = useWishlist();

  const handleMakeOffer = (property) => {
    navigate("/dashboard/make-offer", { state: { property } });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p>No properties in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((property) => (
            <div
              key={property.estateId}
              className="border p-4 rounded-lg shadow-md"
            >
              <img
                src={property.property_image}
                alt={property.property_title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">
                {property.property_title}
              </h2>
              <p className="text-gray-600 mb-2">
                Location: {property.property_location}
              </p>
              <p className="text-gray-600 mb-2">Agent: {property.agent_name}</p>
              <img
                src={property.agent_image}
                alt={property.agent_name}
                className="w-10 h-10 rounded-full mb-2"
              />
              <p className="text-gray-600 mb-2">
                Verification Status: {property.verification_status}
              </p>
              <p className="text-gray-600 mb-2">
                Price Range: {property.price_range}
              </p>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={() => toggleWishlist(property.estateId)}
                >
                  {wishlist.some(item => item.estateId === property.estateId) ? 'Remove' : 'Add'}
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => {
                    handleMakeOffer(property);
                  }}
                >
                  Make an Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
