import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  const noHeadernFooterLogin = location.pathname.includes("login");
const noHeadernFooterRegister = location.pathname.includes("register");
  return (
    <div>
      {noHeadernFooterLogin || noHeadernFooterRegister || <Header></Header>}
      <Outlet></Outlet>
      {noHeadernFooterLogin || noHeadernFooterRegister|| <Footer></Footer>}
    </div>
  );
};

export default Root;
