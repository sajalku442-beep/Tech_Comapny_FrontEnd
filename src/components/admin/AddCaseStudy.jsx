import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { CASEBLOG_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setLoading } from "../redux/authSlice";
import { setCaseblog } from "../redux/caseSlice";
import { toast } from "sonner";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddCaseStudy = () => {
  const [form, setForm] = useState({
    tag: "",
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const cat = ["All", "AI", "Business", "Fintech", "Ecomerce", "Others"];
  const { loading, token } = useSelector((store) => store.auth);

  const { caseblog } = useSelector((store) => store.case);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files?.[0] });
  };
  const valueChanger = (value) => {
    setForm({ ...form, category: value });
  };
  // console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Case Study Submitted:", form);
    const formData = new FormData();
    formData.append("tag", form.tag);
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${CASEBLOG_API_END_POINT}/post`,
        formData,
        {
          headers: {
            Auth: token,
            "Content-Type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setCaseblog(res?.data?.blog));
        // navigate("/login");
      }
      console.log(res?.data);
      toast(res?.data?.message, {
        style: {
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          fontWeight: 600,
        },
      });
      setForm({
        tag: "",
        title: "",
        content: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message, {
        style: {
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          fontWeight: 600,
        },
      });
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
        className="text-3xl font-bold mb-6 text-center"
      >
        Add New Case Study
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
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
              placeholder="Example: AI / Healthcare"
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
              placeholder="Case Study Title"
              value={form.title}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          <div>
            <label className="text-gray-300 mb-1 block text-sm">
              Description
            </label>
            <Textarea
              name="content"
              placeholder="Write about the case study..."
              rows={6}
              value={form.content}
              onChange={handleChange}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-between">
            <div>
              <Select value={form.category} onValueChange={valueChanger}>
                <SelectTrigger className="" type="button">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1b1d29] text-white">
                  <SelectGroup>
                    {cat?.map((data) => {
                      return (
                        <SelectItem key={data} value={data}>
                          {data}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
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
              Add Case Study
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddCaseStudy;
