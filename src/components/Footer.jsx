import { motion } from "motion/react";
const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/10 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 text-center"
      >
      
        <h1
          className="text-lg font-bold tracking-widest bg-gradient-to-r 
                       from-cyan-400 to-violet-400 bg-clip-text text-transparent"
        >
          VISION INNOVATIONS
        </h1>

        
        <p className="text-gray-500 text-sm mt-2">
          Precision in Code. Vision in Design.
        </p>

      
        <div
          className="w-24 h-[1px] bg-gradient-to-r 
                        from-transparent via-cyan-400 to-transparent 
                        mx-auto my-5 opacity-50"
        ></div>

       
        <div className="flex justify-center gap-8 text-sm mb-6">
          <a
            className="text-gray-400 hover:text-cyan-400 transition"
            href="#about"
          >
            About
          </a>
          <a
            className="text-gray-400 hover:text-cyan-400 transition"
            href="#services"
          >
            Services
          </a>
          <a
            className="text-gray-400 hover:text-cyan-400 transition"
            href="#portfolio"
          >
            Portfolio
          </a>
          <a
            className="text-gray-400 hover:text-cyan-400 transition"
            href="#contact"
          >
            Contact
          </a>
        </div>

       
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Vision Innovations. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
};
export default Footer;
