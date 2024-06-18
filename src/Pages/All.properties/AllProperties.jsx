import { useState } from "react";
import { Link } from "react-router-dom";
import GetEstateData from "../../Hooks/GetEstateData";

const AllProperties = () => {
  const estates = GetEstateData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredEstates = estates.filter((estate) =>
    estate.property_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEstates = filteredEstates.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.min_price - b.min_price;
    } else if (sortOrder === "desc") {
      return b.min_price - a.min_price;
    }
  });

  return (
    <div>
      <div className="controls flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <select value={sortOrder} onChange={handleSortChange} className="p-2 border border-gray-300 rounded">
          <option value="none">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="advertisement-section flex flex-wrap justify-around mt-10">
        {sortedEstates.map((estate) => (
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
                Price Range: {estate.min_price}-{estate.max_price}
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
      </div>
    </div>
  );
};

export default AllProperties;
