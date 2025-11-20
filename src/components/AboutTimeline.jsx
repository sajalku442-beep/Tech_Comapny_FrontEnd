import { motion } from "motion/react";

const AboutTimeline=()=> {
  const timeline = [
    {
      year: "2023",
      title: "Foundation & Early Vision",
      desc: "Launched Vision Innovations with a mission to merge MERN development with high-end visual storytelling.",
      delay: 0,
    },
    {
      year: "2024",
      title: "Refining Our Glass Aesthetic",
      desc: "Introduced the next-gen neon-glass design system, delivering ultra-modern web experiences.",
      delay: 0.2,
    },
    {
      year: "Today",
      title: "Scaling, Innovating & Expanding",
      desc: "Developing global SaaS platforms, AI-powered dashboards, and cutting-edge product interfaces.",
      delay: 0.4,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold mb-16
                   bg-gradient-to-r from-cyan-400 to-violet-400 
                   bg-clip-text text-transparent"
      >
        Our Innovation Timeline
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: item.delay }}
            className="flex flex-col md:flex-row mb-16 items-start relative"
          >
            {/* Year Label */}
            <div className="md:w-1/4 text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)] mb-4 md:mb-0">
              {item.year}
            </div>

            {/* Content Box */}
            <div
              className="
              md:w-3/4 p-6 rounded-xl 
              bg-white/10 backdrop-blur-xl 
              border border-white/20 
              shadow-[0_0_20px_rgba(139,92,246,0.25)]
              relative hover:scale-102 transition duration-300
            "
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>

              {/* Neon Dot (Desktop Only) */}
              <div
                className="
                hidden md:block 
                absolute -left-2 top-8 
                w-4 h-4 rounded-full 
                bg-violet-400 
                shadow-[0_0_8px_rgba(139,92,246,0.8)]
                border-2 border-[#0a0a0a]
              "
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default AboutTimeline;
