import Advertisement from "./Home Sections/Advertisement";
import { Carousel } from "./Home Sections/Carousel";
import LatestReviews from "./Home Sections/LatestReviews";
import Testimonial from "./Home Sections/Testimonial";

const Home = () => {
  return (<>
  <Carousel></Carousel>
  <Advertisement></Advertisement>
  <LatestReviews></LatestReviews>
  <Testimonial></Testimonial>
  </>);
};

export default Home;
