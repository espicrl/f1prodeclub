"use client";

export default function Header({
  userProfile,
  coins = 0,
  points = 0,
  onOpenCalendar,
  onOpenProfile,
}) {
  return (
    <header className="bg-black/90 border-b border-red-900/40 sticky top-0 z-50 backdrop-blur-md px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* LOGO & TITULO */}
        <div className="flex items-center gap-3">
          <div className="bg-red-700 text-white font-black text-sm px-2.5 py-1 rounded-lg tracking-tighter shadow-md">
            F1
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-black text-sm sm:text-base tracking-wider uppercase text-white">
              PRODE <span className="text-red-500">CLUB</span>
            </h1>
            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded uppercase tracking-widest">
              BETA
            </span>
          </div>
        </div>

        {/* CONTROLES / USUARIO */}
        <div className="flex items-center gap-3">
          {/* BOTÓN CALENDARIO */}
          <button
            onClick={onOpenCalendar}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <span>📅</span>
            <span className="hidden sm:inline">Calendario</span>
          </button>

          {/* MONEDAS Y PUNTOS */}
          <div className="hidden sm:flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
            <span className="text-amber-400">🪙 {coins}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-red-400">{points} pts</span>
          </div>

          {/* PERFIL */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl transition"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-600 bg-zinc-900 shrink-0">
              <img
                src={userProfile?.avatarImg || "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2022_March_%28cropped%29.jpg"}
                alt={userProfile?.name || "Usuario"}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-slate-200 pr-1 hidden sm:inline">
              {userProfile?.name || "Piloto"}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}