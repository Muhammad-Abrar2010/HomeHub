import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import ClipLoader from "react-spinners/ClipLoader"; // Import a loader from react-spinners

const LatestReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/reviews")
      .then((response) => {
        const latestReviews = response.data.slice(0, 3); // Ensure we have at least 3 reviews
        setReviews(latestReviews);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, [axiosPublic]);

  return (
    <div className="p-4 bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Latest User Reviews</h2>
      {loading ? (
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
      ) : (
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review-card bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                <img
                  src={review.userProfilePicture}
                  alt={`${review.userName}'s profile`}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review.userName}</h3>
                  <p className="text-sm text-gray-500"><strong>Property:</strong> {review.propertyTitle}</p>
                  <p className="mt-2">{review.reviewText}</p>
                  <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestReviews;
