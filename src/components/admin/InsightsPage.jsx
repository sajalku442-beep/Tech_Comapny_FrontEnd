import React, { use, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

// FETCH HOOK
import { INSIGHT_API_END_POINT } from "../utils/constant.js";
import getAllInsights from "../hookes/getallinsight.jsx";
import useGetAllInsights from "../hookes/getallinsight.jsx";

const InsightsPage = () => {
  // Fetch insights from backend → Redux
  useGetAllInsights();

  const { allinsights } = useSelector((store) => store.insight);
  const { token } = useSelector((store) => store.auth);
  console.log(allinsights);

  const [filteredInsights, setFilteredInsights] = useState(allinsights);
  console.log(filteredInsights);

  // Sync UI with Redux data
  useEffect(() => {
    setFilteredInsights(allinsights);
  }, [allinsights]);

  // Delete Insight
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${INSIGHT_API_END_POINT}/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        setFilteredInsights((prev) => prev.filter((item) => item._id !== id));
        toast("Insight deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast("Failed to delete insight");
    }
  };

  return (
    <div className="text-white">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6"
      >
        Insights Management
      </motion.h1>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights?.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.image}
              alt="insight-cover"
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              {/* Summary */}
              <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                {item.summary}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Calendar size={14} />{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <Link
                  to={`/admin/insights/edit/${item._id}`}
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

export default InsightsPage;
