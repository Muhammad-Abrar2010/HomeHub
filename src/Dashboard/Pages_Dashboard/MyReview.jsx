import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const MyReviews = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const userEmail = loading || (user && user.email);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await axiosPublic.get(`/my-reviews/${userEmail}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    if (userEmail) {
      fetchMyReviews();
    }
  }, [userEmail, axiosPublic]);

  const deleteReview = async (reviewId) => {
    try {
      const response = await axiosPublic.delete(`/reviews/${reviewId}`);
      if (response.status === 200) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
        toast.success("Review deleted successfully");
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("Failed to delete review");
      console.error("Failed to delete review:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-3xl font-bold mt-4 mb-6">My Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="mb-4 p-4 border rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-semibold">{review.property_title}</h3>
            <p className="text-gray-700">
              <strong>Agent Name:</strong> {review.agent_name}
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Review Time:</strong>{" "}
              {new Date(review.date).toLocaleString()}
            </p>
            <p className="text-gray-700 mt-2">{review.text}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => deleteReview(review._id)}
            >
              <FaTrash className="inline mr-2" /> Delete Review
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet. Start reviewing properties!</p>
      )}
    </div>
  );
};

export default MyReviews;
