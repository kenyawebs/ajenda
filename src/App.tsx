import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import AIAssistant from "./components/AIAssistant";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import CreateEventPage from "./pages/CreateEventPage";
import OrganizerPage from "./pages/OrganizerPage";
import PricingPage from "./pages/PricingPage";

function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white relative overflow-x-hidden">
      <ParticleBackground />
      <div className="scanline fixed inset-0 z-[9999] pointer-events-none" />
      <AIAssistant />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/organizers" element={<OrganizerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
