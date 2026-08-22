"use client";

export default function StoreView({ coins = 250 }) {
  const previewItems = [
    { id: 1, title: "Avatar VIP: Hamilton Ferrari", price: 500, icon: "🏎️", type: "Avatar Exclusivo" },
    { id: 2, title: "Banner: Red Bull Ring", price: 750, icon: "🚩", type: "Fondo de Perfil" },
    { id: 3, title: "Insignia: Rey de las Sprints", price: 300, icon: "⚡", type: "Medalla de Perfil" },
    { id: 4, title: "Multiplicador x2 Puntos GP", price: 1000, icon: "🚀", type: "Potenciador" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <span>⏳</span> Próximamente
          </div>
          <h2 className="text-2xl font-black text-white">Tienda del Paddock</h2>
          <p className="text-xs text-slate-300 max-w-md">
            Usá tus monedas ganadas en los pronósticos semanales para desbloquear fotos de perfil, banners exclusivos y ventajas en tu liga.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 flex flex-col items-center justify-center shrink-0 min-w-[140px] z-10 shadow-inner">
          <span className="text-xs text-slate-400 font-bold uppercase">Tus Monedas</span>
          <div className="flex items-center gap-1.5 text-xl font-black text-amber-400 font-mono mt-1">
            <span>🪙</span> {coins}
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ITEMS PREVIEW (DESHABILITADOS POR PRÓXIMAMENTE) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>👀</span> Vista previa del catálogo
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previewItems.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between opacity-75 relative group overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{item.type}</span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 mt-0.5">
                    <span>🪙</span> {item.price}
                  </div>
                </div>
              </div>

              <button 
                disabled 
                className="bg-slate-800 text-slate-500 text-xs font-bold px-3 py-2 rounded-lg cursor-not-allowed border border-slate-700"
              >
                Bloqueado
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ANUNCIO INFORMATIVO */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center text-xs text-slate-400 space-y-1">
        <p className="font-bold text-slate-300">💡 ¿Cómo ganar más monedas?</p>
        <p>Ganá monedas en cada carrera acertando Pole Positions, Podios y Abandonos en tus ligas.</p>
      </div>

    </div>
  );
}