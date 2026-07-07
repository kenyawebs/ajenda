import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Tag, Image, Upload, Link as LinkIcon,
  Plus, X, Globe, Mail, Phone, Sparkles, Check,
  DollarSign, Users, FileText, Star, ArrowRight, Loader2
} from "lucide-react";
import { categories } from "@/data/categories";

const currencies = [
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 1 },
  { code: "USD", name: "US Dollar", symbol: "$", rate: 0.0077 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.0071 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.0060 },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", rate: 28.5 },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", rate: 20.2 },
  { code: "RWF", name: "Rwandan Franc", symbol: "RF", rate: 10.1 },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", rate: 0.42 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 11.8 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 0.14 },
];

const culturalElements = [
  "Traditional Music & Dance", "Storytelling Sessions", "Traditional Cuisine",
  "Cultural Fashion Show", "Art & Craft Exhibition", "Language Workshops",
  "Heritage Tours", "Elders' Blessing Ceremony", "Community Feasting",
  "Traditional Games", "Folklore Performances", "Beadwork & Jewelry",
];

const feeTypes = [
  { id: "entrance", label: "Entrance / Admission Fee", icon: <Tag className="w-4 h-4" /> },
  { id: "food", label: "Food & Refreshments", icon: <Star className="w-4 h-4" /> },
  { id: "conference", label: "Conference / Workshop Fee", icon: <FileText className="w-4 h-4" /> },
  { id: "accommodation", label: "Accommodation / Boarding", icon: <MapPin className="w-4 h-4" /> },
  { id: "transport", label: "Transport / Logistics", icon: <Globe className="w-4 h-4" /> },
  { id: "expedition", label: "Excursions / Expeditions", icon: <Sparkles className="w-4 h-4" /> },
  { id: "vip", label: "VIP / Premium Experience", icon: <Users className="w-4 h-4" /> },
];

