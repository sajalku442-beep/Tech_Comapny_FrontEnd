import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { LogOut, Menu, User2, X } from "lucide-react"; // modern icons
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import store from "./redux/store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setAuthenticate, setToken, setUser } from "./redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const navLinks = [
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("hero");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
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
  };

  // Smooth scroll logic
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = document.querySelector("nav").offsetHeight || 60;

    window.scrollTo({
      top: el.offsetTop - navHeight,
      behavior: "smooth",
    });

    setActive(id);
    setOpen(false); // close mobile menu
  };

  // Highlight section on scroll
  useEffect(() => {
    const sections = ["hero", "about", "services", "portfolio", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 
                 bg-white/10 backdrop-blur-xl border-b border-white/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="cursor-pointer  text-xl font-semibold text-white">
          Vision Innovations
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`cursor-pointer transition ${
                active === link.id
                  ? "text-cyan-400 font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="hidden md:block">
          {!user ? (
            <Link to={"/login"}>
              <Button className="cursor-pointer bg-violet text-white hover:bg-violet/80">
                Admin Login
              </Button>
            </Link>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer hover:scale-105 transition">
                    <AvatarImage src={user?.image} alt={user?.username} />
                    <AvatarFallback className="bg-violet-600 text-white">
                      {user?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent
                  className="w-72 p-4 rounded-xl
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 shadow-xl
                   text-white"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <Avatar className="ring-2 ring-violet-500 rounded-full">
                        <AvatarImage src={user?.image} alt={user?.username} />
                        <AvatarFallback className="bg-violet-600 text-white">
                          {user?.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="text-lg font-semibold">
                          Welcome,{" "}
                          <span className="text-violet-400">
                            {user?.username?.toUpperCase()}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-300">{user?.email}</p>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-3 pt-2">
                      {/* <Link to="/profile">
                        <button
                          className="flex items-center gap-2 w-full 
                text-gray-200 hover:text-white 
                hover:bg-white/10 p-2 rounded-md transition"
                        >
                          <User2 className="h-4 w-4 text-violet-400" />
                          View Profile
                        </button>
                      </Link> */}

                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-2 w-full
                text-gray-200 hover:text-white 
                hover:bg-red-500/20 p-2 rounded-md transition"
                      >
                        <LogOut className="h-4 w-4 text-red-400" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU (Animated Glass Dropdown) */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="md:hidden overflow-hidden 
                   bg-white/10 backdrop-blur-xl border-t border-white/20"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-left py-2 text-lg ${
                active === link.id
                  ? "text-cyan-400 font-medium"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div>
            {!user ? (
              <Link to={"/login"}>
                <Button className="cursor-pointer mx-auto bg-violet text-white hover:bg-violet/80">
                  Admin Login
                </Button>
              </Link>
            ) : (
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer hover:scale-105 transition">
                      <AvatarImage src={user?.image} alt={user?.username} />
                      <AvatarFallback className="bg-violet-600 text-white">
                        {user?.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-72 p-4 rounded-xl
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 shadow-xl
                   text-white"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-2 ring-violet-500 rounded-full">
                          <AvatarImage src={user?.image} alt={user?.username} />
                          <AvatarFallback className="bg-violet-600 text-white">
                            {user?.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="text-lg font-semibold">
                            Welcome,{" "}
                            <span className="text-violet-400">
                              {user?.username?.toUpperCase()}
                            </span>
                          </h4>
                          <p className="text-sm text-gray-300">{user?.email}</p>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="flex flex-col gap-3 pt-2">
                        {/* <Link to="/profile">
                          <button
                            className="flex items-center gap-2 w-full 
                text-gray-200 hover:text-white 
                hover:bg-white/10 p-2 rounded-md transition"
                          >
                            <User2 className="h-4 w-4 text-violet-400" />
                            View Profile
                          </button>
                        </Link> */}

                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-2 w-full
                text-gray-200 hover:text-white 
                hover:bg-red-500/20 p-2 rounded-md transition"
                        >
                          <LogOut className="h-4 w-4 text-red-400" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
