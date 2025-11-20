import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "sonner";
import { CONTACT_API_END_POINT } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./redux/authSlice";
import { Loader2 } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    projectDetails: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (!form.fullName || !form.email || !form.projectDetails) {
      return toast.error("All fields are required");
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${CONTACT_API_END_POINT}/submit`,
        {
          fullName: form.fullName,
          email: form.email,
          projectDetails: form.projectDetails,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Message sent successfully!");

        // Reset form
        setForm({
          fullName: "",
          email: "",
          projectDetails: "",
        });
      } else {
        toast.error(res.data.message || "Submission failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] px-6">
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold 
                   bg-gradient-to-r from-cyan-400 to-violet-400 
                   bg-clip-text text-transparent mb-6"
      >
        Start Your Vision
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-gray-400 max-w-xl mx-auto mb-10"
      >
        Tell us about your next project — and let’s build the future together.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto p-8 rounded-xl 
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 hover:scale-102 transition duration-300"
      >
      
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 
                       text-gray-200 focus:border-cyan-400 focus:ring-2 
                       focus:ring-cyan-400 outline-none transition shadow-inner"
            placeholder="Your Name"
          />
        </div>

       
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 
                       text-gray-200 focus:border-cyan-400 focus:ring-2 
                       focus:ring-cyan-400 outline-none transition shadow-inner"
            placeholder="you@company.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Details
          </label>
          <textarea
            rows="4"
            name="projectDetails"
            value={form.projectDetails}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 
                       text-gray-200 focus:border-cyan-400 focus:ring-2 
                       focus:ring-cyan-400 outline-none transition shadow-inner"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>

       
        {/* <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 text-lg font-bold rounded-lg text-white 
                     bg-gradient-to-r from-cyan-500 to-violet-500
                     hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all"
        >
          Send Inquiry
        </motion.button> */}
        {loading ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 text-lg font-bold rounded-lg text-white 
                     bg-gradient-to-r from-cyan-500 to-violet-500
                     hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 text-lg font-bold rounded-lg text-white 
                     bg-gradient-to-r from-cyan-500 to-violet-500
                     hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all"
          >
            Send Inquiry
          </motion.button>
        )}
      </motion.form>
    </section>
  );
};

export default Contact;
