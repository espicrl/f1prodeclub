// src/app/components/TrackVector.js
"use client";

import { circuitTracks } from "./circuitTracks";

export default function TrackVector({ trackKey, className = "", isGold = false }) {
  const track = circuitTracks[trackKey];

  if (!track) return null;

  // Cálculo de posición sobre el afiche
  const posX = (track.col / 3) * 100;
  const posY = 23.5 + (track.row / 5) * 71.5;

  return (
    <div
      className={`inline-block shrink-0 bg-no-repeat transition-all duration-300 ${className}`}
      style={{
        width: "90px",
        height: "65px",
        backgroundImage: "url('/f1-2026-poster.jpg')",
        backgroundSize: "440% 900%",
        backgroundPosition: `${posX}% ${posY}%`,
        filter: isGold
          ? "drop-shadow(0px 0px 8px rgba(234, 179, 8, 0.9)) brightness(1.2)"
          : "none",
      }}
    />
  );
}