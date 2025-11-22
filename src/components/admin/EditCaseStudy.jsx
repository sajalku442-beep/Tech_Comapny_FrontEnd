import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { CASEBLOG_API_END_POINT } from "../utils/constant.js";
import { useSelector } from "react-redux";

const EditCaseStudy = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tag: "",
    title: "",
    content: "",
    image: null,
    preview: "",
  });

  const loadCaseStudy = async () => {
    try {
      const res = await axios.get(`${CASEBLOG_API_END_POINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        const data = res.data.blog;
        setForm({
          tag: data.tag,
          title: data.title,
          content: data.content,
          image: null,
          preview: data.image,
        });
      }
    } catch (error) {
      console.log(error);
      toast("Failed to load case study");
    }
  };

  useEffect(() => {
    loadCaseStudy();
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
    console.log(form);

    const formdata = new FormData();
    formdata.append("tag", form.tag);
    formdata.append("title", form.title);
    formdata.append("content", form.content);

    if (form.image) {
      formdata.append("image", form.image);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${CASEBLOG_API_END_POINT}/update/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast("Case Study updated successfully", {
          style: {
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontWeight: 600,
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast("Update failed");
    } finally {
      setLoading(false);
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
        Edit Case Study
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-300 mb-1 block text-sm">Tag</label>
            <Input
              type="text"
              name="tag"
              value={form.tag}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

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
              Case Study Image
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

          {loading ? (
            <>
              {" "}
              <Button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-green-700 text-white font-semibold py-2"
            >
              Update Insight
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default EditCaseStudy;
