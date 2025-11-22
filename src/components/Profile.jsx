import React, { useState } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, ImagePlus, ArrowLeft } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "./utils/constant";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setUser } from "./redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, token } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false); // dialog control
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    image: null,
    preview: user?.image || "",
  });

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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const formdata = new FormData();
    formdata.append("username", form.username);
    formdata.append("email", form.email);
    if (form.password) formdata.append("password", form.password);
    if (form.image) formdata.append("image", form.image);

    try {
      const res = await axios.put(`${USER_API_END_POINT}/update`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Auth: token,
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(setUser(res?.data?.user));
        toast("Profile updated!", {
          style: {
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontWeight: 600,
          },
        });
        setOpen(false);
      }
    } catch (err) {
      toast("Update failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6"
        >
          <ArrowLeft /> Home
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold mb-10 text-center"
        >
          Welcome {user?.username.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl relative"
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="absolute top-4 right-4 text-gray-300 hover:text-white">
                <Pencil size={20} />
              </button>
            </DialogTrigger>

            <DialogContent className="bg-[#0f0f0f] border-white/20 text-white">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                <div className="text-center">
                  <img
                    src={form.preview}
                    alt="preview"
                    className="w-24 h-24 mx-auto rounded-full object-cover border border-white/20 mb-3"
                  />
                  <div className="flex items-center justify-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="bg-white/10 border-white/30 cursor-pointer"
                    />
                    <ImagePlus size={18} />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Username</label>
                  <Input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="bg-white/10 text-white border-white/20"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-white/10 text-white border-white/20"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300">
                    New Password (optional)
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-white/10 text-white border-white/20"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="text-center">
            <img
              src={
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="profile"
              className="w-32 h- mx-auto rounded-full object-cover border border-white/30 shadow-lg"
            />

            <p className="text-gray-300">{user?.email}</p>
            {user?.email == "admin@gmail.com" ? (
              <Link to={"/admin/dashboard"}>
                {" "}
                <Button className="bg-violet-600 mt-2">Admin DashBoard</Button>
              </Link>
            ) : (
              <></>
            )}

            <p className="mt-4 text-gray-500 text-sm">
              Member since: {new Date(user?.createdAt).toDateString()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