export default function CreateEventPage() {
  const [step, setStep] = useState<"auth" | "details" | "media" | "pricing" | "preview">("auth");
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | "social">("email");
  const [currency, setCurrency] = useState(currencies[0]);
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [fees, setFees] = useState<Array<{ id: string; type: string; amount: string; note: string }>>([]);
  const [selectedCultural, setSelectedCultural] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([""]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "", category: "", subcategory: "", date: "", time: "", endTime: "",
    location: "", venue: "", description: "", directions: "", capacity: "",
    organizerName: "", organizerEmail: "", organizerPhone: "", website: "",
  });

  const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const addFee = () => setFees([...fees, { id: Date.now().toString(), type: "", amount: "", note: "" }]);
  const removeFee = (id: string) => setFees(fees.filter((f) => f.id !== id));
  const updateFee = (id: string, field: string, value: string) =>
    setFees(fees.map((f) => (f.id === id ? { ...f, [field]: value } : f)));

  const toggleCultural = (item: string) =>
    setSelectedCultural((prev) => prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]);

  const addActivity = () => setActivities([...activities, ""]);
  const updateActivity = (i: number, val: string) => { const next = [...activities]; next[i] = val; setActivities(next); };
  const removeActivity = (i: number) => setActivities(activities.filter((_, idx) => idx !== i));

  const handleImportUrl = () => {
    if (!importUrl.trim()) return;
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      updateForm("title", "Imported: " + (importUrl.split("/").pop()?.replace(/-/g, " ") || "New Event"));
      updateForm("description", "Auto-populated from shared link. Review and complete the details below.");
      setTimeout(() => setImportSuccess(false), 3000);
    }, 2000);
  };

  const handlePublish = () => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 5000); };

  const selectedCategory = categories.find((c) => c.name === form.category);

  const steps = [
    { key: "auth" as const, label: "Account", icon: <Users className="w-4 h-4" /> },
    { key: "details" as const, label: "Details", icon: <FileText className="w-4 h-4" /> },
    { key: "media" as const, label: "Media & Culture", icon: <Image className="w-4 h-4" /> },
    { key: "pricing" as const, label: "Pricing", icon: <DollarSign className="w-4 h-4" /> },
    { key: "preview" as const, label: "Preview", icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-12">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">Create</span>{" "}<span className="text-white">Your Event</span>
            </h1>
            <p className="text-white/40 max-w-xl">Share your cultural experience with the world. Simple, seamless, and culturally enriched.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2">
          {steps.map((s) => (
            <button key={s.key} onClick={() => { if (steps.findIndex(x => x.key === step) > steps.findIndex(x => x.key === s.key)) setStep(s.key); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                step === s.key ? "bg-[#DAA520]/20 text-[#DAA520] border border-[#DAA520]/30" :
                steps.findIndex(x => x.key === step) > steps.findIndex(x => x.key === s.key) ? "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10" :
                "bg-white/[0.02] text-white/20 border border-white/5"
              }`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {step === "auth" && (
            <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-bold text-white mb-6">Get Started</h2>
                <div className="flex gap-2 mb-8">
                  {(["signup", "login"] as const).map((m) => (
                    <button key={m} onClick={() => setAuthMode(m)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${authMode === m ? "bg-[#DAA520]/20 text-[#DAA520] border border-[#DAA520]/30" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"}`}>
                      {m === "signup" ? "Create Account" : "Sign In"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {[
                    { label: "Google", icon: "G", color: "#EA4335" },
                    { label: "Facebook", icon: "f", color: "#1877F2" },
                    { label: "X / Twitter", icon: "X", color: "#1DA1F2" },
                    { label: "WhatsApp", icon: "W", color: "#25D366" },
                  ].map((social) => (
                    <button key={social.label} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <span className="text-sm font-bold" style={{ color: social.color }}>{social.icon}</span>
                      <span className="text-xs text-white/60">{social.label}</span>
                    </button>
                  ))}
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                  <div className="relative flex justify-center"><span className="px-4 bg-[#0a0a14] text-xs text-white/30">or continue with</span></div>
                </div>

                <div className="flex gap-2 mb-6">
                  {(["email", "phone"] as const).map((m) => (
                    <button key={m} onClick={() => setAuthMethod(m)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${authMethod === m ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}>
                      {m === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                      {m === "email" ? "Email" : "Phone"}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {authMethod === "email" ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                        <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                      </div>
                      <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                      <input type="password" placeholder="Password (min 6 characters)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                    </>
                  ) : (
                    <>
                      <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                      <div className="flex gap-2">
                        <select className="px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                          <option className="bg-[#050508]">+254</option>
                          <option className="bg-[#050508]">+255</option>
                          <option className="bg-[#050508]">+256</option>
                          <option className="bg-[#050508]">+250</option>
                          <option className="bg-[#050508]">+251</option>
                          <option className="bg-[#050508]">+234</option>
                          <option className="bg-[#050508]">+27</option>
                          <option className="bg-[#050508]">+1</option>
                          <option className="bg-[#050508]">+44</option>
                        </select>
                        <input type="tel" placeholder="7XX XXX XXX" className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                      </div>
                    </>
                  )}
                </div>

                <button onClick={() => setStep("details")} className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all flex items-center justify-center gap-2">
                  {authMode === "signup" ? "Create Account & Continue" : "Sign In & Continue"} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-white/30 mt-4">By continuing, you agree to Ajenda's Terms and Privacy Policy</p>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass-panel rounded-2xl p-6 mb-6 border border-[#00CED1]/20">
                <div className="flex items-center gap-2 mb-3">
                  <LinkIcon className="w-5 h-5 text-[#00CED1]" />
                  <h3 className="text-sm font-semibold text-[#00CED1]">Auto-Import from URL</h3>
                </div>
                <p className="text-xs text-white/40 mb-3">Paste a link to your existing event page, social media post, or website — we'll auto-fill the details.</p>
                <div className="flex gap-2">
                  <input type="url" value={importUrl} onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://example.com/my-event or https://facebook.com/events/..."
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00CED1]/40" />
                  <button onClick={handleImportUrl} disabled={isImporting || !importUrl.trim()}
                    className="px-4 py-2.5 bg-[#00CED1]/15 border border-[#00CED1]/30 rounded-xl text-[#00CED1] text-sm font-medium hover:bg-[#00CED1]/25 transition-all disabled:opacity-30 flex items-center gap-2">
                    {isImporting ? <><Loader2 className="w-4 h-4 animate-spin" /> Importing...</> : importSuccess ? <><Check className="w-4 h-4" /> Done</> : <>Import</>}
                  </button>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#DAA520]" /> Event Details
                </h2>
                <div className="space-y-5">
                  <input type="text" value={form.title} onChange={(e) => updateForm("title", e.target.value)} placeholder="Event title *" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select value={form.category} onChange={(e) => updateForm("category", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                      <option value="" className="bg-[#050508]">Select Category *</option>
                      {categories.map((c) => <option key={c.id} value={c.name} className="bg-[#050508]">{c.name}</option>)}
                    </select>
                    <select value={form.subcategory} onChange={(e) => updateForm("subcategory", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                      <option value="" className="bg-[#050508]">Select Sub-type</option>
                      {selectedCategory?.subItems.map((s) => <option key={s} value={s} className="bg-[#050508]">{s}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40" />
                    <input type="time" value={form.time} onChange={(e) => updateForm("time", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40" />
                    <input type="time" value={form.endTime} onChange={(e) => updateForm("endTime", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#DAA520]/40" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={form.location} onChange={(e) => updateForm("location", e.target.value)} placeholder="City / Town *" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                    <input type="text" value={form.venue} onChange={(e) => updateForm("venue", e.target.value)} placeholder="Venue name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                  </div>
                  <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="Describe your event — what's special about it? Include cultural significance, what attendees will experience... *" rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40 resize-none" />
                  <textarea value={form.directions} onChange={(e) => updateForm("directions", e.target.value)} placeholder="Directions — how to get there (landmarks, nearest bus stage, GPS pin, etc.)" rows={2} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40 resize-none" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="number" value={form.capacity} onChange={(e) => updateForm("capacity", e.target.value)} placeholder="Expected capacity" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                    <input type="url" value={form.website} onChange={(e) => updateForm("website", e.target.value)} placeholder="Event website (optional)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-[#DAA520]" /> Organizer Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" value={form.organizerName} onChange={(e) => updateForm("organizerName", e.target.value)} placeholder="Organizer / Group Name *" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                  <input type="email" value={form.organizerEmail} onChange={(e) => updateForm("organizerEmail", e.target.value)} placeholder="Contact Email *" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                  <input type="tel" value={form.organizerPhone} onChange={(e) => updateForm("organizerPhone", e.target.value)} placeholder="Contact Phone" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep("auth")} className="px-6 py-3 glass-panel rounded-xl text-white/60 hover:text-white transition-colors">Back</button>
                <button onClick={() => setStep("media")} className="px-8 py-3 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-lg hover:shadow-[#DAA520]/20 transition-all flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "media" && (
            <motion.div key="media" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Image className="w-5 h-5 text-[#DAA520]" /> Photos & Media</h2>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-[#DAA520]/30 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/40 mb-2">Drag & drop images, videos, or documents here</p>
                  <p className="text-xs text-white/20">or click to browse — JPG, PNG, MP4, PDF up to 50MB</p>
                  <button className="mt-4 px-5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50 hover:bg-white/10 transition-colors">Select Files</button>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 mb-6 glow-border-gold">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#DAA520]" /> Cultural Integration</h2>
                <p className="text-sm text-white/40 mb-6">Select traditional and cultural elements that will be part of this event.</p>
                <div className="flex flex-wrap gap-2">
                  {culturalElements.map((item) => (
                    <button key={item} onClick={() => toggleCultural(item)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${selectedCultural.includes(item) ? "bg-[#DAA520]/20 text-[#DAA520] border border-[#DAA520]/40" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"}`}>
                      {selectedCultural.includes(item) && <Check className="w-3 h-3 inline mr-1" />}{item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Plus className="w-5 h-5 text-[#00CED1]" /> Activities, Treats & Excursions</h2>
                <p className="text-sm text-white/40 mb-6">Add secondary and tertiary activities that make your event unforgettable.</p>
                <div className="space-y-3">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={act} onChange={(e) => updateActivity(i, e.target.value)}
                        placeholder={`Activity ${i + 1} — e.g., "Sunset dhow cruise along the coast"`}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00CED1]/40" />
                      {activities.length > 1 && <button onClick={() => removeActivity(i)} className="px-3 py-3 text-white/30 hover:text-[#C41E3A] transition-colors"><X className="w-5 h-5" /></button>}
                    </div>
                  ))}
                  <button onClick={addActivity} className="flex items-center gap-2 px-4 py-2 text-sm text-[#00CED1] hover:text-[#DAA520] transition-colors"><Plus className="w-4 h-4" /> Add Another Activity</button>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep("details")} className="px-6 py-3 glass-panel rounded-xl text-white/60 hover:text-white transition-colors">Back</button>
                <button onClick={() => setStep("pricing")} className="px-8 py-3 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-lg hover:shadow-[#DAA520]/20 transition-all flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "pricing" && (
            <motion.div key="pricing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass-panel rounded-2xl p-8 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-[#DAA520]" /> Pricing & Fees</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Currency:</span>
                    <select value={currency.code} onChange={(e) => setCurrency(currencies.find((c) => c.code === e.target.value) || currencies[0])}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#DAA520]/40">
                      {currencies.map((c) => <option key={c.code} value={c.code} className="bg-[#050508]">{c.code} — {c.name}</option>)}
                    </select>
                  </div>
                </div>
                <p className="text-sm text-white/40 mb-6">Set fees for different aspects of your event. Leave blank for free items. Current rate: 1 KES = {currency.rate.toFixed(4)} {currency.code}</p>
                <div className="space-y-4">
                  {fees.map((fee) => (
                    <div key={fee.id} className="glass-panel-light rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <select value={fee.type} onChange={(e) => updateFee(fee.id, "type", e.target.value)} className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#DAA520]/40 sm:w-48">
                        <option value="" className="bg-[#050508]">Select fee type</option>
                        {feeTypes.map((ft) => <option key={ft.id} value={ft.id} className="bg-[#050508]">{ft.label}</option>)}
                      </select>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-white/40">{currency.symbol}</span>
                        <input type="number" value={fee.amount} onChange={(e) => updateFee(fee.id, "amount", e.target.value)} placeholder="0.00" className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                      </div>
                      <input type="text" value={fee.note} onChange={(e) => updateFee(fee.id, "note", e.target.value)} placeholder="Note (e.g., 'Early bird', 'Per person')" className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                      <button onClick={() => removeFee(fee.id)} className="text-white/20 hover:text-[#C41E3A] transition-colors"><X className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
                <button onClick={addFee} className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-[#00CED1] hover:text-[#DAA520] transition-colors"><Plus className="w-4 h-4" /> Add Fee Entry</button>
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                  <input type="checkbox" id="freeEvent" className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#DAA520] focus:ring-[#DAA520]/30" />
                  <label htmlFor="freeEvent" className="text-sm text-white/60">This is a free community event — all activities included at no charge</label>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Quick Templates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Community Event", desc: "Free entrance, donations welcome", icon: <Users className="w-5 h-5" /> },
                    { name: "Standard Ticket", desc: "Single entrance fee", icon: <Tag className="w-5 h-5" /> },
                    { name: "Premium Experience", desc: "VIP with all-inclusive package", icon: <Star className="w-5 h-5" /> },
                  ].map((template) => (
                    <button key={template.name} onClick={() => {
                      if (template.name === "Community Event") setFees([{ id: Date.now().toString(), type: "entrance", amount: "0", note: "Free community event" }]);
                      else if (template.name === "Standard Ticket") setFees([{ id: Date.now().toString(), type: "entrance", amount: "500", note: "Standard entry" }, { id: (Date.now() + 1).toString(), type: "food", amount: "300", note: "Meal package optional" }]);
                      else setFees([{ id: Date.now().toString(), type: "entrance", amount: "5000", note: "VIP all-access" }, { id: (Date.now() + 1).toString(), type: "food", amount: "included", note: "Gourmet catering" }, { id: (Date.now() + 2).toString(), type: "expedition", amount: "included", note: "Guided tour included" }]);
                    }} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#DAA520]/30 hover:bg-[#DAA520]/5 transition-all text-left">
                      <div className="text-[#DAA520] mb-2">{template.icon}</div>
                      <p className="text-sm font-semibold text-white">{template.name}</p>
                      <p className="text-xs text-white/40">{template.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep("media")} className="px-6 py-3 glass-panel rounded-xl text-white/60 hover:text-white transition-colors">Back</button>
                <button onClick={() => setStep("preview")} className="px-8 py-3 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-lg hover:shadow-[#DAA520]/20 transition-all flex items-center gap-2">Preview <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass-panel rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-bold text-white mb-6">Preview Your Event</h2>
                <div className="rounded-xl overflow-hidden mb-6">
                  <div className="h-48 bg-gradient-to-br from-[#DAA520]/20 to-[#00CED1]/20 flex items-center justify-center"><Image className="w-12 h-12 text-white/20" /></div>
                  <div className="p-6 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#DAA520]/15 text-[#DAA520] text-xs font-medium">{form.category || "Category"}</span>
                      {selectedCultural.length > 0 && <span className="px-3 py-1 rounded-full bg-[#00CED1]/15 text-[#00CED1] text-xs font-medium">{selectedCultural.length} Cultural Elements</span>}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{form.title || "Your Event Title"}</h3>
                    <p className="text-white/40 text-sm mb-4">{form.description || "Event description will appear here..."}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/40">
                      {form.date && <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-[#DAA520]" /> {form.date} {form.time && `at ${form.time}`}</span>}
                      {form.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#DAA520]" /> {form.location}{form.venue ? `, ${form.venue}` : ""}</span>}
                      {form.capacity && <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#DAA520]" /> Capacity: {form.capacity}</span>}
                    </div>
                  </div>
                </div>
                {selectedCultural.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#DAA520] mb-2">Cultural Experience</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCultural.map((c) => <span key={c} className="px-3 py-1 rounded-lg bg-[#DAA520]/10 text-[#DAA520] text-xs border border-[#DAA520]/20">{c}</span>)}
                    </div>
                  </div>
                )}
                {activities.some((a) => a.trim()) && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#00CED1] mb-2">Activities & Experiences</h4>
                    <ul className="space-y-1">
                      {activities.filter((a) => a.trim()).map((a, i) => <li key={i} className="text-sm text-white/40 flex items-center gap-2"><Sparkles className="w-3 h-3 text-[#00CED1]" /> {a}</li>)}
                    </ul>
                  </div>
                )}
                {fees.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/60 mb-2">Pricing ({currency.code})</h4>
                    <div className="space-y-2">
                      {fees.map((fee) => {
                        const ft = feeTypes.find((f) => f.id === fee.type);
                        return (
                          <div key={fee.id} className="flex items-center justify-between py-2 border-b border-white/5">
                            <span className="text-sm text-white/50">{ft?.label || fee.type}</span>
                            <span className="text-sm font-semibold text-[#DAA520]">{fee.amount === "0" || fee.amount === "included" ? "Included" : `${currency.symbol}${fee.amount}`}{fee.note && <span className="text-xs text-white/30 ml-2">({fee.note})</span>}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs text-white/30">Organized by</p>
                  <p className="text-sm text-white/60">{form.organizerName || "Your Organization"}</p>
                  <p className="text-xs text-white/30">{form.organizerEmail}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep("pricing")} className="px-6 py-3 glass-panel rounded-xl text-white/60 hover:text-white transition-colors">Back</button>
                <button onClick={handlePublish} className="px-8 py-3 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] font-bold rounded-xl hover:shadow-xl hover:shadow-[#DAA520]/20 transition-all flex items-center gap-2"><Globe className="w-5 h-5" /> Publish Event</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] glass-panel rounded-2xl p-6 text-center border border-[#DAA520]/30 glow-gold max-w-md">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#DAA520]/20 flex items-center justify-center mb-3"><Check className="w-6 h-6 text-[#DAA520]" /></div>
              <h3 className="text-lg font-bold text-white mb-1">Event Published!</h3>
              <p className="text-sm text-white/50 mb-4">Your event is now live on Ajenda. Share it with your community!</p>
              <div className="flex gap-2 justify-center">
                <Link to="/events" className="px-4 py-2 bg-gradient-to-r from-[#DAA520] to-[#B87333] text-[#050508] text-sm font-bold rounded-lg">View Events</Link>
                <button onClick={() => setShowSuccess(false)} className="px-4 py-2 glass-panel text-white text-sm rounded-lg">Create Another</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
