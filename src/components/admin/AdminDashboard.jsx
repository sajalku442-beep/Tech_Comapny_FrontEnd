import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, FolderKanban, FileText, Inbox, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// API Endpoints
import {
  USER_API_END_POINT,
  CASEBLOG_API_END_POINT,
  INSIGHT_API_END_POINT,
  CONTACT_API_END_POINT,
} from "../utils/constant";
import { setAuthenticate, setUser } from "../redux/authSlice";
import getallcaseblog from "../hookes/getallcaseblog";
import getAllInsights from "../hookes/getallinsight";
import getallusers from "../hookes/getAllUsers";
import getallcontact from "../hookes/getallcontact";
import useGetallusers from "../hookes/getAllUsers";
import useGetallcaseblog from "../hookes/getallcaseblog";
import useGetAllInsights from "../hookes/getallinsight";
import useGetallcontact from "../hookes/getallcontact";

const AdminDashboard = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   getallusers(dispatch);
  //   getallcaseblog(dispatch);
  //   getAllInsights(dispatch);
  //   getallcontact(dispatch);
  // }, [dispatch]);
  useGetallusers();
  useGetallcaseblog();
  useGetAllInsights();
  useGetallcontact();

  const [user, setUser] = useState([]);
  const { token } = useSelector((store) => store.auth);
  const { allUsers } = useSelector((store) => store.user);
  const { allcaseblogs } = useSelector((store) => store.case);
  const { allinsights } = useSelector((store) => store.insight);
  const { allContacts } = useSelector((store) => store.contact);
  // console.log(allUsers);

  // const userfetch = async () => {
  //   try {
  //     const res = await axios.get(`${USER_API_END_POINT}/all`, {
  //       headers: { Auth: token },
  //       withCredentials: true,
  //     });
  //     if (res?.data?.success) {
  //       setUser(res?.data?.users);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   userfetch();
  // }, []);

  // const [stats, setStats] = useState({
  //   users: 0,
  //   cases: 0,
  //   insights: 0,
  //   messages: 0,
  // });
  // setStats({
  //   users: allUsers?.data?.users?.length || 0,
  //   cases: allcaseblogs?.data?.blogs?.length || 0,
  //   insights: allinsights?.data?.insights?.length || 0,
  //   messages: allContacts?.data?.contacts?.length || 0,
  // });

  // Fetch dashboard stats
  // const loadStats = async () => {
  //   try {
  //     const [usersRes, caseRes, insightRes, messageRes] = await Promise.all([
  //       axios.get(`${USER_API_END_POINT}/all`, {
  //         headers: { Auth: token },
  //         withCredentials: true,
  //       }),

  //       axios.get(`${CASEBLOG_API_END_POINT}/get`, {
  //         withCredentials: true,
  //       }),

  //       axios.get(`${INSIGHT_API_END_POINT}/get`, {
  //         withCredentials: true,
  //       }),

  //       axios.get(`${CONTACT_API_END_POINT}/all`, {
  //         withCredentials: true,
  //       }),
  //     ]);

  //     setStats({
  //       users: usersRes?.data?.users?.length || 0,
  //       cases: caseRes?.data?.blogs?.length || 0,
  //       insights: insightRes?.data?.insights?.length || 0,
  //       messages: messageRes?.data?.contacts?.length || 0,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to load dashboard stats");
  //   }
  // };

  return (
    <div className="text-white">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Users */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Users</h2>
            <Users className="text-violet-400" />
          </div>
          <p className="text-3xl font-bold mt-3">{allUsers?.length || 0}</p>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Case Studies</h2>
            <FolderKanban className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold mt-3">{allcaseblogs?.length || 0}</p>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Insights</h2>
            <FileText className="text-green-400" />
          </div>
          <p className="text-3xl font-bold mt-3">{allinsights?.length || 0}</p>
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Inbox className="text-red-400" />
          </div>
          <p className="text-3xl font-bold mt-3">{allContacts?.length || 0}</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link to="/admin/cases/add">
            <button className="flex items-center gap-2 px-5 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl">
              <PlusCircle size={18} /> Add Case Study
            </button>
          </Link>

          <Link to="/admin/insights/add">
            <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl">
              <PlusCircle size={18} /> Add Insight
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
