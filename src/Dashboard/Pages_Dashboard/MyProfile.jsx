import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user, updateProfileInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        profilePicture: user.photoURL || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileInfo(formData.name, formData.profilePicture);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <div className="flex flex-col items-center lg:w-1/2">
          <img
            className="w-32 h-32 rounded-full object-cover mb-4"
            src={user.photoURL}
            alt="Profile"
          />
          <div className="text-left w-full">
            <p className="text-lg mb-2">
              <strong className="text-gray-700">Name:</strong>{" "}
              {user.displayName}
            </p>
            <p className="text-lg mb-2">
              <strong className="text-gray-700">Email:</strong> {user.email}
            </p>
            <p className="text-lg mb-2">
              <strong className="text-gray-700">Joined:</strong>{" "}
              {user.metadata.creationTime}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
          <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border cursor-not-allowed	 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                disabled
                value={formData.email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="profilePicture"
              >
                Profile Picture URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="profilePicture"
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
