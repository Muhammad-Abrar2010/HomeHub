import { createContext, useEffect, useState } from "react";
import useaxiosPublic from "../../Hooks/Axios/useAxiosPublic";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./Firebase.config";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const Firebaseprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useaxiosPublic();

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };



  const loginGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully logged with google");
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => console.log(res.data));
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      console.log("Current User", currentUser);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    createUser,
    loginUser,
    logout,
    loginGoogle,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Firebaseprovider;
