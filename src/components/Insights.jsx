import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import axios from "axios";

import { Link } from "react-router-dom";
import { INSIGHT_API_END_POINT } from "./utils/constant";
import { useSelector } from "react-redux";

const Insights = () => {
  const { allinsights } = useSelector((store) => store.insight);

  return (
    <section id="insights" className="py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-white mb-14"
      >
        <Link to={"/insights"}>Insights & Thought Leadership</Link>
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {allinsights.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.15 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition cursor-pointer hover:scale-105 duration-300">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                
                <p className="text-gray-300 mb-4">{item.summary}</p>

               
                <Link
                  to={`/insight/${item._id}`}
                  className="flex items-center text-violet-400 font-semibold hover:text-violet-300"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Insights;
