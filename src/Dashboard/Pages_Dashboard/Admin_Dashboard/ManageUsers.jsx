


// import { useEffect, useState } from "react";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

// function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const { loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     if (!loading) {
//       axiosSecure
//         .get("/users")
//         .then((response) => setUsers(response.data))
//         .catch((error) => console.error("Failed to fetch users", error));
//     }
//   }, [loading, axiosSecure]);

//   const makeAdmin = (userId) => {
//     axiosSecure
//       .post(`/users/${userId}/make-admin`)
//       .then(() => {
//         setUsers(users.map(user => user._id === userId ? { ...user, role: "admin" } : user));
//       })
//       .catch((error) => console.error("Failed to make admin", error));
//   };

//   const makeAgent = (userId) => {
//     axiosSecure
//       .post(`/users/${userId}/make-agent`)
//       .then(() => {
//         setUsers(users.map(user => user._id === userId ? { ...user, role: "agent" } : user));
//       })
//       .catch((error) => console.error("Failed to make agent", error));
//   };

//   const markAsFraud = (userEmail) => {
//     axiosSecure
//       .post(`/users/${userEmail}/mark-fraud`)
//       .then(() => {
//         setUsers(users.map(user => user.email === userEmail ? { ...user, isFraud: true } : user));
//       })
//       .catch((error) => console.error("Failed to mark as fraud", error));
//   };
//   const deleteUser = (userId) => {
//     axiosSecure
//       .delete(`/users/${userId}`)
//       .then(() => {
//         setUsers(users.filter(user => user._id !== userId));
//       })
//       .catch((error) => console.error("Failed to delete user", error));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">User Name</th>
//             <th className="py-2 px-4 border-b">User Email</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="py-2 px-4 border-b">{user.name}</td>
//               <td className="py-2 px-4 border-b">{user.email}</td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   onClick={() => makeAdmin(user._id)}
//                   className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
//                 >
//                   Make Admin
//                 </button>
//                 <button
//                   onClick={() => makeAgent(user._id)}
//                   className="bg-green-500 text-white py-1 px-2 rounded mr-2"
//                 >
//                   Make Agent
//                 </button>
//                 {user.role === "agent" && (
//                   <button
//                     onClick={() => markAsFraud(user._id)}
//                     className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
//                   >
//                     Mark as Fraud
//                   </button>
//                 )}
//                 <button
//                   onClick={() => deleteUser(user._id)}
//                   className="bg-red-500 text-white py-1 px-2 rounded"
//                 >
//                   Delete User
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ManageUsers;


import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading) {
      axiosSecure
        .get("/users")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Failed to fetch users", error));
    }
  }, [loading, axiosSecure]);

  const makeAdmin = (userId) => {
    axiosSecure
      .post(`/users/${userId}/make-admin`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );
      })
      .catch((error) => console.error("Failed to make admin", error));
  };

  const makeAgent = (userId) => {
    axiosSecure
      .post(`/users/${userId}/make-agent`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "agent" } : user
          )
        );
      })
      .catch((error) => console.error("Failed to make agent", error));
  };

  const deleteUser = (userEmail) => {
    axiosSecure
      .delete(`/users/${userEmail}`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== userEmail)
        );
      })
      .catch((error) => console.error("Failed to delete user", error));
  };

  const markAsFraud = (userId) => {
    axiosSecure
      .post(`/users/${userId}/mark-fraud`)
      .then(() => { deleteUser(userId);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isFraud: true } : user
          )
        );
      })
      .catch((error) => console.error("Failed to mark as fraud", error));
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User Name</th>
            <th className="py-2 px-4 border-b">User Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => makeAdmin(user._id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => makeAgent(user._id)}
                  className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                >
                  Make Agent
                </button>
                {user.role === "agent" && (
                  <button
                    onClick={() => markAsFraud(user._id)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Mark as Fraud
                  </button>
                )}
                <button
                  onClick={() => deleteUser(user._id, user.email)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
