import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./Axios/useAxiosPublic";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const userEmail = loading ? null : user && user.email;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (userEmail) {
          const response = await axiosPublic.get(`/wishlist/${userEmail}`);
          const wishlistItems = response.data;

          const detailedWishlist = await Promise.all(
            wishlistItems.map(async (item) => {
              const propertyResponse = await axiosPublic.get(
                `/estates/${item.estateId}`
              );
              return { ...item, ...propertyResponse.data };
            })
          );

          setWishlist(detailedWishlist);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userEmail, axiosPublic]);

  const addToWishlist = async (estateId) => {
    try {
      const response = await axiosPublic.post(`/wishlist`, {
        email: userEmail,
        estateId,
      });
      const propertyResponse = await axiosPublic.get(`/estates/${estateId}`);
      setWishlist([...wishlist, { ...response.data, ...propertyResponse.data }]);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const removeFromWishlist = async (estateId) => {
    try {
      await axiosPublic.delete(`/wishlist/${estateId}`, {
        params: { email: userEmail },
      });
      setWishlist(wishlist.filter((item) => item.estateId !== estateId));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const toggleWishlist = async (estateId) => {
    const isInWishlist = wishlist.some((item) => item.estateId === estateId);
    if (isInWishlist) {
      await removeFromWishlist(estateId);
    } else {
      await addToWishlist(estateId);
    }
  };

  return { wishlist, loading, addToWishlist, removeFromWishlist, toggleWishlist };
};

export default useWishlist;
