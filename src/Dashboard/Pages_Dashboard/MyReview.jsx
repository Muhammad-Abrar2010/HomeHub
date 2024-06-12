import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      fetchUserReviews(user.email);
    }
  }, [user,axiosSecure]);

  const fetchUserReviews = async (email) => {
    try {
      const response = await axiosSecure.get(`/reviews/user/${email}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      toast.error("Failed to fetch reviews");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosSecure.delete(`/reviews/${reviewId}`);
      setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-3xl font-bold mt-4 mb-2">My Reviews</h2>
      <div>
        {reviews.map((review) => (
          <div key={review._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-xl font-bold">{review.estateId}</h3>
                <p className="text-gray-600">{review.userName}</p>
                <p className="mt-2">{review.reviewText}</p>
              </div>
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
