import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
