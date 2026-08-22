"use client";

import { useState } from "react";
import UserProfileModal from "./UserProfileModal";
import { PILOT_AVATARS } from "./ProfileModal";

// Datos de miembros de la liga con fotos y encuadre
const MOCK_LEAGUE_MEMBERS = [
  { id: "1", name: "Max_Speed", points: 145, coins: 320, avatarImg: PILOT_AVATARS[3].img, avatarOffset: 20 },
  { id: "2", name: "Checo_Fan", points: 132, coins: 210, avatarImg: PILOT_AVATARS[9].img, avatarOffset: 20 },
  { id: "3", name: "Lando43", points: 120, coins: 180, avatarImg: PILOT_AVATARS[4].img, avatarOffset: 20 },
  { id: "4", name: "SmoothOperator", points: 110, coins: 150, avatarImg: PILOT_AVATARS[1].img, avatarOffset: 20 },
];

export default function LeagueView({ liga, selectedRace, onBack, currentUserProfile }) {
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Unimos al usuario actual con los otros miembros de la liga
  const allMembers = [
    {
      id: "current_user",
      name: currentUserProfile.name,
      points: 0,
      coins: 250,
      avatarImg: currentUserProfile.avatarImg || PILOT_AVATARS[0].img,
      avatarOffset: currentUserProfile.avatarOffset !== undefined ? currentUserProfile.avatarOffset : 20,
    },
    ...MOCK_LEAGUE_MEMBERS
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER DE LA LIGA */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
        >
          <span>←</span> Volver
        </button>

        <div className="text-right">
          <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest block">
            Liga Privada
          </span>
          <h2 className="text-lg font-black text-white">{liga.nombre}</h2>
        </div>
      </div>

      {/* TABLA DE POSICIONES CON FOTOS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span>🏆</span> Tabla de Posiciones
          </h3>
          <span className="text-[10px] text-slate-500 font-mono uppercase">
            {allMembers.length} Pilotos
          </span>
        </div>

        <div className="space-y-2">
          {allMembers.map((member, idx) => {
            const vOffset = member.avatarOffset !== undefined ? member.avatarOffset : 20;

            return (
              <div
                key={member.id}
                onClick={() => setSelectedUserForModal(member)}
                className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-red-500/50 transition cursor-pointer flex items-center justify-between gap-3 group"
              >
                {/* POSICIÓN Y FOTO DE PERFIL */}
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs text-slate-500 w-4 text-center">
                    #{idx + 1}
                  </span>

                  {/* FOTO CON ENCUADRE AUSTADO */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-900 group-hover:border-red-500 transition shrink-0">
                    <img
                      src={member.avatarImg}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `50% ${vOffset}%` }}
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-xs group-hover:text-red-400 transition">
                      {member.name}
                    </h4>
                    <span className="text-[9px] text-slate-500 font-mono block">
                      Haz clic para ver perfil
                    </span>
                  </div>
                </div>

                {/* PUNTOS */}
                <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
                  <span className="text-[9px] text-slate-500 uppercase block">Puntos</span>
                  <span className="font-mono font-bold text-xs text-red-400">{member.points} pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL PARA VER EL PERFIL DE OTRO PILOTO */}
      <UserProfileModal
        isOpen={!!selectedUserForModal}
        onClose={() => setSelectedUserForModal(null)}
        targetUser={selectedUserForModal}
      />

    </div>
  );
}