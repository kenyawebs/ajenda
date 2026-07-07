import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Heart, ArrowUp, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-[#DAA520]/10 bg-[#050508]/80 backdrop-blur-sm">
      <div className="h-px bg-gradient-to-r from-transparent via-[#DAA520]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DAA520] to-[#00CED1] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#050508]" />
              </div>
              <span className="text-2xl font-bold text-gradient">Ajenda</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Revolutionary global events platform connecting cultures through authentic experiences.
              From Kenya to the world.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#DAA520] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/events" className="text-white/50 hover:text-[#DAA520] transition-colors text-sm">Discover Events</Link></li>
              <li><Link to="/create-event" className="text-white/50 hover:text-[#DAA520] transition-colors text-sm">Create Event</Link></li>
              <li><Link to="/categories" className="text-white/50 hover:text-[#DAA520] transition-colors text-sm">Browse Categories</Link></li>
              <li><Link to="/organizers" className="text-white/50 hover:text-[#DAA520] transition-colors text-sm">For Organizers</Link></li>
              <li><Link to="/pricing" className="text-white/50 hover:text-[#DAA520] transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#DAA520] uppercase tracking-wider mb-4">Top Categories</h4>
            <ul className="space-y-3">
              {["Arts & Entertainment", "Sports Events", "Cultural Festivals", "Food & Drink", "Technology", "Community"].map((item) => (
                <li key={item}><Link to="/categories" className="text-white/50 hover:text-[#DAA520] transition-colors text-sm">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#DAA520] uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/50 text-sm"><MapPin className="w-4 h-4 text-[#DAA520]/60" /> Nairobi, Kenya</li>
              <li className="flex items-center gap-3 text-white/50 text-sm"><Mail className="w-4 h-4 text-[#DAA520]/60" /> hello@ajenda.africa</li>
              <li className="flex items-center gap-3 text-white/50 text-sm"><Phone className="w-4 h-4 text-[#DAA520]/60" /> +254 700 000 000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; 2025 Ajenda. All rights reserved. Built with <Heart className="w-3 h-3 inline text-[#C41E3A]" /> in Kenya.
          </p>
          <motion.button onClick={scrollToTop} whileHover={{ y: -3 }} className="w-10 h-10 rounded-lg bg-[#DAA520]/10 border border-[#DAA520]/20 flex items-center justify-center hover:bg-[#DAA520]/20 transition-colors">
            <ArrowUp className="w-4 h-4 text-[#DAA520]" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
