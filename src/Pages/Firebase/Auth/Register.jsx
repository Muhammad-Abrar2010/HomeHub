import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
const Register = () => {
  const { createUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return toast.error("Password must be longer than 6 characters");
    } else if (!/[A-Z]/.test(formData.password)) {
      return toast.error("Password must have at least one uppercase letter");
    } else if (!/[a-z]/.test(formData.password)) {
      return toast.error("Password must have at least one lowercase letter");
    }
    createUser(
      formData.email,
      formData.password,
      formData.displayName,
      formData.photoURL
    )
      .then(() => {
        setTimeout(() => {
          window.location.href = "/login";
          logout();
        }, 1500);
        
      })
      .catch((error) => {
        toast.error("Registration error:", error);
      });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            Or‎‎‎
            <Link
              to={"/login"}
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              ‎ login to your account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Display Name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  placeholder="John Doe"
                  type="text"
                  required=""
                  value={formData.displayName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required=""
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required=""
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Photo URL
                </label>
                <input
                  id="photoURL"
                  name="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  type="text"
                  required=""
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Create account
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
