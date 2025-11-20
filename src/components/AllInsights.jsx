import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetAllInsights from "./hookes/getallinsight";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AllInsights = () => {
  useGetAllInsights();
  // const dummyInsights = [
  //   {
  //     id: "1",
  //     title: "Future of AI in Healthcare",
  //     summary: "Short SEO-friendly summary for Google ranking...",
  //     category: "AI",
  //     image:
  //       "https://images.unsplash.com/photo-1581091870627-3b6bdc5e4d83?w=400",
  //   },
  //   {
  //     id: "2",
  //     title: "UI/UX Design Trends for 2025",
  //     summary: "Minimalism, neural UI, and micro-interactions are rising...",
  //     category: "Design",
  //     image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
  //   },
  // ];
  const { allinsights } = useSelector((store) => store.insight);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filteredInsights = allinsights.filter((item) => {
    return (
      (filterCat === "All" || item.category === filterCat) &&
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6"
        >
          <ArrowLeft /> Back to Home
        </Link>
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold mb-6"
        >
          Insights & Articles
        </motion.h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Input
            placeholder="Search insights..."
            className="bg-white/10 border-white/20 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select onValueChange={setFilterCat} defaultValue="All">
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              {filterCat}
            </SelectTrigger>
            <SelectContent className="bg-[#1c1c1c] text-white">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredInsights.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{item.summary}</p>

              <a
                href={`/insight/${item._id}`}
                className="text-violet-400 hover:text-violet-300"
              >
                View Details →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllInsights;
