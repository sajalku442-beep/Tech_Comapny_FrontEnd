import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

import axios from "axios";
import { USER_API_END_POINT } from "./utils/constant";
import {
  setAuthenticate,
  setLoading,
  setToken,
  setUser,
} from "./redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const navigate = useNavigate();

  const { loading, user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, image: e.target.files?.[0] });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("password", input.password);
    if (input.image) {
      formData.append("image", input.image);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        navigate("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-white">
              Register
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6 mt-4">
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Name</label>
                <Input
                  type="text"
                  placeholder="enter your name"
                  value={input.username}
                  name="username"
                  onChange={changeEventhandler}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-300 text-sm mb-1 block">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Enter your Email"
                  value={input.email}
                  name="email"
                  onChange={changeEventhandler}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>

              
              <div>
                <label className="text-gray-300 text-sm mb-1 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="passssword"
                  value={input.password}
                  name="password"
                  onChange={changeEventhandler}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-1 block">
                  Profile Photo
                </label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="bg-white/20 border-white/30 text-white cursor-pointer"
                />
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
                  Register
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
