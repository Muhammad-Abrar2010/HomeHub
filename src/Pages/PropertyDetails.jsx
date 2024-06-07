// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import GetEstateData from "../Hooks/GetEstateData";
// import {
//   FaMapMarkerAlt,
//   FaDollarSign,
//   FaCheckCircle,
//   FaInfoCircle,
//   FaHeart,
//   FaRegHeart,
// } from "react-icons/fa";
// import { FadeLoader } from "react-spinners";
// import toast from "react-hot-toast";
// import useWishlist from "../Hooks/useWishlist";
// import "sweetalert2/src/sweetalert2.scss";
// import useAxiosPublic from "../Hooks/Axios/useAxiosPublic";
// import useAuth from "../Hooks/useAuth";

// const PropertyDetails = () => {
//   const { user } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const { id } = useParams();
//   const estates = GetEstateData();
//   const [estate, setEstate] = useState(null);
//   const [review, setReview] = useState([]);
//   const { wishlist, toggleWishlist } = useWishlist();
//   const [reviewText, setReviewText] = useState("");
//   const userName = user ? user.displayName || "" : "";
//   const userEmail = user ? user.email || "" : "";

//   useEffect(() => {
//     const selectedEstate = estates.find((estate) => estate._id === id);
//     setEstate(selectedEstate);
//   }, [estate, id, estates]);

//   const reloadPage = () => {
//     setTimeout(function () {
//       location.reload();
//     }, 500);
//   };
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axiosPublic.get(`/reviews`, {
//           params: { estateId: id },
//         });
//         setReview(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };
//     fetchReviews();
//   }, [id, axiosPublic]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!reviewText) return;

//     try {
//       const newComment = {
//         estateId: id,
//         userName,
//         userEmail,
//         userProfilePicture: user.photoURL || "",
//         reviewText,
//       };

//       await axiosPublic.post("/reviews", newComment);
//       setReviewText((prevComments) => [...prevComments, newComment]);
//       setReviewText("");
//       toast.success("Comment added");
//     } catch (error) {
//       toast.error("Failed to add comment");
//     }
//   };

//   const isWishlisted = wishlist.some((item) => item.estateId === id);

//   const handleToggleWishlist = async () => {
//     await toggleWishlist(id);
//     if (isWishlisted) {
//       toast.success("Removed from wishlist");
//     } else {
//       toast.success("Added to wishlist");
//       reloadPage();
//     }
//   };

//   if (!estate) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <FadeLoader />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//       <img
//         className="w-full h-64 object-cover rounded-t-lg"
//         src={estate.property_image}
//         alt={estate.property_title}
//       />
//       <div className="p-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-3xl font-bold mt-4 mb-2">
//             {estate.property_title}
//           </h2>
//           <button
//             className="text-red-500 text-2xl"
//             onClick={handleToggleWishlist}
//           >
//             {!isWishlisted ? <FaRegHeart /> : <FaHeart />}
//           </button>
//         </div>
//         <div className="flex items-center text-gray-700 mb-2">
//           <FaMapMarkerAlt className="mr-2" />
//           <span>Location: {estate.property_location}</span>
//         </div>
//         <div className="flex items-center text-gray-700 mb-2">
//           <FaDollarSign className="mr-2" />
//           <span>Price Range: {estate.price_range}</span>
//         </div>
//         <div className="flex items-center text-gray-700 mb-2">
//           <FaCheckCircle className="mr-2" />
//           <span>Verification Status: {estate.verification_status}</span>
//         </div>
//         <div className="text-gray-700 mt-4">
//           <FaInfoCircle className="mr-2 inline" />
//           <span>{estate.property_description}</span>
//         </div>
//         {/* review section */}
//         <form onSubmit={handleCommentSubmit} className="mt-4">
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             placeholder="Write a comment..."
//             className="w-full p-2 border rounded"
//             rows="4"
//           />
//           <button
//             type="submit"
//             className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
//           >
//             Submit Comment
//           </button>
//         </form>
//         {/* show reviews */}
//         <div>
//           {review.map((comment, index) => (
//             <div key={index} className="mb-4">
//               <div className="flex items-center mb-2">
//                 <img
//                   src={comment.userProfilePicture}
//                   alt="Profile"
//                   className="h-10 w-10 rounded-full mr-2"
//                 />
//                 <div>
//                   <p className="font-bold">{comment.userName}</p>
//                   <p className="text-gray-600">{comment.reviewText}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetEstateData from "../Hooks/GetEstateData";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheckCircle,
  FaInfoCircle,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import useWishlist from "../Hooks/useWishlist";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../Hooks/Axios/useAxiosPublic";
import useAuth from "../Hooks/useAuth";

const PropertyDetails = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const estates = GetEstateData();
  const [estate, setEstate] = useState(null);
  const [review, setReview] = useState([]);
  const { wishlist, toggleWishlist } = useWishlist();
  const [reviewText, setReviewText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userName = user ? user.displayName || "" : "";
  const userEmail = user ? user.email || "" : "";

  useEffect(() => {
    const selectedEstate = estates.find((estate) => estate._id === id);
    setEstate(selectedEstate);
  }, [estate, id, estates]);

  const reloadPage = () => {
    setTimeout(function () {
      location.reload();
    }, 500);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get(`/reviews`, {
          params: { estateId: id },
        });
        setReview(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchReviews();
  }, [id, axiosPublic]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) return;

    try {
      const newComment = {
        estateId: id,
        userName,
        userEmail,
        userProfilePicture: user.photoURL || "",
        reviewText,
      };

      await axiosPublic.post("/reviews", newComment);
      setReview((prevComments) => [...prevComments, newComment]);
      setReviewText("");
      setShowModal(false);
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const isWishlisted = wishlist.some((item) => item.estateId === id);

  const handleToggleWishlist = async () => {
    await toggleWishlist(id);
    if (isWishlisted) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
      reloadPage();
    }
  };

  if (!estate) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-64 object-cover rounded-t-lg"
        src={estate.property_image}
        alt={estate.property_title}
      />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mt-4 mb-2">
            {estate.property_title}
          </h2>
          <button
            className="text-red-500 text-2xl"
            onClick={handleToggleWishlist}
          >
            {!isWishlisted ? <FaRegHeart /> : <FaHeart />}
          </button>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>Location: {estate.property_location}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaDollarSign className="mr-2" />
          <span>Price Range: {estate.price_range}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaCheckCircle className="mr-2" />
          <span>Verification Status: {estate.verification_status}</span>
        </div>
        <div className="text-gray-700 mt-4">
          <FaInfoCircle className="mr-2 inline" />
          <span>{estate.property_description}</span>
        </div>
        {/* Button to open modal */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Write a comment
        </button>
        {/* show reviews */}
        <div>
          {review.map((comment, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={comment.userProfilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-bold">{comment.userName}</p>
                  <p className="text-gray-600">{comment.reviewText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for review form */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-0 right-0 m-4 text-gray-500"
              >
                X
              </button>
              <h2 className="text-2xl mb-4">Add a Comment</h2>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded"
                  rows="4"
                />
                <button
                  type="submit"
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;