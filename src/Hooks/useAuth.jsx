import { useContext } from "react";
import { AuthContext } from "../Pages/Firebase/Firebaseprovider";

const useAuth = () => {
const auth = useContext(AuthContext);
return auth;

 
};

export default useAuth;