// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

// const ManageReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axiosSecure.get("/reviews");
//         console.log(response.data);
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Failed to fetch reviews", error);
//       }
//     };

//     fetchReviews();
//   }, [axiosSecure]);

//   const handleDelete = async (reviewId) => {
//     try {
//       await axiosSecure.delete(`/reviews/${reviewId}`);
//       setReviews(reviews.filter(review => review._id !== reviewId));
//     } catch (error) {
//       console.error("Failed to delete review", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Manage Reviews</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {reviews.map(review => (
//           <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
//             <div className="flex items-center mb-4">
//               <img
//                 src={review.userProfilePicture}
//                 alt={review.userName}
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold">{review.userName}</h2>
//                 <p className="text-gray-600">{review.userEmail}</p>
//               </div>
//             </div>
//             <p className="mb-4">{review.reviewText}</p>
//             <button
//               onClick={() => handleDelete(review._id)}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageReviews;


import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get("/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  const handleDelete = async (reviewId) => {
    try {
      // Delete review from the backend
      await axiosSecure.delete(`/reviews/${reviewId}`);

      // Update the state to remove the deleted review
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={review.userProfilePicture}
                alt={review.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{review.userName}</h2>
                <p className="text-gray-600">{review.userEmail}</p>
              </div>
            </div>
            <p className="mb-4">{review.reviewText}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
