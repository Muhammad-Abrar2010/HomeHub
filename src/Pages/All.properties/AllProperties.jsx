import { Link } from "react-router-dom";
import GetEstateData from "../../Hooks/GetEstateData";
const AllProperties = () => {
  const estates = GetEstateData();
  return (
    <div>
      <div className="advertisement-section flex flex-wrap justify-around mt-10">
        {estates.map((estate) => (
          <div
            className="card bg-white rounded-lg shadow-md overflow-hidden m-4 w-80"
            key={estate._id}
          >
            <img
              className="w-full h-48 object-cover"
              src={estate.property_image}
              alt={estate.property_title}
            />
            <div className="card-content p-4">
              <h3 className="text-lg font-semibold">{estate.property_title}</h3>
              <p className="text-gray-700 mt-2">{estate.property_location}</p>
              <p className="text-gray-700 mt-2">
                Price Range: {estate.price_range}
              </p>
              <p className="text-gray-700 mt-2">
                Verification Status: {estate.verification_status}
              </p>
              <Link
                to={`/property/${estate._id}`}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default AllProperties;
