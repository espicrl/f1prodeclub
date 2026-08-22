"use client";

import { useState } from "react";
import ProfileModal, { PILOT_AVATARS } from "./ProfileModal";
import TrackVector from "./TrackVector";

const TROPHY_ROOM = [
  {
    id: "aus-2026",
    raceName: "GP de Australia",
    round: 1,
    trackKey: "australia",
    rewardCoins: 500,
    rewardPoints: 25,
  },
  {
    id: "mon-2026",
    raceName: "GP de Mónaco",
    round: 8,
    trackKey: "monaco",
    rewardCoins: 750,
    rewardPoints: 25,
  },
];

export default function ProfileView({ userProfile, onSaveProfile, coins = 250, points = 131 }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const vOffset = userProfile.avatarOffset !== undefined ? userProfile.avatarOffset : 20;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER DE PERFIL */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="h-32 bg-gradient-to-r from-red-900 via-slate-900 to-amber-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        </div>

        <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-slate-950 border-4 border-slate-900 overflow-hidden shadow-xl shrink-0">
              <img
                src={userProfile.avatarImg || PILOT_AVATARS[0].img}
                alt="Avatar Piloto"
                className="w-full h-full object-cover"
                style={{ objectPosition: `50% ${vOffset}%` }}
              />
            </div>

            <div className="mb-1">
              <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest block">
                Piloto Oficial F1 Prode Club
              </span>
              <h2 className="text-2xl font-black text-white">{userProfile.name}</h2>
              <p className="text-xs text-slate-400 font-mono">ID: #PRODE-2026</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <span>✏️</span> Editar Perfil
          </button>
        </div>
      </div>

      <ProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userProfile={userProfile}
        onSaveProfile={onSaveProfile}
      />

      {/* SALA DE TROFEOS CON TRAZADOS OFICIALES */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <span>🏅</span> Circuitos Ganados (Recompensas)
          </h3>
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            {TROPHY_ROOM.length} Trazados Dorados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TROPHY_ROOM.map((trophy) => (
            <div
              key={trophy.id}
              className="bg-slate-950 border border-amber-500/40 rounded-xl p-4 flex flex-col items-center text-center relative overflow-hidden group hover:border-amber-400 transition"
            >
              <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest mb-2">
                1º Puesto • Ronda {trophy.round}
              </span>

              {/* TRAZADO REAL DORADO */}
              <TrackVector trackKey={trophy.trackKey} className="w-28 h-28 my-1" />

              <h4 className="font-black text-white text-base mb-3">{trophy.raceName}</h4>

              <div className="w-full flex items-center justify-center gap-4 bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <span>🪙</span>
                  <span>+{trophy.rewardCoins}</span>
                </div>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-1 text-white font-bold">
                  <span>🏆</span>
                  <span>+{trophy.rewardPoints} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}