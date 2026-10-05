"use client";

import TrackVector from "./TrackVector";

export default function ProfileModal({ isOpen, onClose, userProfile, onSave }) {
  if (!isOpen) return null;

  // Trofeos mock o traídos del userProfile (ej: circuitos que ganó en el Prode)
  const userTrophies = userProfile?.trophies || [
    { id: 1, name: "GP Australia", trackKey: "albert_park" },
    { id: 2, name: "GP Miami", trackKey: "miami" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border border-red-900/60 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-5">
        
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
            <span>👤</span> Perfil del Usuario
          </h3>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white transition">✕</button>
        </div>

        {/* VITRINA DE TROFEOS PRODE */}
        <div className="bg-zinc-900/60 border border-amber-500/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🏆</span> Vitrina de Trofeos Prode
            </h4>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono border border-amber-500/30">
              {userTrophies.length} Ganados
            </span>
          </div>

          {userTrophies.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono text-center py-3">
              Sin victorias en el Prode aún.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {userTrophies.map((trophy) => (
                <div
                  key={trophy.id}
                  className="bg-black/80 border border-amber-500/40 rounded-lg p-2 flex flex-col items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <TrackVector trackKey={trophy.trackKey} className="w-8 h-8" isGold={true} />
                  </div>
                  <span className="text-[10px] font-bold text-amber-200 text-center truncate w-full">
                    {trophy.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400">Podés actualizar más datos desde la pestaña Perfil.</p>

        <button
          onClick={onClose}
          className="w-full bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase py-2.5 rounded-xl transition shadow-lg shadow-red-950"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}