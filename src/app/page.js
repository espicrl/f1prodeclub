"use client";

import { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import CalendarModal from "./components/CalendarModal";

export default function Home() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-4 md:p-8 selection:bg-red-900 selection:text-white">
      
      {/* 🛑 CARTEL DE RECONSTRUCCIÓN HASTA FEBRERO 2027 */}
      <div className="w-full max-w-2xl mx-auto mt-2 bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 border border-red-800/60 rounded-2xl p-5 text-center shadow-2xl shadow-red-950/50 backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span className="text-xl animate-pulse">🚧</span>
          <h1 className="text-sm md:text-base font-black uppercase tracking-wider text-red-400">
            Página en Reconstrucción • Regresamos en Febrero 2027
          </h1>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed max-w-xl mx-auto">
          Estamos preparando la <span className="text-white font-bold">Actualización 1.0</span> con minijuegos, temas de escuderías y muchas novedades. Por el momento solo se encuentran habilitados los horarios, el contador y el calendario.
        </p>
      </div>

      {/* CONTENIDO CENTRAL: CAMPEONES 2026 + CONTADOR + CALENDARIO */}
      <div className="w-full max-w-xl my-8 space-y-6">
        
        {/* 🏆 TARJETA DE CAMPEONES TEMPORADA 2026 */}
        <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-5 shadow-xl">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-amber-500 text-center mb-4 flex items-center justify-center gap-2">
            <span>🏆</span> Campeones Mundiales F1 2026 <span>🏆</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Campeonato de Pilotos */}
            <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Campeón de Pilotos
              </span>
              <span className="text-base font-black text-white mt-1 block">
                Andrea Kimi Antonelli
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase mt-0.5 block">
                Mercedes-AMG F1
              </span>
            </div>

            {/* Campeonato de Constructores */}
            <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-xl p-3.5 text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Campeón de Constructores
              </span>
              <span className="text-base font-black text-white mt-1 block">
                Mercedes
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase mt-0.5 block">
                Mercedes-AMG Petronas
              </span>
            </div>
          </div>
        </div>

        {/* ⏱️ CONTADOR DE PRÓXIMA CARRERA */}
        <CountdownTimer selectedSession={selectedSession} />

        {/* 📅 BOTÓN PARA ABRIR EL CALENDARIO */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsCalendarOpen(true)}
            className="w-full sm:w-auto bg-red-900 hover:bg-red-800 text-white border border-red-600/50 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📅</span> Ver Calendario, Horarios y Resultados
          </button>
        </div>

      </div>

      {/* MODAL DE CALENDARIO */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectRace={(session) => setSelectedSession(session)}
      />

      {/* PIE DE PÁGINA */}
      <footer className="text-center text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
        F1 Prode Club • Versión 1.0 en Desarrollo (Febrero 2027)
      </footer>

    </main>
  );
}