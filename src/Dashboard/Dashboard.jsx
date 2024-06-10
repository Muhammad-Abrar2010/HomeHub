import { useEffect, useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import useAxiosSecure from "../Hooks/Axios/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { user,loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Failed to fetch users", error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    if (!loading && users.length > 0) {
      const currentUser = users.find((u) => u.email === user.email);
      if (currentUser) {
        setIsAdmin(currentUser.role === "admin");
        setIsAgent(currentUser.role === "agent");
        setIsUser(currentUser.role === "user");
      }
    }
  }, [loading, users, user]);
  return (
    <div className="flex h-full bg-gray-200">
      {isUser && (
        <div
          className={`fixed inset-0 bg-[#1f1f1f] bg-opacity-90 z-50 transform md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end p-4">
            <button onClick={toggleSidebar} className="focus:outline-none">
              <MdClose className="w-8 h-8 text-white" />
            </button>
          </div>
          <ul className="flex flex-col items-center gap-4 mt-10">
            <li className="group cursor-pointer text-xl text-white">
              <NavLink
                exact
                to="/dashboard/myprofile"
                activeClassName="active"
                className="nav-link"
                onClick={toggleSidebar}
              >
                My Profile
              </NavLink>
            </li>
            <li className="group cursor-pointer text-xl text-white">
              <NavLink
                to="/dashboard/wishlist"
                activeClassName="active"
                className="nav-link"
                onClick={toggleSidebar}
              >
                WishList
              </NavLink>
            </li>
            <li className="group cursor-pointer text-xl text-white">
              <NavLink
                to="/dashboard/property-bought"
                activeClassName="active"
                className="nav-link"
                onClick={toggleSidebar}
              >
                Property Bought
              </NavLink>
            </li>
            <li className="group cursor-pointer text-xl text-white">
              <NavLink
                to="/dashboard/my-reviews"
                activeClassName="active"
                className="nav-link"
                onClick={toggleSidebar}
              >
                My Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute right-5 top-5 text-white bg-gray-800 p-2 rounded-full"
      >
        <MdMenu className="w-8 h-8 text-white" />
      </button>
      <div className="w-64 bg-gray-800 hidden lg:flex flex-col min-h-[100vh]">
        <header className="p-4 flex flex-col items-center justify-center bg-gray-900">
          <h1 className="text-white text-2xl">Home-Hub</h1>
          <Link to="/dashboard" className="text-white text-lg mt-2">
            Dashboard
          </Link>
        </header>
        <nav className="mt-4 md:mt-10 flex-1">
          {isUser && (
            <div>
              <NavLink
                exact
                to="/dashboard/myprofile"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeClassName="active"
              >
                My Profile
              </NavLink>
              <NavLink
                to="/dashboard/wishlist"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeClassName="active"
              >
                WishList
              </NavLink>
              <NavLink
                to="/dashboard/my-reviews"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeClassName="active"
              >
                My Reviews
              </NavLink>
              <NavLink
                to="/dashboard/property-bought"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeClassName="active"
              >
                Property Bought
              </NavLink>
            </div>
          )}
          {isAgent && (
            <div>
              <hr className=" m-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              <h1 className="text-center text-white text-lg mt-2">
                Agent Dashboard
              </h1>
              <hr className="m-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

              <NavLink
                to="/dashboard/agent-profile"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeclassname="active"
              >
                Agent Profile
              </NavLink>

              <NavLink
                to="/dashboard/add-property"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeclassname="active"
              >
                Add Property
              </NavLink>

              <NavLink
                to="/dashboard/my-property"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeclassname="active"
              >
                My Properties
              </NavLink>
            </div>
          )}

          {isAdmin && (
            <div>
              <hr className=" m-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              <h1 className="text-center text-white text-lg mt-2">
                Admin Dashboard
              </h1>
              <hr className="m-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

              <NavLink
                to="/dashboard/admin-profile"
                className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
                activeclassname="active"
              >
                Admin Profile
              </NavLink>
            </div>
          )}
        </nav>
      </div>
      <div className="w-full p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

// import { useState, useEffect, useContext } from "react";
// import { Outlet, NavLink, Link } from "react-router-dom";
// import { MdMenu, MdClose } from "react-icons/md";
// import useAuth from "../Hooks/useAuth";
// import useAxiosSecure from "../Hooks/Axios/useAxiosSecure";

// function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [users, setUsers] = useState([]);
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     axiosSecure.get("/users")
//       .then(response => setUsers(response.data))
//       .catch(error => console.error("Failed to fetch users", error));
//   }, []);

//   return (
//     <div className="flex h-full bg-gray-200">
//       {/* Sidebar code remains the same */}
//       <button
//         onClick={toggleSidebar}
//         className="md:hidden absolute right-5 top-5 text-white bg-gray-800 p-2 rounded-full"
//       >
//         <MdMenu className="w-8 h-8 text-white" />
//       </button>
//       <div className="w-64 bg-gray-800 hidden lg:flex flex-col min-h-[100vh]">
//         <header className="p-4 flex flex-col items-center justify-center bg-gray-900">
//           <h1 className="text-white text-2xl">Home-Hub</h1>
//           <Link to="/dashboard" className="text-white text-lg mt-2">
//             Dashboard
//           </Link>
//         </header>
//         <nav className="mt-4 md:mt-10 flex-1">
//           {/* User, Agent, Admin NavLinks */}
//         </nav>
//       </div>
//       <div className="w-full p-5">
//         {user?.role === "admin" && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4">User Name</th>
//                   <th className="py-2 px-4">User Email</th>
//                   <th className="py-2 px-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map(user => (
//                   <tr key={user._id}>
//                     <td className="border px-4 py-2">{user.name}</td>
//                     <td className="border px-4 py-2">{user.email}</td>
//                     <td className="border px-4 py-2">
//                       <button
//                         onClick={() => handleMakeAdmin(user._id)}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                       >
//                         Make Admin
//                       </button>
//                       <button
//                         onClick={() => handleMakeAgent(user._id)}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
//                       >
//                         Make Agent
//                       </button>
//                       {user.role === "agent" && (
//                         <button
//                           onClick={() => handleMarkAsFraud(user._id)}
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
//                         >
//                           Mark as Fraud
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDeleteUser(user._id)}
//                         className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
//                       >
//                         Delete User
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
