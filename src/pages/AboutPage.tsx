import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe, Heart, Zap, Target, Eye, Rocket, ArrowRight,
  MapPin, Users, TrendingUp, Award, Sparkles
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2023", title: "Born in Kenya", desc: "Ajenda launched in Nairobi with a mission to digitize Kenya's cultural event landscape and connect communities through shared experiences.", icon: <MapPin className="w-5 h-5" /> },
  { year: "2024", title: "East African Expansion", desc: "Expanded to Uganda, Tanzania, Rwanda, and Ethiopia. Over 10,000 events listed and 50,000 active users across the region.", icon: <Globe className="w-5 h-5" /> },
  { year: "2025", title: "Global Launch", desc: "Launched in 120+ countries with AI-powered cultural recommendations. 27 event categories covering every type of human gathering.", icon: <Rocket className="w-5 h-5" /> },
  { year: "2026", title: "The Future", desc: "VR cultural experiences, real-time translation, and blockchain-verified cultural heritage documentation.", icon: <Sparkles className="w-5 h-5" /> },
];

const values = [
  { icon: <Globe className="w-8 h-8" />, title: "Cultural Connection", desc: "Building bridges between diverse communities through shared cultural experiences and authentic event discovery.", color: "#DAA520" },
  { icon: <Heart className="w-8 h-8" />, title: "Heritage Preservation", desc: "Documenting and preserving cultural traditions while making them accessible to global audiences for generations.", color: "#C41E3A" },
  { icon: <Users className="w-8 h-8" />, title: "Community First", desc: "Creating meaningful connections between event organizers, cultural enthusiasts, and curious explorers worldwide.", color: "#00CED1" },
  { icon: <Zap className="w-8 h-8" />, title: "Innovation", desc: "Pushing the boundaries of event technology with AI, VR, and immersive cultural experiences.", color: "#8B5CF6" },
  { icon: <Target className="w-8 h-8" />, title: "Authenticity", desc: "Ensuring every event listed represents genuine cultural expression, not commercialized tourism.", color: "#F97316" },
  { icon: <Award className="w-8 h-8" />, title: "Excellence", desc: "Setting the global standard for cultural event discovery and community engagement platforms.", color: "#10B981" },
];

const features = [
  { icon: <Zap className="w-6 h-6" />, title: "AI Cultural Intelligence", desc: "Machine learning algorithms that understand cultural context and recommend events based on your interests and heritage." },
  { icon: <Globe className="w-6 h-6" />, title: "Interactive 3D Globe", desc: "Explore events on a rotating 3D globe with real-time cultural density visualization and community boundaries." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Cultural Analytics", desc: "Advanced insights for event organizers to understand cultural impact, reach, and community engagement." },
  { icon: <Users className="w-6 h-6" />, title: "Community Platform", desc: "Connect with cultural experts, event organizers, and fellow enthusiasts through integrated social features." },
  { icon: <Sparkles className="w-6 h-6" />, title: "Immersive Previews", desc: "360-degree event previews, virtual venue tours, and cultural storytelling before you attend." },
  { icon: <Eye className="w-6 h-6" />, title: "Cultural Education", desc: "Learn the history, significance, and traditions behind every event through our educational content hub." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-fade-up").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DAA520]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00CED1]/5 rounded-full blur-[100px]" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#DAA520] text-xs font-semibold uppercase tracking-wider mb-6">
              <Eye className="w-4 h-4" /> Our Story
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Revolutionizing</span><br /><span className="text-white">Cultural Discovery</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
              Ajenda was born from a simple observation: while the world is more connected than ever, meaningful cultural exchange remains limited. We're here to change that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel rounded-3xl p-10 glow-border-gold">
              <Target className="w-10 h-10 text-[#DAA520] mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/50 leading-relaxed text-lg">
                To connect cultures, preserve traditions, and build global communities through authentic event experiences that transcend geographical, cultural, and social boundaries. We believe every ceremony, festival, and gathering tells a story worth sharing.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel rounded-3xl p-10 glow-border-cyan">
              <Eye className="w-10 h-10 text-[#00CED1] mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/50 leading-relaxed text-lg">
                A world where cultural understanding is the norm, not the exception. Where a student in Tokyo can experience a Maasai ceremony, where a chef in Paris can learn Kenyan coastal cuisine, and where every tradition finds its audience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#DAA520]/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-fade-up text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Our Journey</h2>
            <p className="text-white/40">From a Nairobi startup to a global cultural platform</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#DAA520]/40 via-[#00CED1]/40 to-[#DAA520]/40" />
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`relative flex items-start gap-8 mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050508] border-2 border-[#DAA520] flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-[#DAA520]" />
                </div>
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="glass-panel rounded-2xl p-6 hover:border-[#DAA520]/20 transition-all">
                    <span className="text-3xl font-bold text-gradient-gold">{m.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-2">{m.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-fade-up text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Core Values</h2>
            <p className="text-white/40 max-w-xl mx-auto">The principles that guide every decision we make</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }} className="glass-panel rounded-2xl p-8 group cursor-default">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${v.color}15`, color: v.color, border: `1px solid ${v.color}20` }}>{v.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DAA520] transition-colors">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative py-24 border-y border-white/5 bg-gradient-to-b from-transparent via-[#00CED1]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-fade-up text-center mb-16">
            <h2 className="text-4xl font-bold mb-4"><span className="text-white">Platform </span><span className="text-gradient-cyan">Features</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">Cutting-edge technology meets deep cultural understanding</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel rounded-2xl p-6 group">
                <div className="w-12 h-12 rounded-xl bg-[#00CED1]/10 border border-[#00CED1]/20 flex items-center justify-center text-[#00CED1] mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#DAA520]/5 via-[#00CED1]/5 to-[#DAA520]/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-12">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[{ value: "27", label: "Event Categories" }, { value: "170+", label: "Event Sub-types" }, { value: "120+", label: "Countries" }, { value: "2.5M+", label: "Community Members" }, { value: "50K+", label: "Active Events" }, { value: "15K+", label: "Communities Served" }, { value: "98%", label: "Satisfaction Rate" }, { value: "40+", label: "Kenyan Ethnic Groups" }].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-1">{stat.value}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="text-white">Join the </span><span className="text-gradient">Movement</span></h2>
            <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto">
              Whether you are an event organizer, cultural enthusiast, or curious explorer, Ajenda opens doors to experiences that transcend boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all">
                Explore Events <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/categories" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-panel rounded-xl text-white font-semibold hover:bg-white/10 transition-all">
                <Globe className="w-5 h-5 text-[#00CED1]" /> View All Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
