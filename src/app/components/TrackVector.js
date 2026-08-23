"use client";

import { circuitTracks } from "./circuitTracks";

export default function TrackVector({ trackKey, className = "w-12 h-12 text-red-500" }) {
  const track = circuitTracks[trackKey];

  if (!track || !track.path) {
    return <span className="text-xs text-slate-600">N/A</span>;
  }

  return (
    <svg
      viewBox={track.viewBox || "0 0 100 100"}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={track.path} />
    </svg>
  );
}