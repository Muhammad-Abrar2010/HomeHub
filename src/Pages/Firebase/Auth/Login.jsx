import { useContext } from "react";
import { AuthContext } from "../Firebaseprovider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
const Login = () => {
  const { loginUser, loginGoogle } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => toast.success("login succesfull"))
      .catch((error) => toast.error(error.message));
  };
  const handleGoogle = () => {
    loginGoogle();
   
  };

 
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Log In</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center gap-4">
                  <button
                    className="px-8 py-4 bg-indigo-100 text-black font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                    onClick={handleGoogle}
                  >
                    <span className="flex gap-2">
                      <span className="mt-[2px]">
                        <FaGoogle />{" "}
                      </span>
                      <span>Sign Up with Google</span>
                    </span>
                  </button>
                  {/* <button
                    className="px-8 py-4 bg-indigo-100 text-black font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                    onClick={handleGithub}
                  >
                    <span className="flex gap-2">
                      <span className="mt-[2px]">
                        <FaGithub />{" "}
                      </span>
                      <span>Sign Up with Github</span>
                    </span>
                  </button> */}
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleLogin}>
                    {" "}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
