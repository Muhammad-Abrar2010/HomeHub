import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 anima animate-spin">404</h1>
      <p className="text-xl">Page Not Found</p>
      <p className="text-lg mt-2">
        The page you are looking for does not exist.
      </p>
      <Link
        to={"/"}
        className="bg-blue-200 p-2 text-xl font font-extrabold rounded-lg hover:bg-blue-300 hover:p-[12px]"
      >
        Go back to home 
      </Link>
    </div>
  );
};

export default NotFound;
