"use client";

import { useState, useEffect } from "react";

// Lista de fotos de perfil proporcionadas con sus nombres reales
export const PILOT_AVATARS = [
  { id: "leclerc", name: "Charles Leclerc", img: "https://i.pinimg.com/736x/61/2a/ed/612aedeebaedfa775527a946b9f041c3.jpg" },
  { id: "sainz", name: "Carlos Sainz", img: "https://i.pinimg.com/736x/32/47/64/3247641d305285e8d803a0035b8095bd.jpg" },
  { id: "hamilton", name: "Lewis Hamilton", img: "https://i.pinimg.com/736x/71/56/11/7156116bef5b3b879342a74fdcb4f5b0.jpg" },
  { id: "verstappen", name: "Max Verstappen", img: "https://i.pinimg.com/736x/d9/a2/6e/d9a26e6d3f42bfca04fb1f79acbea908.jpg" },
  { id: "norris", name: "Lando Norris", img: "https://i.pinimg.com/1200x/ab/ed/45/abed4587e6d7dc8e86679ba0f3ecb1bd.jpg" },
  { id: "piastri", name: "Oscar Piastri", img: "https://i.pinimg.com/1200x/4a/50/6d/4a506d7f550acd0fb7ee418796807d0e.jpg" },
  { id: "russell", name: "George Russell", img: "https://i.pinimg.com/736x/06/48/e4/0648e4c9d2ca28bd9dffdfb6bb1d40dc.jpg" },
  { id: "alonso", name: "Fernando Alonso", img: "https://i.pinimg.com/1200x/fa/ae/2e/faae2ef1e8a50e8ec0cef1e57015ff8f.jpg" },
  { id: "stroll", name: "Lance Stroll", img: "https://i.pinimg.com/736x/2f/2a/bb/2f2abbf7c9a04fe7bb1216bc71a251ca.jpg" },
  { id: "perez", name: "Sergio Pérez", img: "https://i.pinimg.com/736x/07/b4/71/07b4718804c58dff357731f0ae5356e5.jpg" },
  { id: "ricciardo", name: "Daniel Ricciardo", img: "https://i.pinimg.com/736x/a5/da/98/a5da98e9247920f6acadd9ed711eb076.jpg" },
];

// Buscamos el objeto del piloto seleccionado para obtener su nombre si solo tenemos la URL
const getPilotNameFromImg = (imgUrl) => {
  const pilot = PILOT_AVATARS.find(p => p.img === imgUrl);
  return pilot ? pilot.name : "Piloto F1";
};

export default function ProfileModal({ isOpen, onClose, userProfile, onSaveProfile }) {
  const [username, setUsername] = useState(userProfile.name || "Piloto F1");
  const [selectedImg, setSelectedImg] = useState(
    userProfile.avatarImg || PILOT_AVATARS[0].img
  );
  
  // NUEVO ESTADO: Offset vertical (0% = arriba, 100% = abajo, por defecto 20% para la mayoría de caras)
  const [verticalOffset, setVerticalOffset] = useState(
    userProfile.avatarOffset !== undefined ? userProfile.avatarOffset : 20
  );

  // Cada vez que seleccionamos un piloto nuevo, reseteamos el offset a 20% 
  // (a menos que ya lo estuviéramos editando y tuviera otro valor guardado)
  useEffect(() => {
    if (userProfile.avatarImg !== selectedImg) {
      setVerticalOffset(20);
    }
  }, [selectedImg, userProfile.avatarImg]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    // GUARDAMOS TAMBIÉN EL OFFSET SELECCIONADO
    onSaveProfile({ 
      name: username.trim(), 
      avatarImg: selectedImg,
      avatarOffset: verticalOffset // <-- Importante guardar esto
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
        
        {/* CABECERA */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            👤 Editar Perfil de Piloto
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* COLUMNA IZQUIERDA: PREVISUALIZACIÓN Y AJUSTE */}
            <div className="flex flex-col items-center gap-4 w-full md:w-2/5 shrink-0">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider self-start">
                Tu Avatar Actual
              </label>
              
              {/* CONTENEDOR CIRCULAR DE PREVISUALIZACIÓN */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-600 bg-slate-950 shadow-xl">
                <img
                  src={selectedImg}
                  alt="Previsualización Avatar"
                  // APLICAMOS EL OFFSET VERTICAL DINÁMICAMENTE
                  className="w-full h-full object-cover"
                  style={{ objectPosition: `50% ${verticalOffset}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono text-center">
                {getPilotNameFromImg(selectedImg)}
              </p>

              {/* CONTROL DE AJUSTE VERTICAL (SLIDER) */}
              <div className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 mt-2">
                <label htmlFor="verticalOffset" className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-1.5">
                  <span>↕️</span> Ajuste Vertical de Cara
                </label>
                <input
                  type="range"
                  id="verticalOffset"
                  min="0"
                  max="100"
                  value={verticalOffset}
                  onChange={(e) => setVerticalOffset(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[9px] text-slate-600 font-mono mt-1">
                  <span>Arriba</span>
                  <span>Abajo</span>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: NOMBRE Y GALERÍA */}
            <div className="flex-1 space-y-5">
              {/* NOMBRE DE USUARIO */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={20}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-red-500 transition"
                  required
                />
              </div>

              {/* GALERÍA DE AVATARES DE PILOTOS */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Selecciona otro Piloto
                </label>
                <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1 bg-slate-950/50 rounded-xl border border-slate-800">
                  {PILOT_AVATARS.map((pilot) => {
                    const isSelected = selectedImg === pilot.img;
                    return (
                      <button
                        type="button"
                        key={pilot.id}
                        onClick={() => setSelectedImg(pilot.img)}
                        title={pilot.name}
                        className={`p-1.5 rounded-lg border flex flex-col items-center justify-center transition relative overflow-hidden ${
                          isSelected
                            ? "bg-red-950/60 border-red-500 scale-105 ring-2 ring-red-500"
                            : "bg-slate-950 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {/* MINIATURA FOTO CON ENCUADRE POR DEFECTO (20%) */}
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-800 bg-slate-900 mb-1">
                          <img
                            src={pilot.img}
                            alt={pilot.name}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: `50% 20%` }}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-white text-center leading-tight truncate w-full">
                          {pilot.name.split(' ')[1] || pilot.name} {/* Solo apellido si es largo */}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 flex gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2.5 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-lg shadow-red-950/50"
            >
              Guardar Cambios y Encuadre
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}