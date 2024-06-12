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
  const reloadPage = () => {
    setTimeout(function () {
      location.reload();
    }, 1500);
  };
  const createUser = (email, password, displayName, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: displayName,
          photoURL: photoURL,
        })
          .then(() => {
            return userCredential.user;
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("registration successfull,please login again");
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => console.log(res.data));
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      })
      .catch((error) => toast.error(error.message));
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
          role: "user",
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => console.log(res.data));
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      })
      .catch((error) => toast.error(error.message));
  };

  const updateProfileInfo = (displayName, photoURL) => {
    if (auth.currentUser) {
      toast.success("profile update successfull");
      reloadPage();
      return updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
    } else {
      return toast.error("No user is currently logged in");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { user: currentUser.email };
        axiosPublic.post("jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      console.log("Current User", currentUser);
      return () => {
        unsubscribe();
      };
    });
  }, [axiosPublic]);

  const logout = () => {
    setLoading(true);
    toast.success("logout successfull");
    return signOut(auth);
  };

  const authInfo = {
    user,
    createUser,
    loginUser,
    logout,
    loginGoogle,
    loading,
    updateProfileInfo,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Firebaseprovider;
