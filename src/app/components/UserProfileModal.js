"use client";

import Image from "next/image";

export default function UserProfileModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-950 border border-red-900/60 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-600 shadow-md bg-zinc-900 shrink-0">
            <Image
              src={user.avatarImg || "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2022_March_%28cropped%29.jpg"}
              alt={user.name || "Piloto"}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-black text-white uppercase text-base">{user.name}</h3>
            <span className="text-xs text-red-400 font-mono">Posición en Liga: #{user.rank || 1}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-black p-3 rounded-xl border border-zinc-800">
            <span className="text-xs text-slate-400 uppercase block">Puntos</span>
            <span className="text-lg font-black text-red-400 font-mono">{user.points || 0} pts</span>
          </div>

          <div className="bg-black p-3 rounded-xl border border-zinc-800">
            <span className="text-xs text-slate-400 uppercase block">Monedas</span>
            <span className="text-lg font-black text-amber-400 font-mono">🪙 {user.coins || 0}</span>
          </div>
        </div>

      </div>
    </div>
  );
}