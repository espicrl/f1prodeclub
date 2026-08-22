"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ onOpenCalendar, selectedRace }) {
  const race = selectedRace || {
    name: "GP de Países Bajos",
    flag: "🇳🇱",
    date: "2026-08-23T10:00:00Z",
    displayDate: "21 - 23 de Agosto",
    isSprint: true,
    schedule: { fp1: "Vie 07:30", sprintQuali: "Vie 11:30", sprint: "Sáb 07:00", quali: "Sáb 11:00", race: "Dom 10:00" }
  };

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDateStr = race.date || "2026-08-23T10:00:00Z";
    const targetDate = new Date(targetDateStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [race]);

  const sched = race.schedule;

  return (
    <div
      onClick={onOpenCalendar}
      className="bg-slate-900 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 shadow-xl cursor-pointer transition group relative overflow-hidden"
    >
      <div className="absolute top-3 right-3 text-[10px] font-bold text-slate-500 group-hover:text-red-400 transition flex items-center gap-1">
        <span>🗓️ Ver Calendario</span>
        <span>→</span>
      </div>

      {/* TITULO Y BADGES */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{race.flag}</span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block">
              Gran Premio Seleccionado
            </span>
            {race.isSprint && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                ⚡ Carrera Sprint
              </span>
            )}
          </div>
          <h2 className="text-lg font-black text-white">{race.name}</h2>
        </div>
      </div>

      {/* CONTADOR */}
      <div className="grid grid-cols-4 gap-2 text-center bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-3">
        <div className="flex flex-col">
          <span className="text-xl font-black text-white font-mono">{timeLeft.dias}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase">Días</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white font-mono">{timeLeft.horas}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase">Hs</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white font-mono">{timeLeft.minutos}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase">Min</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white font-mono">{timeLeft.segundos}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase">Seg</span>
        </div>
      </div>

      {/* HORARIOS DE PRÁCTICAS Y SESIONES */}
      {sched && (
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50 mb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 text-center">
            ⏱️ Horarios del Fin de Semana
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            {sched.fp1 && <div className="flex justify-between text-slate-300"><span>Práctica 1:</span><span className="font-mono font-bold text-slate-100">{sched.fp1}</span></div>}
            {sched.sprintQuali && <div className="flex justify-between text-amber-300"><span>Sprint Quali:</span><span className="font-mono font-bold text-amber-200">{sched.sprintQuali}</span></div>}
            {sched.sprint && <div className="flex justify-between text-amber-400 font-bold"><span>⚡ Sprint:</span><span className="font-mono">{sched.sprint}</span></div>}
            {sched.fp2 && <div className="flex justify-between text-slate-300"><span>Práctica 2:</span><span className="font-mono font-bold text-slate-100">{sched.fp2}</span></div>}
            {sched.fp3 && <div className="flex justify-between text-slate-300"><span>Práctica 3:</span><span className="font-mono font-bold text-slate-100">{sched.fp3}</span></div>}
            {sched.quali && <div className="flex justify-between text-slate-300"><span>Clasificación:</span><span className="font-mono font-bold text-slate-100">{sched.quali}</span></div>}
            {sched.race && <div className="flex justify-between text-red-400 font-bold col-span-2 border-t border-slate-800/60 pt-1 mt-0.5"><span>🏎️ Carrera Principal:</span><span className="font-mono">{sched.race}</span></div>}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] pt-1">
        <span className="text-slate-400 font-medium">📅 {race.displayDate}</span>
        <span className="text-red-400 font-bold">Toca para cambiar GP</span>
      </div>
    </div>
  );
}