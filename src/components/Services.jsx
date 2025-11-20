import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Sparkles, Code, Rocket } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
      desc: "Beautiful, modern UI with smooth interactions and glass aesthetics.",
    },
    {
      title: "Full-Stack Development",
      icon: <Code className="w-8 h-8 text-violet-400" />,
      desc: "Robust MERN applications with clean architecture and best practices.",
    },
    {
      title: "Brand Strategy",
      icon: <Rocket className="w-8 h-8 text-violet-400" />,
      desc: "Creative brand presence with consistent UI, messaging, and visuals.",
    },
  ];

  return (
    <section id="services" >
      <div className="pt-20 pb-10 bg-[#0b0f19] text-white px-6 max-w-6xl mx-auto">
       
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl font-bold 
                   bg-gradient-to-r from-violet-400 to-cyan-400 
                   bg-clip-text text-transparent mb-16"
        >
          Our Services
        </motion.h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className=" bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(124,92,255,0.2)] h-full">
                <CardHeader className="flex flex-col items-center text-center">
                  {service.icon}
                  <CardTitle className="text-2xl mt-4 text-white font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">{service.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
