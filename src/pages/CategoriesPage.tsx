import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Filter, ChevronDown, ArrowRight, Grid3X3, List,
  Trophy, Palette, Users, Calendar, Globe, UtensilsCrossed,
  GraduationCap, Heart, Cpu, Church, Landmark, Building2,
  Sparkles, Zap, FlaskConical, Scale, Leaf, Handshake,
  Shield, Box, Map, Plane, School, TreePine, HandHeart,
  HeartPulse, Wheat, Flag, Briefcase
} from "lucide-react";
import { categories } from "@/data/categories";

const lucideIconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-6 h-6" />, Palette: <Palette className="w-6 h-6" />, Users: <Users className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />, Flag: <Flag className="w-6 h-6" />, UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />, Globe: <Globe className="w-6 h-6" />, Map: <Map className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />, Heart: <Heart className="w-6 h-6" />, HeartPulse: <HeartPulse className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />, HandHeart: <HandHeart className="w-6 h-6" />, TreePine: <TreePine className="w-6 h-6" />,
  School: <School className="w-6 h-6" />, Landmark: <Landmark className="w-6 h-6" />, Church: <Church className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />, Sparkles: <Sparkles className="w-6 h-6" />, Wheat: <Wheat className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />, Scale: <Scale className="w-6 h-6" />, Leaf: <Leaf className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />, Shield: <Shield className="w-6 h-6" />, Box: <Box className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />, Calendar: <Calendar className="w-6 h-6" />,
};

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"ranking" | "name" | "events">("ranking");

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortBy === "ranking") return a.kenyaRanking - b.kenyaRanking;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b.eventCount - a.eventCount;
  });

  const filteredCategories = sortedCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.subItems.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpand = (id: number) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#DAA520] text-xs font-semibold uppercase tracking-wider mb-6">
              <Grid3X3 className="w-4 h-4" /> Complete Coverage
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">27 Event</span><br /><span className="text-white">Categories</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-8">
              Every type of event imaginable, meticulously organized. From corporate conferences to traditional ceremonies, from tech hackathons to agricultural fairs—Ajenda covers it all.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[{ label: "27 Categories", color: "#DAA520" }, { label: "170+ Sub-types", color: "#00CED1" }, { label: "Kenya Ranked", color: "#C41E3A" }, { label: "Global Coverage", color: "#8B5CF6" }].map((pill) => (
                <span key={pill.label} className="px-4 py-2 rounded-full text-xs font-semibold border" style={{ borderColor: `${pill.color}30`, color: pill.color, backgroundColor: `${pill.color}08` }}>{pill.label}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-16 z-30 bg-[#050508]/90 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories or sub-types..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40 focus:bg-white/[0.03] transition-all" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/30" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "ranking" | "name" | "events")}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                <option value="ranking" className="bg-[#050508]">Kenya Ranking</option>
                <option value="name" className="bg-[#050508]">Alphabetical</option>
                <option value="events" className="bg-[#050508]">Event Count</option>
              </select>
            </div>
            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
              <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#DAA520]/20 text-[#DAA520]" : "text-white/40 hover:text-white"}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-lg transition-all ${viewMode === "list" ? "bg-[#DAA520]/20 text-[#DAA520]" : "text-white/40 hover:text-white"}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-sm text-white/30">Showing {filteredCategories.length} of {categories.length} categories</div>
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCategories.map((cat, i) => (
                <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} layout
                  className="group glass-panel rounded-2xl overflow-hidden hover:border-[#DAA520]/30 transition-all duration-300">
                  <div className="p-6 cursor-pointer" onClick={() => toggleExpand(cat.id)}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}20` }}>{lucideIconMap[cat.icon]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>#{cat.kenyaRanking}</span>
                          <span className="text-xs text-white/30">{cat.eventCount.toLocaleString()} events</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#DAA520] transition-colors mb-1">{cat.name}</h3>
                        <p className="text-sm text-white/40 line-clamp-2">{cat.description}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-white/30 shrink-0 mt-2 transition-transform ${expandedId === cat.id ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedId === cat.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-6 pb-6 pt-2 border-t border-white/5">
                          <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Sub-types ({cat.subItems.length})</h4>
                          <div className="flex flex-wrap gap-2">
                            {cat.subItems.map((sub) => (
                              <span key={sub} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/60 border border-white/5 hover:bg-[#DAA520]/10 hover:text-[#DAA520] hover:border-[#DAA520]/20 transition-all cursor-default">{sub}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {filteredCategories.map((cat, i) => (
                <motion.div key={cat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} layout className="glass-panel rounded-xl overflow-hidden">
                  <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => toggleExpand(cat.id)}>
                    <span className="text-lg font-bold text-white/15 w-8 text-center">{cat.kenyaRanking}</span>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{lucideIconMap[cat.icon]}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white">{cat.name}</h3>
                      <p className="text-xs text-white/40">{cat.subItems.length} sub-types &middot; {cat.eventCount.toLocaleString()} events</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 flex-wrap max-w-xs justify-end">
                      {cat.subItems.slice(0, 3).map((sub) => <span key={sub} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/40 truncate max-w-[120px]">{sub}</span>)}
                      {cat.subItems.length > 3 && <span className="text-[10px] text-white/30">+{cat.subItems.length - 3}</span>}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/30 shrink-0 transition-transform ${expandedId === cat.id ? "rotate-180" : ""}`} />
                  </div>
                  <AnimatePresence>
                    {expandedId === cat.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 pt-2 border-t border-white/5 ml-16">
                          <p className="text-sm text-white/50 mb-3">{cat.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {cat.subItems.map((sub) => <span key={sub} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/60 border border-white/5">{sub}</span>)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {filteredCategories.length === 0 && (
          <div className="text-center py-20"><Search className="w-12 h-12 text-white/10 mx-auto mb-4" /><p className="text-white/30">No categories match your search.</p></div>
        )}
      </section>

      {/* Full Sub-items Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">Complete Event Type Directory</h2>
          <p className="text-white/40 max-w-xl mx-auto">Every sub-type across all 27 categories. The most comprehensive event classification system available.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.1 }} className="group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{lucideIconMap[cat.icon]}</div>
                <h3 className="font-bold text-white group-hover:text-[#DAA520] transition-colors">{cat.kenyaRanking}. {cat.name}</h3>
              </div>
              <ul className="ml-11 space-y-1.5">
                {cat.subItems.map((sub, j) => (
                  <motion.li key={sub} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.03 }}
                    className="flex items-center gap-2 text-sm text-white/40">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: cat.color }} />{sub}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#DAA520]/5 to-[#00CED1]/5" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your <span className="text-gradient">Event?</span></h2>
            <p className="text-white/40 mb-8 max-w-lg mx-auto">Browse thousands of events across all 27 categories. Filter by location, date, price, and more.</p>
            <Link to="/events" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all">
              Browse Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
