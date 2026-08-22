"use client";

import { useEffect, useState } from "react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Comprobar si es la primera visita
    const hasVisited = localStorage.getItem("f1_prode_visited");
    if (!hasVisited) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("f1_prode_visited", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* ENCABEZADO */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 text-center relative shrink-0">
          <span className="text-3xl block mb-1">🏎️</span>
          <h2 className="text-xl font-black text-white uppercase tracking-wider">
            Bienvenido a F1 Prode Club
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tu plataforma de pronósticos y ligas de Fórmula 1
          </p>
        </div>

        {/* CONTENIDO / GUÍA COMPLETA */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
          
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <span>🏁</span> 1. Inicio
            </h3>
            <p className="text-slate-400">
              Consultá la cuenta regresiva para el próximo Gran Premio y revisá los horarios oficiales de las Prácticas, Clasificaciones, Sprints y Carreras.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <span>🏆</span> 2. Ligas
            </h3>
            <p className="text-slate-400">
              Creá tu propia liga privada para competir con amigos o sumate a ligas públicas. Dentro de cada liga vas a poder enviar tus pronósticos para cada GP.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <span>👤</span> 3. Perfil
            </h3>
            <p className="text-slate-400">
              Personalizá tu avatar y nombre de piloto. Revisá tus estadísticas globales, victorias, podios acumulados y el historial completo de carreras disputadas.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
              <span>🛍️</span> 4. Tienda
            </h3>
            <p className="text-slate-400">
              Usá las monedas 🪙 que ganes acertando resultados para canjear avatares exclusivos, insignias y ventajas especiales dentro de la plataforma.
            </p>
          </div>

          <div className="bg-red-950/40 p-3 rounded-xl border border-red-500/30 text-slate-200 text-center space-y-1">
            <h4 className="font-bold text-red-400 text-xs uppercase">💡 ¿Cómo ganar puntos y monedas?</h4>
            <p className="text-[11px] text-slate-300">
              Acertá los primeros lugares de la grilla, victorias en Sprint, pole positions y podios para sumar Puntos 🏆 y Monedas 🪙 en la tabla global.
            </p>
          </div>

        </div>

        {/* BOTÓN DE CIERRE */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-center shrink-0">
          <button
            onClick={handleClose}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase py-3 rounded-xl shadow-lg shadow-red-950/50 transition"
          >
            ¡Entendido, a correr! 🏎️
          </button>
        </div>

      </div>
    </div>
  );
}