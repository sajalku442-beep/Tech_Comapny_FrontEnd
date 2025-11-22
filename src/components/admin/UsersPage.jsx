import React from "react";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { toast } from "sonner";
import useGetAllUsers from "../hookes/getAllUsers";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.auth);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/delete/${id}`, {
        headers: { Auth: token },
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(removeUser(id));
        toast("User deleted successfully", {
          style: {
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontWeight: 600,
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast("Delete failed");
    }
  };

  return (
    <div className="text-white">
      
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6"
      >
        Users Management
      </motion.h1>

     
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-300 border-b border-white/20">
              <th className="py-3">User</th>
              <th className="py-3">Email</th>
              <th className="py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allUsers?.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10 hover:bg-white/5"
              >
                
                <td className="py-4 flex items-center gap-3">
                  <img
                    src={user?.image || "/default-user.png"}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                  <span className="font-medium">{user.username}</span>
                </td>

               
                <td className="py-4 text-gray-300">{user.email}</td>

                <td className="py-4 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
