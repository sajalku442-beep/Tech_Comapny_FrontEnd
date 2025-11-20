import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { INSIGHT_API_END_POINT } from "../utils/constant.js";
import { useSelector } from "react-redux";

const EditInsight = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: null,
    preview: "",
  });

  
  const loadInsight = async () => {
    try {
      const res = await axios.get(`${INSIGHT_API_END_POINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        const data = res.data.insight;

        setForm({
          title: data.title,
          summary: data.summary,
          content: data.content,
          image: null,
          preview: data.image,
        });
      }
    } catch (error) {
      console.log(error);
      toast("Failed to load Insight");
    }
  };

  useEffect(() => {
    loadInsight();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    setForm({
      ...form,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("summary", form.summary);
    formData.append("content", form.content);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await axios.put(
        `${INSIGHT_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast("Insight Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast("Update Failed");
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
        Edit Insight
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
              value={form.title}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>


          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              Short SEO Summary (150–300 characters)
            </label>
            <Textarea
              name="summary"
              rows={3}
              maxLength={300}
              value={form.summary}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

         
          <div>
            <label className="text-gray-300 mb-1 block text-sm">Content</label>
            <Textarea
              name="content"
              rows={8}
              value={form.content}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          
          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              Insight Banner Image
            </label>

            <img
              src={form.preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-xl border border-white/20 mb-3"
            />

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

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
          >
            Update Insight
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditInsight;
