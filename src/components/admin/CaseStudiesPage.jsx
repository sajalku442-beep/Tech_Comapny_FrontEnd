import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Pencil, Trash2, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import getallcaseblog from "../hookes/getallcaseblog";
import { useSelector } from "react-redux";
import axios from "axios";
import { CASEBLOG_API_END_POINT } from "../utils/constant";

import { toast } from "sonner";
import useGetallcaseblog from "../hookes/getallcaseblog";

const CaseStudiesPage = () => {
  
  useGetallcaseblog();
  const { allcaseblogs } = useSelector((store) => store.case);
  const { token } = useSelector((store) => store.auth);
  console.log("All Case Blogs from Redux:", allcaseblogs);

  const handleEdit = (id) => {
    console.log("Edit:", id);
  };
  const [filterjcase, setFiltercase] = useState(allcaseblogs);
  useEffect(() => {
    setFiltercase(allcaseblogs);
  }, [allcaseblogs]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${CASEBLOG_API_END_POINT}/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        setFiltercase((prevcase) => prevcase.filter((data) => data._id !== id));
        toast("Case blog deleted successfully");
      }
    } catch (error) {
      console.log(error);
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
        Case Studies Management
      </motion.h1>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterjcase?.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden"
          >
            
            <img
              src={item.image}
              className="w-full h-40 object-cover"
              alt="case-study"
            />

            
            <div className="p-5">
              {/* Tag */}
              <div className="flex items-center gap-2 text-violet-300 text-sm mb-2">
                <Tag size={14} />
                {item.tag}
              </div>

             
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              
              <p className="text-gray-400 text-sm mb-4">
                Created on: {item.createdAt}
              </p>

             
              <div className="flex justify-between mt-4">
                <Link
                  to={`/admin/cases/edit/${item._id}`}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-500"
                >
                  <Pencil size={18} /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-500"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
