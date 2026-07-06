import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  ArrowRight, TrendingUp, Users, Globe, Calendar, Zap, Sparkles, ChevronRight,
  Trophy, Palette, UtensilsCrossed, Heart, Cpu, Church, GraduationCap
} from "lucide-react";
import { categories, kenyanCulturalEvents } from "@/data/categories";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!meshRef.current) return;
    const anim = gsap.to(meshRef.current.rotation, { y: Math.PI * 2, duration: 60, repeat: -1, ease: "none" });
    return () => { anim.kill(); };
  }, []);
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#0a0a18" wireframe emissive="#DAA520" emissiveIntensity={0.15} />
    </mesh>
  );
}

function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    const anim = gsap.to(ref.current.rotation, { z: Math.PI * 2, duration: speed, repeat: -1, ease: "none" });
    return () => { anim.kill(); };
  }, [speed]);
  return (
    <mesh ref={ref} rotation={[0, 0, tilt]}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshBasicMaterial color="#00CED1" transparent opacity={0.3} />
    </mesh>
  );
}

function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el, start: "top 85%",
      onEnter: () => {
        gsap.to({ val: 0 }, { val: target, duration: 2.5, ease: "power2.out",
          onUpdate: function () { setCount(Math.floor(this.targets()[0].val)); },
        });
      }, once: true,
    });
    return () => trigger.kill();
  }, [target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient-gold">{count.toLocaleString()}{suffix}</div>
      <div className="text-white/50 text-sm mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-6 h-6" />, Palette: <Palette className="w-6 h-6" />, Users: <Users className="w-6 h-6" />,
  Briefcase: <Calendar className="w-6 h-6" />, Flag: <Globe className="w-6 h-6" />, UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" />,
  Plane: <Globe className="w-6 h-6" />, Globe: <Globe className="w-6 h-6" />, Map: <Globe className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />, Heart: <Heart className="w-6 h-6" />, HeartPulse: <Heart className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />, HandHeart: <Heart className="w-6 h-6" />, TreePine: <Sparkles className="w-6 h-6" />,
  School: <GraduationCap className="w-6 h-6" />, Landmark: <Globe className="w-6 h-6" />, Church: <Church className="w-6 h-6" />,
  Building2: <Globe className="w-6 h-6" />, Sparkles: <Sparkles className="w-6 h-6" />, Wheat: <Sparkles className="w-6 h-6" />,
  FlaskConical: <Zap className="w-6 h-6" />, Scale: <Globe className="w-6 h-6" />, Leaf: <Sparkles className="w-6 h-6" />,
  Handshake: <Users className="w-6 h-6" />, Shield: <Globe className="w-6 h-6" />, Box: <Calendar className="w-6 h-6" />,
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  const topCategories = categories.slice(0, 6);

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#DAA520" />
            <AnimatedGlobe />
            <OrbitRing radius={3.2} speed={20} tilt={0.3} />
            <OrbitRing radius={3.8} speed={35} tilt={-0.5} />
            <OrbitRing radius={4.4} speed={50} tilt={0.8} />
          </Canvas>
        </motion.div>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00CED1] animate-pulse" />
              <span className="text-sm text-[#00CED1] font-medium">27 Event Categories &middot; 120+ Countries</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
              <span className="text-white">Discover</span><br />
              <span className="text-gradient">Cultural Events</span><br />
              <span className="text-white/80">Beyond</span>{" "}<span className="text-[#00CED1]">Boundaries</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              From the Lamu Cultural Festival to global tech summits, Ajenda connects you with authentic experiences across all 27 event categories. Born in Kenya, built for the world.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link to="/events" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all duration-300">
                Explore Events <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/categories" className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-panel text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-[#DAA520]" /> All 27 Categories
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent" />
      </section>

      {/* Stats */}
      <section className="relative py-20 border-y border-[#DAA520]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <StatCounter target={27} label="Event Categories" />
            <StatCounter target={50000} suffix="+" label="Active Events" />
            <StatCounter target={120} suffix="+" label="Countries" />
            <StatCounter target={2500000} suffix="+" label="Community Members" />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-reveal text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-[#00CED1] text-xs font-semibold uppercase tracking-wider mb-4">Explore</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-white">Every Type of </span><span className="text-gradient">Event Imaginable</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto">From ancient cultural ceremonies to cutting-edge tech conferences, Ajenda covers the full spectrum of human gathering.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }} whileHover={{ y: -8, scale: 1.02 }}
                className="group relative glass-panel rounded-2xl p-6 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}15, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{iconMap[cat.icon]}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DAA520] transition-colors">{cat.name}</h3>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">{cat.subItems.length} sub-types</span>
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#DAA520] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/categories" className="inline-flex items-center gap-2 px-6 py-3 glass-panel rounded-xl text-[#DAA520] font-semibold hover:bg-[#DAA520]/10 transition-all">
              View All 27 Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Kenyan Events */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#DAA520]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-reveal flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-[#DAA520] text-xs font-semibold uppercase tracking-wider mb-4">Kenya Spotlight</span>
              <h2 className="text-4xl md:text-5xl font-bold"><span className="text-gradient">Cultural Events</span><br /><span className="text-white/60 text-3xl md:text-4xl">Across Kenya</span></h2>
            </div>
            <Link to="/events" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#00CED1] hover:text-[#DAA520] transition-colors font-medium">View All Events <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kenyanCulturalEvents.slice(0, 6).map((event, i) => (
              <motion.div key={event.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="group relative rounded-2xl overflow-hidden glass-panel cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#050508]/80 backdrop-blur text-xs font-medium text-[#DAA520] border border-[#DAA520]/20">{event.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#DAA520] transition-colors">{event.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-reveal text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-white">How </span><span className="text-gradient">Ajenda Works</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">Three simple steps to discover events that connect you with culture and community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#DAA520]/30 via-[#00CED1]/30 to-[#DAA520]/30" />
            {[{ step: "01", title: "Discover", desc: "Browse 27 event categories and find cultural experiences that resonate with your interests.", icon: <Globe className="w-6 h-6" />, color: "#DAA520" },
              { step: "02", title: "Connect", desc: "Join events, meet like-minded people, and immerse yourself in authentic cultural experiences.", icon: <Users className="w-6 h-6" />, color: "#00CED1" },
              { step: "03", title: "Celebrate", desc: "Create lasting memories and help preserve cultural traditions for future generations.", icon: <Sparkles className="w-6 h-6" />, color: "#DAA520" },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.2 }} className="relative text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>{item.icon}</div>
                <div className="text-5xl font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenya Ranking */}
      <section className="relative py-24 border-y border-[#DAA520]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-reveal text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-[#DAA520] text-xs font-semibold uppercase tracking-wider mb-4">Kenya Priority Index</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-gradient">Ranked for Kenya</span><br /><span className="text-white/60 text-3xl md:text-4xl">Relevant to the World</span></h2>
          </div>
          <div className="space-y-3 max-w-4xl mx-auto">
            {categories.slice(0, 10).map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }} className="flex items-center gap-4 glass-panel rounded-xl px-5 py-3 group hover:bg-white/[0.03] transition-colors">
                <span className="text-lg font-bold text-white/20 w-8">{cat.kenyaRanking}</span>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{iconMap[cat.icon]}</div>
                <div className="flex-1 min-w-0"><h4 className="text-sm font-semibold text-white group-hover:text-[#DAA520] transition-colors truncate">{cat.name}</h4></div>
                <div className="hidden sm:block w-32 h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(28 - cat.kenyaRanking) * 4}%` }} viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 1 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})` }} />
                </div>
                <span className="text-xs text-white/30 shrink-0">{cat.eventCount.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#DAA520]/5 via-[#00CED1]/5 to-[#DAA520]/5" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Zap className="w-12 h-12 text-[#DAA520] mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6"><span className="text-white">Ready to </span><span className="text-gradient">Explore?</span></h2>
            <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto">Join thousands of cultural explorers discovering events that matter. From Kenya's vibrant festivals to global conferences.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all">
                <TrendingUp className="w-5 h-5" /> Start Exploring
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-panel rounded-xl text-white font-semibold hover:bg-white/10 transition-all">Learn Our Story</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
