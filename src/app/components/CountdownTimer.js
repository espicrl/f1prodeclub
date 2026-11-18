"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ selectedSession }) {
  // GP de Estados Unidos (Austin - COTA)
  const defaultTarget = new Date("2026-10-25T16:00:00-05:00").getTime();
  const targetDate = selectedSession?.date
    ? new Date(`${selectedSession.date}T${selectedSession.time || "16:00:00Z"}`).getTime()
    : defaultTarget;

  const raceTitle = selectedSession?.name || "GP de Estados Unidos (Austin - COTA)";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-b from-red-950/50 via-zinc-900/90 to-zinc-950 border border-red-900/50 rounded-2xl p-6 text-center text-white shadow-xl shadow-red-950/20 backdrop-blur-md">
      <span className="text-xs uppercase tracking-widest text-red-500 font-extrabold flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        Próximo Gran Premio
      </span>

      <h3 className="text-xl md:text-2xl font-black mt-2 text-white drop-shadow-md">
        {raceTitle}
      </h3>

      <div className="flex justify-center items-center gap-3 md:gap-4 mt-5">
        <div className="bg-zinc-900/80 border border-red-900/40 rounded-xl p-3 min-w-[70px] shadow-inner">
          <span className="block text-2xl md:text-3xl font-black text-white">{timeLeft.days}</span>
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Días</span>
        </div>
        <div className="bg-zinc-900/80 border border-red-900/40 rounded-xl p-3 min-w-[70px] shadow-inner">
          <span className="block text-2xl md:text-3xl font-black text-white">{timeLeft.hours}</span>
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Hs</span>
        </div>
        <div className="bg-zinc-900/80 border border-red-900/40 rounded-xl p-3 min-w-[70px] shadow-inner">
          <span className="block text-2xl md:text-3xl font-black text-white">{timeLeft.minutes}</span>
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Min</span>
        </div>
        <div className="bg-zinc-900/80 border border-red-900/40 rounded-xl p-3 min-w-[70px] shadow-inner">
          <span className="block text-2xl md:text-3xl font-black text-white">{timeLeft.seconds}</span>
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Seg</span>
        </div>
      </div>
    </div>
  );
}