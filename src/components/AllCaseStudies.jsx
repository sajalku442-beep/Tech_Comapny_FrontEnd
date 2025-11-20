import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useGetallcaseblog from "./hookes/getallcaseblog";

const AllCaseStudies = () => {
  useGetallcaseblog();
  // const dummyCases = [
  //   {
  //     id: "1",
  //     tag: "AI / Healthcare",
  //     title: "AI-driven Diagnostic Dashboard",
  //     image:
  //       "https://images.unsplash.com/photo-1581091870627-3b6bdc5e4d83?w=400",
  //   },
  //   {
  //     id: "2",
  //     tag: "E-commerce",
  //     title: "Retail Conversion Optimization",
  //     image:
  //       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
  //   },
  //   {
  //     id: "3",
  //     tag: "Fintech",
  //     title: "Fraud Detection System",
  //     image: "https://images.unsplash.com/photo-1556742400-b5c7481537b2?w=400",
  //   },
  // ];
  const { allcaseblogs } = useSelector((store) => store.case);

  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("All");

  const filteredCases = allcaseblogs.filter((c) => {
    return (
      (filterTag === "All" || c.tag === filterTag) &&
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-16">
      <Link
        to="/"
        className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6"
      >
        <ArrowLeft /> Back to Home
      </Link>
      <div className="max-w-7xl mx-auto">
        {/* PAGE TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold mb-6"
        >
          Case Studies
        </motion.h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Input
            placeholder="Search case studies..."
            className="bg-white/10 border-white/20 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select onValueChange={setFilterTag} defaultValue="All">
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              {filterTag}
            </SelectTrigger>
            <SelectContent className="bg-[#1c1c1c] text-white">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Ecommerce">E-commerce</SelectItem>
              <SelectItem value="Fintech">Fintech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCases.map((item, i) => (
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

              <p className="text-sm text-violet-300">{item.tag}</p>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              <a
                href={`/case/${item._id}`}
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

export default AllCaseStudies;
