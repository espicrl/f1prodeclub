"use client";

import { useState } from "react";

const CIRCUITS_DATA = [
  { round: 1, name: "GP de Australia", winner: "Juan Pérez", points: 25 },
  { round: 2, name: "GP de China", winner: "Carlos F.", points: 30 },
  { round: 3, name: "GP de Japón", winner: "Lucas M.", points: 22 },
  { round: 4, name: "GP de Bahréin", winner: "Marcos G.", points: 18 },
  { round: 5, name: "GP de Arabia Saudita", winner: "Agustín R.", points: 25 },
  { round: 6, name: "GP de Miami", winner: "Mateo S.", points: 20 },
  { round: 7, name: "GP de Canadá", winner: "Federico T.", points: 15 },
  { round: 8, name: "GP de Mónaco", winner: "Diego L.", points: 25 },
];

export default function LeagueView() {
  const [leagues, setLeagues] = useState([]);
  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [newLeagueName, setNewLeagueName] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [predictions, setPredictions] = useState({});

  const isLocked = true;
  const currentLeague = leagues.find((l) => l.id === activeLeagueId);
  const currentPred = activeLeagueId ? predictions[activeLeagueId] || { p1: "", p2: "", p3: "" } : null;

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newLeagueName.trim()) return;
    const newGroup = {
      id: Date.now().toString(),
      name: newLeagueName.trim(),
      type: "Privada",
      members: 1,
      code: "GP" + Math.floor(1000 + Math.random() * 9000),
    };
    setLeagues([...leagues, newGroup]);
    setActiveLeagueId(newGroup.id);
    setNewLeagueName("");
    setShowCreateGroup(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SECCIÓN 1: TUS LIGAS */}
      <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span>👥</span> Tus Ligas
          </h2>
          <button
            onClick={() => setShowCreateGroup(!showCreateGroup)}
            className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition"
          >
            {showCreateGroup ? "Cerrar" : "+ Crear Liga"}
          </button>
        </div>

        {showCreateGroup && (
          <form onSubmit={handleCreateGroup} className="bg-black p-4 rounded-xl border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase">Crear Nueva Liga</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre de la liga..."
                value={newLeagueName}
                onChange={(e) => setNewLeagueName(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition"
              >
                Crear
              </button>
            </div>
          </form>
        )}

        {leagues.length === 0 ? (
          <div className="text-center py-8 bg-black/50 rounded-xl border border-zinc-800/80 p-4 space-y-2">
            <p className="text-slate-400 text-xs font-mono">Aún no formás parte de ninguna liga.</p>
            <p className="text-[11px] text-zinc-500">
              Hacé clic en <strong className="text-red-400">+ Crear Liga</strong> para invitar a tus amigos.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {leagues.map((league) => (
              <div
                key={league.id}
                onClick={() => setActiveLeagueId(league.id)}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                  activeLeagueId === league.id
                    ? "bg-red-950/30 border-red-600 shadow-md shadow-red-950"
                    : "bg-black border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{league.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {league.type} • Código: <span className="font-mono text-red-400">{league.code}</span>
                  </p>
                </div>
                {activeLeagueId === league.id ? (
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    Activa
                  </span>
                ) : (
                  <span className="text-xs text-zinc-500 font-mono">Seleccionar →</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN 2: AFICHE F1 PUBLIC */}
      <div className="bg-zinc-950 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="text-base font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <span>👑</span> Trofeos de Circuito (Ganadores del Fin de Semana)
          </h2>
          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
            Prode F1 2026
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {CIRCUITS_DATA.map((race) => (
            <div
              key={race.round}
              className="relative bg-gradient-to-r from-amber-950/30 via-zinc-950 to-black border border-amber-500/50 rounded-xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.1)] overflow-hidden"
            >
              <div className="space-y-1 z-10">
                <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black px-1.5 py-0.5 rounded uppercase">
                  Fecha {race.round} • Ganador Prode
                </span>
                <h3 className="text-sm font-bold text-amber-100">{race.name}</h3>
                <p className="text-xs text-zinc-300 font-medium">
                  🥇 {race.winner} <span className="text-amber-400 font-bold">({race.points} pts)</span>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 z-10">
                <span className="text-3xl drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">🏆</span>

                {/* VISUALIZADOR DE LA IMAGEN DESDE /public */}
                <div className="w-16 h-16 rounded-xl border-2 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.4)] overflow-hidden bg-black shrink-0 relative flex items-center justify-center">
                  <img
                    src="/f1-poster.jpeg"
                    alt={race.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: PRONÓSTICOS */}
      {currentLeague && currentPred && (
        <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="border-b border-zinc-900 pb-3 flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>📝</span> Pronóstico para: <span className="text-red-500">{currentLeague.name}</span>
            </h2>
            {isLocked && (
              <span className="text-xs bg-amber-950/80 text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-amber-800/80">
                🔒 Pronósticos Bloqueados
              </span>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2 opacity-60">
              <span className="text-xs font-bold text-amber-400 block uppercase">🥇 1° Puesto</span>
              <select disabled className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white cursor-not-allowed">
                <option value="">Cerrado</option>
              </select>
            </div>
            <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2 opacity-60">
              <span className="text-xs font-bold text-slate-300 block uppercase">🥈 2° Puesto</span>
              <select disabled className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white cursor-not-allowed">
                <option value="">Cerrado</option>
              </select>
            </div>
            <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2 opacity-60">
              <span className="text-xs font-bold text-amber-700 block uppercase">🥉 3° Puesto</span>
              <select disabled className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white cursor-not-allowed">
                <option value="">Cerrado</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}