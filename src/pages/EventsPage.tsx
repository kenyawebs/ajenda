import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, Tag, Filter,
  ArrowRight, Heart, ChevronDown
} from "lucide-react";
import { categories, kenyanCulturalEvents } from "@/data/categories";

const locations = ["All", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Lamu", "Lodwar", "Malindi", "Narok"];
const dateFilters = ["All Time", "Today", "This Week", "This Month", "This Year"];

const allEvents = [
  ...kenyanCulturalEvents,
  { name: "Nairobi Tech Week", location: "Nairobi", date: "March 2025", category: "Technology Events", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800" },
  { name: "Kisumu Fish Festival", location: "Kisumu", date: "February 2025", category: "Food and Drink Events", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" },
  { name: "Kenya Fashion Week", location: "Nairobi", date: "April 2025", category: "Arts and Entertainment", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800" },
  { name: "Agricultural Expo Nakuru", location: "Nakuru", date: "May 2025", category: "Agricultural Events", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" },
  { name: "Youth Innovation Summit", location: "Nairobi", date: "June 2025", category: "Youth and Student Events", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800" },
  { name: "Coastal Cleanup Drive", location: "Mombasa", date: "March 2025", category: "Environmental Events", image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800" },
  { name: "Interfaith Dialogue Forum", location: "Nairobi", date: "February 2025", category: "Religious Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" },
  { name: "Mashujaa Day Celebrations", location: "Nationwide", date: "October 20, 2025", category: "Public Holidays & National Celebrations", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" },
  { name: "Madaraka Day Events", location: "Nationwide", date: "June 1, 2025", category: "Public Holidays & National Celebrations", image: "https://images.unsplash.com/photo-1461896836934-bdffe1f1d1c8?w=800" },
  { name: "Charity Run for Education", location: "Nairobi", date: "March 2025", category: "Charity and Philanthropy Events", image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800" },
  { name: "Human Rights Conference", location: "Nairobi", date: "April 2025", category: "Civic and Social Justice Events", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800" },
  { name: "Science Fair Kenya", location: "Nairobi", date: "August 2025", category: "Science and Innovation Events", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800" },
  { name: "NGO Forum East Africa", location: "Nairobi", date: "May 2025", category: "NGO and Civil Society Events", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800" },
  { name: "Senior Citizen Wellness Day", location: "Mombasa", date: "March 2025", category: "Veteran and Senior Citizen Events", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800" },
  { name: "National Development Conference", location: "Nairobi", date: "July 2025", category: "Government Functions and Events", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800" },
  { name: "Craft Workshop Series", location: "Kisumu", date: "February 2025", category: "Lifestyle and Hobbies", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800" },
  { name: "Climate Change Summit", location: "Nairobi", date: "September 2025", category: "Food Security and Sustainability", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" },
  { name: "Mombasa Beach Festival", location: "Mombasa", date: "December 2025", category: "Tourism Events", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All Time");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchSearch = !search || event.name.toLowerCase().includes(search.toLowerCase()) || event.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || event.category === selectedCategory;
      const matchLoc = selectedLocation === "All" || event.location === selectedLocation;
      return matchSearch && matchCat && matchLoc;
    });
  }, [search, selectedCategory, selectedLocation]);

  const uniqueCategories = ["All", ...new Set(allEvents.map((e) => e.category))];

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="relative py-16">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4"><span className="text-gradient">Discover</span>{" "}<span className="text-white">Events</span></h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto">Find cultural experiences, festivals, conferences, and celebrations across Kenya and beyond.</p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-[#050508]/90 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, categories, locations..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40 focus:bg-white/[0.03] transition-all text-lg" />
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 glass-panel rounded-lg text-sm text-white/60 hover:text-white transition-colors">
                <Filter className="w-4 h-4" /> Filters <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
              <span className="text-sm text-white/30">{filteredEvents.length} events found</span>
            </div>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
                <div><label className="text-xs text-white/40 mb-2 block">Category</label>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                    {uniqueCategories.map((c) => <option key={c} value={c} className="bg-[#050508]">{c}</option>)}
                  </select></div>
                <div><label className="text-xs text-white/40 mb-2 block">Location</label>
                  <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                    {locations.map((l) => <option key={l} value={l} className="bg-[#050508]">{l}</option>)}
                  </select></div>
                <div><label className="text-xs text-white/40 mb-2 block">Date</label>
                  <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                    {dateFilters.map((d) => <option key={d} value={d} className="bg-[#050508]">{d}</option>)}
                  </select></div>
              </motion.div>
            )}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {uniqueCategories.slice(0, 8).map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? "bg-[#DAA520]/20 text-[#DAA520] border border-[#DAA520]/30" : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10"}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, i) => (
              <motion.div key={event.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }} className="group glass-panel rounded-2xl overflow-hidden cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050508]/80 backdrop-blur text-xs font-medium text-[#00CED1] border border-[#00CED1]/20">{event.category}</div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#050508]/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-white/60" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#DAA520] transition-colors">{event.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-white/40">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-white/30 flex items-center gap-1"><Users className="w-3 h-3" /> 200+ attending</span>
                    <button className="flex items-center gap-1 text-xs text-[#DAA520] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Details <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20"><Search className="w-16 h-16 text-white/10 mx-auto mb-4" /><h3 className="text-xl font-semibold text-white/30 mb-2">No events found</h3><p className="text-white/20">Try adjusting your search or filters</p></div>
        )}
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <h2 className="text-2xl font-bold text-gradient mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 12).map((cat, i) => (
            <motion.button key={cat.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedCategory(cat.name)} className="glass-panel rounded-xl p-4 text-center hover:border-[#DAA520]/30 transition-all group">
              <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors line-clamp-2">{cat.name}</span>
              <span className="text-[10px] text-white/20">{cat.eventCount}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
