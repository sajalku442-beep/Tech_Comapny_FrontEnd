import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Share2, Calendar } from "lucide-react";
import axios from "axios";
import { CASEBLOG_API_END_POINT } from "./utils/constant";

const CaseStudyDetail = () => {
  const { id } = useParams();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCase = async () => {
    try {
      const res = await axios.get(`${CASEBLOG_API_END_POINT}/get/${id}`);
      if (res?.data?.success) {
        console.log(res.data.blog);

        setCaseData(res?.data?.blog);
      }
    } catch (error) {
      console.log("Error fetching case details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-xl">Case study not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/cases"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6"
        >
          <ArrowLeft /> Back to Case Studies
        </Link>

        {/* Header Image */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={caseData.image}
          alt="Case Banner"
          className="w-full h-72 object-cover rounded-2xl mb-8 border border-white/20"
        />

        {/* Tag */}
        <p className="text-sm text-violet-300">{caseData.tag}</p>

        {/* Title */}
        <h1 className="text-4xl font-bold mt-2 mb-3">{caseData.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <Calendar size={18} />{" "}
            {new Date(caseData.createdAt).toISOString().split("T")[0]}
          </div>
          <button className="flex items-center gap-2 hover:text-white">
            <Share2 size={18} /> Share
          </button>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl leading-relaxed"
        >
          <p className="text-gray-200 whitespace-pre-line">
            {caseData.content}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
