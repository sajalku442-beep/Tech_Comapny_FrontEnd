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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setUser(res?.data?.user));
        dispatch(setToken(res?.data?.token));
        dispatch(setAuthenticate(true));
        if (res?.data?.user?.email == "admin@gmail.com") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
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
              Admin Login
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 mt-4">
              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>

              {/* Button */}
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
                  Login
                </Button>
              )}
              <span className="flex w-full justify-center text-white/70">
                Use email-
                <div className="text-orange-400 mx-2">admin@gmail.com</div>{" "}
                password- <span className="text-orange-400 mx-2">admin</span>
              </span>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
