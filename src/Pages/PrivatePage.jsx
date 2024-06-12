import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";

const PrivatePage = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const delay = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [user]);

  if (loading) {
    return <HashLoader className="m-auto" />;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivatePage;
