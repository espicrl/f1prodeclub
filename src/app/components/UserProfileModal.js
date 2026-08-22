"use client";

import { PILOT_AVATARS } from "./ProfileModal";

// Trazados SVG de los circuitos
const CIRCUIT_TRACKS = {
  australia: "M 10 30 Q 30 10 50 20 T 80 40 T 90 80 T 50 90 T 20 60 Z",
  monaco: "M 20 20 Q 50 10 80 30 T 70 80 T 30 70 Z",
};

export default function UserProfileModal({ isOpen, onClose, targetUser }) {
  if (!isOpen || !targetUser) return null;

  const avatarImg = targetUser.avatarImg || PILOT_AVATARS[0].img;
  const vOffset = targetUser.avatarOffset !== undefined ? targetUser.avatarOffset : 20;

  // Si el usuario no tiene lista de victorias definida en sus datos, mostramos una lista por defecto
  const userTrophies = targetUser.trophies || [
    { id: "aus-2026", raceName: "GP de Australia", trackSvg: CIRCUIT_TRACKS.australia },
    { id: "mon-2026", raceName: "GP de Mónaco", trackSvg: CIRCUIT_TRACKS.monaco }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition z-10"
        >
          ✕
        </button>

        {/* HEADER DE PORTADA */}
        <div className="-mx-5 -mt-5 h-20 bg-gradient-to-r from-red-900 via-slate-900 to-amber-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
        </div>

        {/* FOTO Y DATOS DEL PILOTO */}
        <div className="flex flex-col items-center text-center -mt-10 mb-4 relative z-0">
          <div className="w-20 h-20 rounded-2xl bg-slate-950 border-4 border-slate-900 overflow-hidden shadow-xl mb-2">
            <img
              src={avatarImg}
              alt={targetUser.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: `50% ${vOffset}%` }}
            />
          </div>
          <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest">
            Piloto F1 Prode Club
          </span>
          <h3 className="text-xl font-black text-white">{targetUser.name}</h3>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-2 gap-2 text-center mb-4">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-lg block">🏆</span>
            <span className="text-base font-black text-white font-mono">{targetUser.points || 0}</span>
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Puntos Totales</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-lg block">🪙</span>
            <span className="text-base font-black text-amber-400 font-mono">{targetUser.coins || 0}</span>
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Monedas</span>
          </div>
        </div>

        {/* TRAZADOS DORADOS GANADOS */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 text-center">
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-3">
            🏅 Circuitos Ganados ({userTrophies.length})
          </span>
          
          <div className="grid grid-cols-2 gap-3">
            {userTrophies.map((trophy) => (
              <div 
                key={trophy.id}
                className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-2.5 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 my-1">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={trophy.trackSvg} />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-white mt-1 line-clamp-1">
                  {trophy.raceName}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2.5 rounded-xl transition"
        >
          Cerrar
        </button>

      </div>
    </div>
  );
}