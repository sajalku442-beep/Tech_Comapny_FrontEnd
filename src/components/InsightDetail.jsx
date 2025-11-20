import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllInsights from "./hookes/getallinsight";
import { INSIGHT_API_END_POINT } from "./utils/constant";


const dummyInsights = [
  {
    id: "1",
    title: "Future of AI in Healthcare",
    summary: "Short SEO-friendly summary about the future of AI.",
    content: `
      Artificial Intelligence continues to redefine diagnostics, 
      medical imaging, patient engagement and operational efficiency.
      In this article, we explore 2025 trends...
    `,
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1581091870627-3b6bdc5e4d83?w=1200",
    createdAt: "2024-02-02",
  },
  {
    id: "2",
    title: "UI/UX Design Trends 2025",
    summary: "Minimalism, neural UI, micro-interactions...",
    category: "Design",
    content: `
      UI/UX in 2025 emphasizes emotional experience, 
      immersive layouts, and human-centered micro-interactions.
    `,
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200",
    createdAt: "2023-12-21",
  },
];

const InsightDetail = () => {
  useGetAllInsights();
  const { id } = useParams();
  const { allinsights } = useSelector((store) => store.insight);
  const data = allinsights.find((insight) => insight._id === id);
  

 
  if (!data) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-xl">Insight not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <a
          href="/insights"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6"
        >
          <ArrowLeft /> Back to Insights
        </a>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={data.image}
          className="w-full h-72 object-cover rounded-2xl mb-8"
        />

       
        <h1 className="text-4xl font-bold mb-3">{data.title}</h1>

        <div className="text-gray-400 flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} /> {data.createdAt}
          </div>
          <button className="flex items-center gap-2 hover:text-white">
            <Share2 size={18} /> Share
          </button>
        </div>

        <p className="text-violet-300 italic mb-6">{data.summary}</p>

        
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl leading-relaxed"
        >
          <p className="text-gray-200 whitespace-pre-line">{data.content}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default InsightDetail;
