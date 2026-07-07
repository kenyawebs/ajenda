import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const culturalResponses: Record<string, string> = {
  "default": "Hello! I'm Ajenda's Cultural AI Assistant. I can help you discover cultural events, understand traditions, and find experiences that connect you with Kenya's rich heritage and global cultures. What would you like to explore?",
  "lamu": "The Lamu Cultural Festival is one of Kenya's most treasured celebrations! Held annually on Lamu Island, it features traditional dhow races, donkey races, Swahili poetry (migengo), henna painting, and vibrant coastal cuisine. The festival preserves Swahili culture dating back over 700 years. It typically takes place in November.",
  "safari rally": "The Safari Rally Kenya is part of the FIA World Rally Championship! Known as one of the toughest rallies in the world, it traverses Kenya's dramatic landscapes from Naivasha to Eldoret. The event combines motorsport excellence with Kenya's wild beauty and typically runs in March.",
  "jamhuri": "Jamhuri Day on December 12th celebrates Kenya becoming a republic in 1964. It's marked by military parades, cultural dances, presidential addresses, and community celebrations across all 47 counties. The name 'Jamhuri' means 'Republic' in Swahili.",
  "categories": "Ajenda covers all 27 event categories! The top 5 in Kenya are: 1) Arts & Entertainment, 2) Sports Events, 3) Social Events, 4) Corporate Events, and 5) Public Holidays. Each category has multiple sub-types — from traditional ceremonies to tech hackathons.",
  "create event": "To create an event on Ajenda, click the 'Create Event' button in the navigation bar or visit /create-event. You'll need to sign up (email, phone, or social login), then fill in your event details including title, date, location, category, cultural elements, pricing, and media.",
  "pricing": "Ajenda offers flexible pricing! Free tier for community events, Pro at KES 2,500/month for organizers with advanced features, and Enterprise for large-scale events. We support multiple currencies with real-time conversion rates.",
  "culture": "Kenya has over 40 ethnic groups, each with unique traditions! The Maasai are known for their jumping dance (adumu) and beadwork, the Luo for their music (benga) and boat culture, the Kikuyu for their rich agricultural heritage, and the Swahili people of the coast for their 700-year trading history and architecture.",
  "food": "Kenyan cuisine is incredibly diverse! Try nyama choma (grilled meat), ugali (maize staple), sukuma wiki (collard greens), pilau (spiced rice), and coastal dishes like biryani and viazi karai. Food events on Ajenda include the Nairobi Restaurant Week and various county agricultural shows.",
  "music": "Kenya's music scene is vibrant! From traditional benga (Luo), taarab (coast), and mugithi (Kikuyu) to contemporary gengetone, afro-pop, and gospel. Major music events include the Nairobi Jazz Festival, Koroga Festival, and Blankets & Wine.",
  "help": "I can help you with: discovering cultural events, understanding Kenyan traditions, finding event categories, creating events, pricing information, and connecting with the community. Just ask me anything!",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(culturalResponses)) {
    if (key === "default") continue;
    if (lower.includes(key)) return response;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return culturalResponses.default;
  if (lower.includes("thank")) return "You're very welcome! I'm here to help you discover the rich cultural tapestry of Kenya and beyond. Feel free to ask about any events, traditions, or how to use Ajenda!";
  return `That's a fascinating question about "${input}"! While I'm still learning about that specific topic, I can tell you that Ajenda covers 27 event categories including cultural festivals, traditional ceremonies, sports, music, food events, and more. Would you like me to suggest some related cultural experiences in Kenya, or help you find events in a specific category?`;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: culturalResponses.default, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(userMsg.content);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const quickQuestions = [
    "What is Lamu Festival?",
    "How do I create an event?",
    "Tell me about Kenyan culture",
    "What are the pricing options?",
  ];

  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-white/10 border border-white/20" : "bg-gradient-to-r from-[#DAA520] to-[#B87333] border border-[#DAA520]/40"
        }`}>
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-[#050508]" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[100] w-[380px] max-w-[calc(100vw-48px)] h-[520px] glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/50">
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#DAA520] to-[#00CED1] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#050508]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ajenda AI</h3>
                <p className="text-[10px] text-white/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CED1] animate-pulse" /> Cultural Intelligence Assistant
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-[#DAA520] to-[#00CED1]" : "bg-white/10"}`}>
                    {msg.role === "assistant" ? <Bot className="w-4 h-4 text-[#050508]" /> : <User className="w-4 h-4 text-white/60" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "assistant" ? "bg-white/5 text-white/80 rounded-tl-sm" : "bg-[#DAA520]/15 text-white/90 rounded-tr-sm border border-[#DAA520]/20"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#DAA520] to-[#00CED1] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#050508]" />
                  </div>
                  <div className="bg-white/5 px-3 py-2 rounded-xl rounded-tl-sm flex items-center gap-1">
                    <Loader2 className="w-3 h-3 text-[#DAA520] animate-spin" />
                    <span className="text-xs text-white/40">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button key={q} onClick={() => setInput(q)} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 hover:bg-[#DAA520]/10 hover:text-[#DAA520] hover:border-[#DAA520]/20 transition-all">{q}</button>
                ))}
              </div>
            )}

            <div className="px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about culture, events..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#DAA520]/40" />
                <button onClick={handleSend} disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#DAA520] to-[#B87333] flex items-center justify-center disabled:opacity-30 transition-opacity">
                  <Send className="w-4 h-4 text-[#050508]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
