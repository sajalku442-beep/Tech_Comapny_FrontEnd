import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";


const Hero = () => {
  return (
    <div>
      <section className="pt-40 pb-10 text-center overflow-hidden bg-[#030712] text-gray-200 px-6">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight"
        >
          <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(14,165,233,0.6)]">
            Precision
          </span>{" "}
          in Code,
          <br />
          <span className="text-[#3febb7] drop-shadow-[0_0_10px_rgba(14,165,233,0.6)]">
            Vision
          </span>{" "}
          in Design.
        </motion.h1>

        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto"
        >
          We architect next-gen digital presence with strategic growth,
          immersive UI, and cutting-edge engineering.
        </motion.p>

        
      </section>
    </div>
  );
};
export default Hero;
