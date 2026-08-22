"use client";

import { PILOT_AVATARS } from "./ProfileModal";

export default function Header({ coins = 250, points = 120, currentTab, onChangeTab, userProfile }) {
  // Usamos el avatar y offset guardados o los valores por defecto
  const avatarImage = userProfile.avatarImg || PILOT_AVATARS[0].img;
  const vOffset = userProfile.avatarOffset !== undefined ? userProfile.avatarOffset : 20;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-slate-900/90">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        
        {/* BRAND / LOGO */}
        <div 
          onClick={() => onChangeTab("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">🏎️</span>
          <div>
            <h1 className="text-sm font-black text-white tracking-wider uppercase leading-none">
              F1 <span className="text-red-500">PRODE CLUB</span>
            </h1>
            <span className="text-[9px] text-slate-400 font-mono">TEMPORADA 2026</span>
          </div>
        </div>

        {/* PUNTOS Y MONEDAS */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-inner">
            <span className="text-amber-400">🏆</span>
            <span className="text-white font-mono">{points}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-amber-500/30 px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-inner">
            <span className="text-amber-400">🪙</span>
            <span className="text-amber-300 font-mono">{coins}</span>
          </div>
        </div>

      </div>

      {/* PESTAÑAS DE NAVEGACIÓN */}
      <div className="max-w-4xl mx-auto px-4 flex gap-1.5 border-t border-slate-800/60 pt-2 pb-2 overflow-x-auto">
        <button
          onClick={() => onChangeTab("home")}
          className={`flex-1 min-w-[70px] py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
            currentTab === "home" 
              ? "bg-red-600 text-white shadow-md shadow-red-950/50" 
              : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <span>🏁</span> Inicio
        </button>

        <button
          onClick={() => onChangeTab("leagues")}
          className={`flex-1 min-w-[70px] py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
            currentTab === "leagues" 
              ? "bg-red-600 text-white shadow-md shadow-red-950/50" 
              : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <span>🏆</span> Ligas
        </button>

        <button
          onClick={() => onChangeTab("profile")}
          className={`flex-1 min-w-[70px] py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            currentTab === "profile" 
              ? "bg-red-600 text-white shadow-md shadow-red-950/50" 
              : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          {/* MINI FOTO DE PERFIL CON ENCUADRE PERSONALIZADO */}
          <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-400 shadow-inner shrink-0">
            <img 
              src={avatarImage} 
              alt="Perfil" 
              className="w-full h-full object-cover" 
              // APLICAMOS EL OFFSET VERTICAL GUARDADO
              style={{ objectPosition: `50% ${vOffset}%` }}
            />
          </div>
          Perfil
        </button>

        <button
          onClick={() => onChangeTab("store")}
          className={`flex-1 min-w-[70px] py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
            currentTab === "store" 
              ? "bg-amber-600 text-white shadow-md shadow-amber-950/50" 
              : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <span>🛍️</span> Tienda
        </button>
      </div>
    </header>
  );
}