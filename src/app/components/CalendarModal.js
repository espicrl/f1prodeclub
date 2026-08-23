"use client";

export default function CalendarModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const upcomingRaces = [
    { round: 14, country: "🇳🇱 Países Bajos", name: "GP de los Países Bajos", circuit: "Zandvoort", date: "23 Ago", status: "Próxima Carrera" },
    { round: 15, country: "🇮🇹 Italia", name: "GP de Italia", circuit: "Monza", date: "6 Sep", status: "Pendiente" },
    { round: 16, country: "🇪🇸 España", name: "GP de España", circuit: "Madrid", date: "13 Sep", status: "Pendiente" },
    { round: 17, country: "🇦🇿 Azerbaiyán", name: "GP de Azerbaiyán", circuit: "Bakú", date: "26 Sep", status: "Pendiente" },
    { round: 18, country: "🇸🇬 Singapur", name: "GP de Singapur", circuit: "Marina Bay", date: "11 Oct", status: "Pendiente" },
    { round: 19, country: "🇺🇸 EE.UU.", name: "GP de Estados Unidos", circuit: "Austin (COTA)", date: "25 Oct", status: "Pendiente" },
    { round: 20, country: "🇲🇽 México", name: "GP de México", circuit: "Hermanos Rodríguez", date: "1 Nov", status: "Pendiente" },
    { round: 21, country: "🇧🇷 Brasil", name: "GP de Brasil", circuit: "Interlagos", date: "8 Nov", status: "Pendiente" },
    { round: 22, country: "🇺🇸 EE.UU.", name: "GP de Las Vegas", circuit: "Las Vegas Strip", date: "21 Nov", status: "Pendiente" },
    { round: 23, country: "🇶🇦 Catar", name: "GP de Catar", circuit: "Lusail", date: "29 Nov", status: "Pendiente" },
    { round: 24, country: "🇦🇪 Abu Dabi", name: "GP de Abu Dabi", circuit: "Yas Marina", date: "6 Dic", status: "Gran Final" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border border-red-900/60 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        <div className="p-4 border-b border-red-900/40 bg-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Calendario F1 • Carreras Restantes
              </h2>
              <p className="text-[10px] text-red-500 font-mono uppercase">Temporada Oficial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-xs bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 transition"
          >
            ✕ Cerrar
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-2.5">
          {upcomingRaces.map((race) => (
            <div
              key={race.round}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                race.status === "Próxima Carrera"
                  ? "bg-red-950/40 border-red-600/80 shadow-md shadow-red-950/50"
                  : "bg-black border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-zinc-500 w-8">
                  R{race.round}
                </span>
                <div>
                  <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                    <span>{race.country}</span>
                    <span>{race.name}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">{race.circuit}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {race.status === "Próxima Carrera" && (
                  <span className="text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse hidden sm:inline">
                    En Curso
                  </span>
                )}
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
                    race.status === "Próxima Carrera"
                      ? "text-red-400 bg-red-950 border-red-800"
                      : "text-slate-300 bg-zinc-900 border-zinc-800"
                  }`}
                >
                  {race.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-zinc-900 bg-black text-center shrink-0">
          <p className="text-[11px] text-slate-500 font-mono">
            💡 Los horarios exactos se habilitan semana a semana.
          </p>
        </div>

      </div>
    </div>
  );
}