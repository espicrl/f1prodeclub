"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Fecha objetivo: Domingo 23 de Agosto de 2026, 10:00:00 (Hora Argentina)
    const targetDate = new Date("2026-08-23T10:00:00-03:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
        🇳🇱 GP de los Países Bajos • Zandvoort
      </h3>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md">
        <div className="bg-black/80 border border-red-900/50 rounded-xl p-3 text-center shadow-lg">
          <span className="block text-2xl sm:text-3xl font-black text-red-500 font-mono">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">Días</span>
        </div>

        <div className="bg-black/80 border border-red-900/50 rounded-xl p-3 text-center shadow-lg">
          <span className="block text-2xl sm:text-3xl font-black text-red-500 font-mono">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">Hs</span>
        </div>

        <div className="bg-black/80 border border-red-900/50 rounded-xl p-3 text-center shadow-lg">
          <span className="block text-2xl sm:text-3xl font-black text-red-500 font-mono">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">Min</span>
        </div>

        <div className="bg-black/80 border border-red-900/50 rounded-xl p-3 text-center shadow-lg">
          <span className="block text-2xl sm:text-3xl font-black text-red-500 font-mono">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">Seg</span>
        </div>
      </div>
    </div>
  );
}