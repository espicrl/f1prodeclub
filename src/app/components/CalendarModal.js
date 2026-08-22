"use client";

export const RACES_2026 = [
  { 
    id: "nld", 
    round: 15, 
    name: "GP de Países Bajos", 
    circuit: "Circuit Zandvoort", 
    city: "Zandvoort", 
    flag: "🇳🇱", 
    displayDate: "21 - 23 de Agosto", 
    date: "2026-08-23T10:00:00Z",
    status: "next",
    isSprint: true,
    schedule: { fp1: "Vie 07:30", sprintQuali: "Vie 11:30", sprint: "Sáb 07:00", quali: "Sáb 11:00", race: "Dom 10:00" }
  },
  { 
    id: "ita", 
    round: 16, 
    name: "GP de Italia", 
    circuit: "Autodromo Nazionale Monza", 
    city: "Monza", 
    flag: "🇮🇹", 
    displayDate: "4 - 6 de Septiembre", 
    date: "2026-09-06T13:00:00Z",
    status: "upcoming",
    isSprint: false,
    schedule: { fp1: "Vie 08:30", fp2: "Vie 12:00", fp3: "Sáb 07:30", quali: "Sáb 11:00", race: "Dom 10:00" }
  },
  { 
    id: "aze", 
    round: 17, 
    name: "GP de Azerbaiyán", 
    circuit: "Baku City Circuit", 
    city: "Baku", 
    flag: "🇦🇿", 
    displayDate: "18 - 20 de Septiembre", 
    date: "2026-09-20T11:00:00Z",
    status: "upcoming",
    isSprint: false,
    schedule: { fp1: "Vie 06:30", fp2: "Vie 10:00", fp3: "Sáb 05:30", quali: "Sáb 09:00", race: "Dom 08:00" }
  },
  { 
    id: "sgp", 
    round: 18, 
    name: "GP de Singapur", 
    circuit: "Marina Bay Street Circuit", 
    city: "Singapur", 
    flag: "🇸🇬", 
    displayDate: "2 - 4 de Octubre", 
    date: "2026-10-04T12:00:00Z",
    status: "upcoming",
    isSprint: false,
    schedule: { fp1: "Vie 06:30", fp2: "Vie 10:00", fp3: "Sáb 06:30", quali: "Sáb 10:00", race: "Dom 09:00" }
  },
  { 
    id: "usa", 
    round: 19, 
    name: "GP de Estados Unidos", 
    circuit: "Circuit of the Americas", 
    city: "Austin", 
    flag: "🇺🇸", 
    displayDate: "16 - 18 de Octubre", 
    date: "2026-10-18T19:00:00Z",
    status: "upcoming",
    isSprint: true,
    schedule: { fp1: "Vie 14:30", sprintQuali: "Vie 18:30", sprint: "Sáb 15:00", quali: "Sáb 19:00", race: "Dom 16:00" }
  },
  { id: "mex", round: 20, name: "GP de Ciudad de México", circuit: "Autódromo Hermanos Rodríguez", city: "Ciudad de México", flag: "🇲🇽", displayDate: "23 - 25 de Octubre", date: "2026-10-25T20:00:00Z", status: "upcoming", isSprint: false },
  { id: "bra", round: 21, name: "GP de São Paulo", circuit: "Autódromo José Carlos Pace", city: "São Paulo", flag: "🇧🇷", displayDate: "6 - 8 de Noviembre", date: "2026-11-08T17:00:00Z", status: "upcoming", isSprint: true },
  { id: "las", round: 22, name: "GP de Las Vegas", circuit: "Las Vegas Strip Circuit", city: "Las Vegas", flag: "🇺🇸", displayDate: "19 - 21 de Noviembre", date: "2026-11-22T06:00:00Z", status: "upcoming", isSprint: false },
  { id: "qatar", round: 23, name: "GP de Qatar", circuit: "Lusail International Circuit", city: "Lusail", flag: "🇶🇦", displayDate: "27 - 29 de Noviembre", date: "2026-11-29T16:00:00Z", status: "upcoming", isSprint: true },
  { id: "abu", round: 24, name: "GP de Abu Dabi", circuit: "Yas Marina Circuit", city: "Yas Island", flag: "🇦🇪", displayDate: "4 - 6 de Diciembre", date: "2026-12-06T13:00:00Z", status: "upcoming", isSprint: false },
];

export default function CalendarModal({ isOpen, onClose, onSelectRace, selectedRaceId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">🗓️ Calendario F1 2026</h2>
            <p className="text-xs text-slate-400">Seleccioná una fecha para pronosticar</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition">✕</button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {RACES_2026.map((race) => {
            const isSelected = selectedRaceId === race.id;
            const isNext = race.status === "next";

            return (
              <div
                key={race.id}
                onClick={() => {
                  if (onSelectRace) onSelectRace(race);
                  onClose();
                }}
                className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between gap-4 border ${
                  isSelected ? "bg-red-950/50 border-red-500" : isNext ? "bg-slate-950 border-red-500/40 hover:border-red-500" : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{race.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Ronda {race.round}</span>
                      {race.isSprint && (
                        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">⚡ Sprint</span>
                      )}
                      {isNext && <span className="bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">En Juego</span>}
                    </div>
                    <h3 className="text-sm font-bold text-white">{race.name}</h3>
                    <p className="text-xs text-slate-400">{race.circuit}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-300 block">{race.displayDate}</span>
                  <span className="text-[10px] text-slate-500 font-mono">2026</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 text-center">
          <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl transition">Cerrar</button>
        </div>
      </div>
    </div>
  );
}