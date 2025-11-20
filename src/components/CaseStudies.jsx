import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import axios from "axios";

import { Link, NavLink } from "react-router-dom";
import { CASEBLOG_API_END_POINT } from "./utils/constant";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const CaseStudies = () => {
  const { allcaseblogs } = useSelector((store) => store.case);

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6">
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold mb-16
                   bg-gradient-to-r from-violet-400 to-cyan-400
                   bg-clip-text text-transparent"
      >
        <Link to={"/cases"}>Case Studies: Our Impact</Link>
      </motion.h2>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {allcaseblogs?.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="p-8 rounded-xl 
                       bg-white/10 backdrop-blur-xl 
                       border border-white/20 
                       shadow-[0_0_30px_rgba(139,92,246,0.25)]  
                       hover:scale-102 transition duration-300"
          >
           
            <p className="text-sm font-medium text-cyan-400 mb-2">{item.tag}</p>

           
            <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>

          
            <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
              {item.content}
            </p>

            <Link
              to={`/case/${item._id}`}
              className="inline-flex items-center text-cyan-400 hover:underline font-semibold"
            >
              View Full Study
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
