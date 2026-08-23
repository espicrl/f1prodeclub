"use client";

import { useState, useEffect } from "react";

import Header from "./components/Header";
import CountdownTimer from "./components/CountdownTimer";
import LeagueView from "./components/LeagueView";
import StoreView from "./components/StoreView";
import ProfileView from "./components/ProfileView";
import CalendarModal from "./components/CalendarModal";
import WelcomeModal from "./components/WelcomeModal"; // Importado

export default function Home() {
  const [activeTab, setActiveTab] = useState("ligas");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false); // Estado del cartel de bienvenida

  const [userProfile, setUserProfile] = useState({
    name: "Piloto F1",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bannerImg: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
  });

  const [coins, setCoins] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Abrir bienvenida la primera vez que entra
    const hasSeenWelcome = localStorage.getItem("f1_welcome_seen");
    if (!hasSeenWelcome) {
      setIsWelcomeOpen(true);
    }

    const saved = localStorage.getItem("f1_user_profile");
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar perfil local", e);
      }
    }
  }, []);

  const handleCloseWelcome = () => {
    setIsWelcomeOpen(false);
    localStorage.setItem("f1_welcome_seen", "true");
  };

  const handleSaveProfile = (newProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem("f1_user_profile", JSON.stringify(newProfile));
  };

  return (
    <main className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      
      {/* ETIQUETA DE VERSIÓN */}
      <div className="fixed bottom-3 right-3 z-50 pointer-events-none">
        <span className="text-[10px] font-mono font-bold bg-zinc-900/90 text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-lg">
          v0.1
        </span>
      </div>

      {/* MODAL DE BIENVENIDA */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={handleCloseWelcome}
      />

      {/* MODAL DE CALENDARIO */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      {/* HEADER SUPERIOR */}
      <Header
        userProfile={userProfile}
        coins={coins}
        points={points}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onOpenProfile={() => setActiveTab("perfil")}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 space-y-6">
        
        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="flex items-center justify-center gap-2 bg-zinc-950/90 p-2 rounded-2xl border border-red-900/40 shadow-xl backdrop-blur-md sticky top-4 z-40">
          <button
            onClick={() => setActiveTab("ligas")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeTab === "ligas"
                ? "bg-red-700 text-white shadow-lg shadow-red-950 border border-red-500"
                : "bg-black/50 text-slate-400 hover:text-white hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <span>🏆</span> Ligas y Pronósticos
          </button>

          <button
            onClick={() => setActiveTab("tienda")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeTab === "tienda"
                ? "bg-red-700 text-white shadow-lg shadow-red-950 border border-red-500"
                : "bg-black/50 text-slate-400 hover:text-white hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <span>🛍️</span> Tienda
          </button>

          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeTab === "perfil"
                ? "bg-red-700 text-white shadow-lg shadow-red-950 border border-red-500"
                : "bg-black/50 text-slate-400 hover:text-white hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <span>👤</span> Perfil
          </button>
        </nav>

        {/* HERO / CUENTA REGRESIVA */}
        {activeTab === "ligas" && (
          <section className="bg-gradient-to-br from-red-950 via-black to-zinc-950 border border-red-900/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest bg-red-950/80 px-3 py-1 rounded-full border border-red-800/50">
                🏎️ Próximo Gran Premio • Temporada 2026
              </span>
              
              <CountdownTimer />
            </div>
          </section>
        )}

        {/* VISTAS MODULARES ACTIVAS */}
        <div className="pt-2">
          {activeTab === "ligas" && <LeagueView />}
          {activeTab === "tienda" && <StoreView coins={coins} setCoins={setCoins} />}
          {activeTab === "perfil" && (
            <ProfileView
              userProfile={userProfile}
              onSaveProfile={handleSaveProfile}
              points={points}
              coins={coins}
            />
          )}
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-black py-6 text-center text-xs text-slate-600 mt-auto">
        <p className="font-mono">F1 Prode Club © 2026 • Plataforma de Pronósticos Oficiales</p>
      </footer>
    </main>
  );
}