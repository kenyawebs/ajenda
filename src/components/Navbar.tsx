import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Globe } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/categories", label: "Categories" },
  { path: "/events", label: "Events" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050508]/90 backdrop-blur-xl border-b border-[#DAA520]/10 shadow-lg shadow-[#DAA520]/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#DAA520] to-[#00CED1] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 rounded-lg border border-[#DAA520]/30 group-hover:border-[#DAA520]/60 transition-colors" />
              <Calendar className="w-5 h-5 text-[#DAA520] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient tracking-tight">Ajenda</span>
              <span className="text-[10px] text-white/40 -mt-1 tracking-widest uppercase hidden sm:block">Cultural Events</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  location.pathname === link.path ? "text-[#DAA520]" : "text-white/70 hover:text-white"
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[#DAA520]/10 border border-[#DAA520]/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/create-event"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-[#DAA520]/20 transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              Create Event
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/70 hover:text-white">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050508]/95 backdrop-blur-xl border-t border-[#DAA520]/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-[#DAA520]/10 text-[#DAA520] border border-[#DAA520]/20"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/create-event"
                className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-semibold text-sm rounded-lg"
              >
                <Globe className="w-4 h-4" />
                Create Event
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
