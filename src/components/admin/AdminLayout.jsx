import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Inbox,
  FolderKanban,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { setAuthenticate, setToken, setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import getallcaseblog from "../hookes/getallcaseblog";
import getAllInsights from "../hookes/getallinsight";
import getallusers from "../hookes/getAllUsers";
import getallcontact from "../hookes/getallcontact";

const AdminLayout = () => {
  getallusers();
  getallcaseblog();
  getAllInsights();
  getallcontact();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setAuthenticate(false));
    dispatch(setUser(null));
    toast("Logout Sucessfully", {
      style: {
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff",
        fontWeight: 600,
      },
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#030712] text-white relative">
      
      <button
        onClick={() => setOpenSidebar(true)}
        className="absolute top-4 left-4 z-50 md:hidden p-2 bg-white/10 rounded-lg border border-white/20"
      >
        <Menu size={22} />
      </button>

     
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-xl 
          border-r border-white/20 p-6 z-40 transform transition-transform duration-300
          ${
            openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        
        <button
          onClick={() => setOpenSidebar(false)}
          className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <X size={22} />
        </button>

        <h1 className="text-2xl font-bold mb-8 mt-8 md:mt-0">
          Admin <span className="text-violet-400">Panel</span>
        </h1>

        <nav className="space-y-4">
          <Link
            to="/admin/dashboard"
            onClick={() => setOpenSidebar(false)}
            className="flex items-center gap-3 hover:text-violet-400"
          >
            <Home size={18} /> Dashboard
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setOpenSidebar(false)}
            className="flex items-center gap-3 hover:text-violet-400"
          >
            <Users size={18} /> Users
          </Link>

          <Link
            to="/admin/messages"
            onClick={() => setOpenSidebar(false)}
            className="flex items-center gap-3 hover:text-violet-400"
          >
            <Inbox size={18} /> Messages
          </Link>

          <Link
            to="/admin/cases"
            onClick={() => setOpenSidebar(false)}
            className="flex items-center gap-3 hover:text-violet-400"
          >
            <FolderKanban size={18} /> Case Studies
          </Link>

          <Link
            to="/admin/insights"
            onClick={() => setOpenSidebar(false)}
            className="flex items-center gap-3 hover:text-violet-400"
          >
            <FileText size={18} /> Insights
          </Link>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-3 hover:text-red-400 mt-10"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
