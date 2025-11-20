import React from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "motion/react";

/**
 * PublicLayout
 * - Glass navbar, simple footer
 * - Place public pages inside <Outlet />
 */

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white/6 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-extrabold tracking-wider">
                <span className="text-violet-400">VISION</span>
                <span className="text-gray-200">INNOVATIONS</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/case-studies" className="hover:text-white transition">
                Case Studies
              </Link>
              <Link to="/insights" className="hover:text-white transition">
                Insights
              </Link>
              <a
                href="#contact"
                className="btn-neon px-3 py-2 rounded-lg text-white font-semibold shadow-md"
              >
                Contact
              </a>
            </div>

            {/* mobile menu placeholder */}
            <div className="md:hidden">
              <button className="p-2 rounded-md">☰</button>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Vision Innovations — Built with
          React & Tailwind
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
