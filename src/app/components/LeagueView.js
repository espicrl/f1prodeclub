"use client";

import { useState } from "react";

export default function LeagueView() {
  const [leagues, setLeagues] = useState([]);
  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [newLeagueName, setNewLeagueName] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  
  const [predictions, setPredictions] = useState({});

  // PREDICCIONES BLOQUEADAS (El tiempo límite ya expiró)
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
    const updated = [...leagues, newGroup];
    setLeagues(updated);
    setActiveLeagueId(newGroup.id);
    setNewLeagueName("");
    setShowCreateGroup(false);
  };

  const updateCurrentPred = (key, value) => {
    if (isLocked || !activeLeagueId) return;
    setPredictions({
      ...predictions,
      [activeLeagueId]: {
        ...currentPred,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SELECCIÓN Y CREACIÓN DE LIGAS */}
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
              Hacé clic en <strong className="text-red-400">+ Crear Liga</strong> para invitar a tus amigos y empezar a competir.
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

      {/* SECCIÓN DE PRONÓSTICO (SÓLO SI HAY LIGA ACTIVA) */}
      {currentLeague && currentPred && (
        <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="border-b border-zinc-900 pb-3 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>📝</span> Pronóstico para: <span className="text-red-500">{currentLeague.name}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Predicciones para la sesión activa.
              </p>
            </div>

            {/* BADGE DE ESTADO BLOQUEADO */}
            {isLocked && (
              <span className="text-xs bg-amber-950/80 text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-amber-800/80 flex items-center gap-1.5 shadow-md">
                🔒 Pronósticos Bloqueados
              </span>
            )}
          </div>

          {/* BANNER AVISO TIEMPO EXPIRADO */}
          {isLocked && (
            <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl text-center">
              <p className="text-xs text-amber-300 font-mono">
                ⏱️ El tiempo límite para enviar tus predicciones ha terminado. Las opciones están cerradas.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2 opacity-60">
                <span className="text-xs font-bold text-amber-400 block uppercase">🥇 1° Puesto</span>
                <select
                  disabled={isLocked}
                  value={currentPred.p1}
                  onChange={(e) => updateCurrentPred("p1", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none cursor-not-allowed"
                >
                  <option value="">Cerrado</option>
                  <option value="NOR">Lando Norris (McLaren)</option>
                  <option value="RUS">George Russell (Mercedes)</option>
                  <option value="ANT">Kimi Antonelli (Mercedes)</option>
                  <option value="PIA">Oscar Piastri (McLaren)</option>
                  <option value="HAM">Lewis Hamilton (Ferrari)</option>
                  <option value="VER">Max Verstappen (Red Bull)</option>
                  <option value="COL">Franco Colapinto (Alpine)</option>
                </select>
              </div>

              <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2 opacity-60">
                <span className="text-xs font-bold text-slate-300 block uppercase">🥈 2° Puesto</span>
                <select
                  disabled={isLocked}
                  value={currentPred.p2}
                  onChange={(e) => updateCurrentPred("p2", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none cursor-not-allowed"
                >
                  <option value="">Cerrado</option>
                  <option value="NOR">Lando Norris (McLaren)</option>
                  <option value="RUS">George Russell (Mercedes)</option>
                  <option value="ANT">Kimi Antonelli (Mercedes)</option>
                  <option value="PIA">Oscar Piastri (McLaren)</option>
                  <option value="HAM">Lewis Hamilton (Ferrari)</option>
                  <option value="VER">Max Verstappen (Red Bull)</option>
                  <option value="COL">Franco Colapinto (Alpine)</option>
                </select>
              </div>

              <div className="bg-black p-4 rounded-xl border border-zinc-800 space-y-2 opacity-60">
                <span className="text-xs font-bold text-amber-700 block uppercase">🥉 3° Puesto</span>
                <select
                  disabled={isLocked}
                  value={currentPred.p3}
                  onChange={(e) => updateCurrentPred("p3", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none cursor-not-allowed"
                >
                  <option value="">Cerrado</option>
                  <option value="NOR">Lando Norris (McLaren)</option>
                  <option value="RUS">George Russell (Mercedes)</option>
                  <option value="ANT">Kimi Antonelli (Mercedes)</option>
                  <option value="PIA">Oscar Piastri (McLaren)</option>
                  <option value="HAM">Lewis Hamilton (Ferrari)</option>
                  <option value="VER">Max Verstappen (Red Bull)</option>
                  <option value="COL">Franco Colapinto (Alpine)</option>
                </select>
              </div>
            </div>

            <button
              disabled={isLocked}
              className="w-full bg-zinc-800 text-zinc-500 font-black text-xs uppercase py-3 rounded-xl cursor-not-allowed border border-zinc-700/50"
            >
              🔒 Predicciones Cerradas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}