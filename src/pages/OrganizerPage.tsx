import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, BarChart3, Globe, Megaphone, Calendar, Check, ArrowRight,
  Sparkles, Zap, Shield, Heart, TrendingUp, Eye, Star
} from "lucide-react";

const benefits = [
  { icon: <Globe className="w-6 h-6" />, title: "Global Reach", desc: "List your event once and reach audiences across 120+ countries. Our AI matches your event with culturally-curious attendees worldwide." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Smart Analytics", desc: "Track registrations, engagement, demographics, and cultural impact in real-time. Understand who's attending and why." },
  { icon: <Megaphone className="w-6 h-6" />, title: "Auto-Promotion", desc: "We auto-share your event across social channels, community groups, and culturally-relevant networks to maximize visibility." },
  { icon: <Zap className="w-6 h-6" />, title: "AI Assistant", desc: "Our cultural AI helps you craft descriptions, suggests cultural elements to highlight, and recommends optimal pricing." },
  { icon: <Shield className="w-6 h-6" />, title: "Secure Payments", desc: "Integrated payment processing with multi-currency support, automatic conversion, and instant settlement to your account." },
  { icon: <Heart className="w-6 h-6" />, title: "Cultural Impact", desc: "Document and preserve your cultural heritage while building a global audience that values authentic experiences." },
];

const testimonials = [
  { name: "Aisha Mohammed", role: "Lamu Cultural Festival Organizer", quote: "Ajenda helped us share our Swahili heritage with visitors from 15 countries. The cultural integration features made our festival feel authentic, not commercialized.", rating: 5 },
  { name: "James Kuria", role: "Nairobi Jazz Festival", quote: "The analytics dashboard showed us exactly who was interested in our event. We sold out 3 weeks early for the first time ever.", rating: 5 },
  { name: "Ekal Lolem", role: "Turkana Cultural Leader", quote: "Our traditional ceremonies are now documented for future generations. Young people in our community see the value of our culture through global interest.", rating: 5 },
];

const features = [
  "Unlimited event listings",
  "Cultural AI assistant",
  "Multi-currency pricing",
  "Social media auto-share",
  "Attendee analytics",
  "Email & SMS notifications",
  "Mobile-optimized pages",
  "QR code check-in",
  "Community forums",
  "Heritage documentation tools",
];

export default function OrganizerPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#DAA520] text-xs font-semibold uppercase tracking-wider mb-6">
              <Users className="w-4 h-4" /> For Event Organizers
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Share Your </span>
              <span className="text-gradient">Culture</span>
              <br />
              <span className="text-white/60">With the World</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-8">
              Whether you're organizing a traditional ceremony, a corporate conference, or a community festival —
              Ajenda gives you the tools to reach the right audience and create unforgettable cultural experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create-event" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all">
                <Calendar className="w-5 h-5" /> Create Your First Event
              </Link>
              <a href="#benefits" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-panel rounded-xl text-white font-semibold hover:bg-white/10 transition-all">Learn More</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ value: "50K+", label: "Events Hosted" }, { value: "2.5M", label: "Attendees Reached" }, { value: "98%", label: "Organizer Satisfaction" }, { value: "120+", label: "Countries Covered" }].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Why Organizers Choose Ajenda</h2>
            <p className="text-white/40 max-w-xl mx-auto">Everything you need to plan, promote, and preserve culturally-rich events.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }} className="glass-panel rounded-2xl p-8 group">
                <div className="w-12 h-12 rounded-xl bg-[#DAA520]/10 border border-[#DAA520]/20 flex items-center justify-center text-[#DAA520] mb-5 group-hover:scale-110 transition-transform">{b.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DAA520] transition-colors">{b.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-transparent via-[#DAA520]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Get Started in Minutes</h2>
            <p className="text-white/40 max-w-xl mx-auto">From signup to your first attendee — it's simpler than you think.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your organizer account with email, phone, or social login. No lengthy forms.", icon: <Users className="w-5 h-5" /> },
              { step: "2", title: "Create Event", desc: "Fill in event details, add cultural elements, upload media, and set pricing with our guided form.", icon: <Calendar className="w-5 h-5" /> },
              { step: "3", title: "AI Enhancement", desc: "Our AI suggests improvements, auto-promotes to relevant communities, and optimizes your event page.", icon: <Sparkles className="w-5 h-5" /> },
              { step: "4", title: "Go Live", desc: "Publish and watch your event reach a global audience of cultural enthusiasts and community members.", icon: <TrendingUp className="w-5 h-5" /> },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#DAA520]/15 to-[#00CED1]/15 border border-[#DAA520]/20 flex items-center justify-center text-[#DAA520] mb-5">{item.icon}</div>
                <div className="text-4xl font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Organizer Stories</h2>
            <p className="text-white/40 max-w-xl mx-auto">Hear from event creators who've transformed their reach with Ajenda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-[#DAA520] fill-[#DAA520]" />)}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gradient">Everything</span>{" "}
                <span className="text-white">You Need</span>
              </h2>
              <p className="text-white/40 mb-8">All features are included — no hidden fees, no surprises. Focus on creating amazing events, we'll handle the rest.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-white/50">
                    <Check className="w-4 h-4 text-[#00CED1] shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-10 text-center glow-border-gold">
              <Eye className="w-12 h-12 text-[#DAA520] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Ready to get started?</h3>
              <p className="text-white/40 mb-8">Join thousands of organizers sharing culture with the world.</p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                  <button type="submit" className="w-full px-6 py-3.5 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all flex items-center justify-center gap-2">
                    Start as Organizer <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#DAA520]/20 flex items-center justify-center mb-3"><Check className="w-6 h-6 text-[#DAA520]" /></div>
                  <p className="text-white font-semibold">Welcome to Ajenda!</p>
                  <p className="text-white/40 text-sm mt-1">Check your email to complete setup.</p>
                  <Link to="/create-event" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] text-sm font-bold rounded-lg">Create Event Now</Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
