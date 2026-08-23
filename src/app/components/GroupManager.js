"use client";

import { useState } from "react";

export default function GroupManager() {
  const [groupName, setGroupName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    alert(`Grupo "${groupName}" creado con éxito.`);
    setGroupName("");
  };

  return (
    <div className="bg-zinc-950 border border-red-900/50 p-5 rounded-2xl shadow-xl space-y-4">
      <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
        <span>👥</span> Crear Grupo Privado
      </h3>

      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          placeholder="Nombre del grupo..."
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="flex-1 bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
        />
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition"
        >
          Crear
        </button>
      </form>
    </div>
  );
}