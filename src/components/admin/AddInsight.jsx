import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { INSIGHT_API_END_POINT } from "../utils/constant.js";
import getallcaseblog from "../hookes/getallcaseblog.jsx";
import getAllInsights from "../hookes/getallinsight.jsx";
import { setLoading } from "../redux/authSlice";

const AddInsight = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    image: null,
  });
  const { loading, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.summary || !form.content) {
      return toast("All fields are required!");
    }
    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${INSIGHT_API_END_POINT}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log(loading);

      if (res?.data?.success) {
        toast("Insight added successfully!");
        setForm({
          title: "",
          summary: "",
          content: "",
          category:"",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
      toast("Failed to add insight");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="text-white max-w-3xl mx-auto">
      
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6"
      >
        Add New Insight / Blog
      </motion.h1>

     
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="text-gray-300 mb-1 block text-sm">Title</label>
            <Input
              type="text"
              name="title"
              placeholder="Insight Title"
              value={form.title}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          
          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              SEO Summary (1–2 lines)
            </label>
            <Textarea
              name="summary"
              placeholder="Short summary for SEO..."
              rows={3}
              value={form.summary}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              Full Article Content
            </label>
            <Textarea
              name="content"
              placeholder="Write full blog article..."
              rows={8}
              value={form.content}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>
          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              Choose Category
            </label>
            <Input
              type="text"
              name="category"
              placeholder="Meantion category Design or Business or AI"
              value={form.category}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          
          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              Cover Image
            </label>
            <div className="flex items-center gap-3">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="bg-white/20 border-white/30 text-white cursor-pointer"
              />
              <ImagePlus />
            </div>
          </div>

         
          {loading ? (
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2"
            >
              Add Insight
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddInsight;
