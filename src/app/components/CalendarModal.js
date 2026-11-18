"use client";

import { useState, useEffect } from "react";

const MANUAL_WINNERS = {
  "1": "George Russell",
  "2": "Andrea Kimi Antonelli",
  "3": "Andrea Kimi Antonelli",
  "4": "Andrea Kimi Antonelli",
  "5": "Andrea Kimi Antonelli",
  "6": "Andrea Kimi Antonelli",
  "7": "Lewis Hamilton",
  "8": "George Russell",
  "9": "Charles Leclerc",
  "10": "Andrea Kimi Antonelli",
  "11": "Lando Norris",
  "12": "Lando Norris",
  "13": "Andrea Kimi Antonelli",
  "14": "Andrea Kimi Antonelli",
  "15": "George Russell",
  "16": "Max Verstappen",
  "17": "Max Verstappen",
};

export default function CalendarModal({ isOpen, onClose, onSelectRace }) {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRace, setExpandedRace] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchCalendar() {
      try {
        setLoading(true);
        const calRes = await fetch("https://api.jolpi.ca/ergast/f1/2026.json").catch(() => null);
        const calData = calRes && calRes.ok ? await calRes.json() : null;
        const raceList = calData?.MRData?.RaceTable?.Races || [];

        const formattedRaces = raceList.map((race) => {
          const roundKey = String(race.round);
          const winner = MANUAL_WINNERS[roundKey] || null;
          const sessions = [];

          if (race.FirstPractice) {
            sessions.push({ name: "Práctica 1 (FP1)", date: race.FirstPractice.date, time: race.FirstPractice.time || "10:00:00Z" });
          }
          if (race.SecondPractice) {
            sessions.push({ name: "Práctica 2 (FP2)", date: race.SecondPractice.date, time: race.SecondPractice.time || "14:00:00Z" });
          }
          if (race.ThirdPractice) {
            sessions.push({ name: "Práctica 3 (FP3)", date: race.ThirdPractice.date, time: race.ThirdPractice.time || "11:00:00Z" });
          }
          if (race.SprintQualifying) {
            sessions.push({ name: "Clasificación Sprint", date: race.SprintQualifying.date, time: race.SprintQualifying.time || "15:00:00Z" });
          }
          if (race.Sprint) {
            sessions.push({ name: "Carrera Sprint 🏁", date: race.Sprint.date, time: race.Sprint.time || "12:00:00Z" });
          }
          if (race.Qualifying) {
            sessions.push({ name: "Clasificación (Qualy)", date: race.Qualifying.date, time: race.Qualifying.time || "13:00:00Z" });
          }

          sessions.push({ name: "Carrera Principal 🏎️", date: race.date, time: race.time || "14:00:00Z" });

          return {
            round: race.round,
            name: race.raceName,
            circuit: race.Circuit?.circuitName || "Circuito F1",
            country: race.Circuit?.Location?.country || "",
            date: race.date,
            time: race.time || "14:00:00Z",
            winner,
            sessions,
          };
        });

        setRaces(formattedRaces);
      } catch (error) {
        console.error("Error al cargar el calendario:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span>📅</span> Calendario F1 2026
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white font-bold p-1 text-sm transition cursor-pointer">
            ✕ Cerrar
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {loading ? (
            <p className="text-center text-zinc-400 text-xs py-8">Cargando fechas y sesiones...</p>
          ) : races.length === 0 ? (
            <p className="text-center text-zinc-400 text-xs py-8">No se pudieron cargar las carreras.</p>
          ) : (
            races.map((race) => {
              const isExpanded = expandedRace === race.round;

              return (
                <div key={race.round} className="bg-black/50 border border-zinc-800 rounded-xl overflow-hidden transition">
                  <div className="p-3 flex justify-between items-center gap-4">
                    <div>
                      <span className="text-[10px] text-red-500 font-bold uppercase">FECHA {race.round}</span>
                      <h3 className="text-sm font-bold text-white">{race.name}</h3>
                      <p className="text-xs text-zinc-400">{race.circuit} {race.country ? `(${race.country})` : ""}</p>
                      <p className="text-[11px] text-zinc-500 mt-1">🗓️ {race.date}</p>
                    </div>

                    <div className="text-right flex flex-col items-end gap-2 shrink-0">
                      {race.winner ? (
                        <div>
                          <span className="text-[9px] text-amber-500 font-bold uppercase block">Ganador 🏆</span>
                          <span className="text-xs font-black text-white">{race.winner}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5 items-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectRace) {
                                onSelectRace({
                                  name: `${race.name} (Carrera)`,
                                  circuit: race.circuit,
                                  date: race.date,
                                  time: race.time,
                                });
                              }
                              onClose();
                            }}
                            className="bg-red-800 hover:bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-red-500/40 transition cursor-pointer"
                          >
                            Ver Carrera ⏱️
                          </button>

                          <button
                            type="button"
                            onClick={() => setExpandedRace(isExpanded ? null : race.round)}
                            className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                          >
                            {isExpanded ? "Ocultar sesiones ▲" : "Ver sesiones ▼"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {isExpanded && !race.winner && (
                    <div className="bg-zinc-950/80 p-3 border-t border-zinc-800/80 space-y-2">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Seleccionar sesión para el contador:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {race.sessions.map((session, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (onSelectRace) {
                                onSelectRace({
                                  name: `${race.name} (${session.name})`,
                                  circuit: race.circuit,
                                  date: session.date,
                                  time: session.time,
                                });
                              }
                              onClose();
                            }}
                            className="flex justify-between items-center p-2 bg-zinc-900 hover:bg-red-950/50 border border-zinc-800 hover:border-red-600/50 rounded-lg text-left transition text-xs cursor-pointer"
                          >
                            <div>
                              <span className="font-bold text-white block">{session.name}</span>
                              <span className="text-[10px] text-zinc-500">{session.date}</span>
                            </div>
                            <span className="text-[10px] bg-red-900/60 text-red-300 px-2 py-0.5 rounded font-mono font-bold">
                              Elegir ⏱️
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}