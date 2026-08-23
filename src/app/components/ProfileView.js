"use client";

import { useState } from "react";

// LISTA DE PILOTOS CON LAS IMÁGENES PROPORCIONADAS
const DRIVERS = [
  { name: "Max Verstappen", url: "https://i.pinimg.com/736x/f2/45/5d/f2455d801cf28853b068d39259d1bc33.jpg" },
  { name: "Isack Hadjar", url: "https://i.pinimg.com/736x/7e/6d/d4/7e6dd441721bf36cd56f52f014da0767.jpg" },
  { name: "Charles Leclerc", url: "https://i.pinimg.com/736x/ff/70/da/ff70da346ae0a6808c119e00221612e6.jpg" },
  { name: "Lewis Hamilton", url: "https://i.pinimg.com/736x/a5/da/98/a5da98e9247920f6acadd9ed711eb076.jpg" },
  { name: "George Russell", url: "https://i.pinimg.com/1200x/33/5a/43/335a439401a80a106c69ac66837744d5.jpg" },
  { name: "Kimi Antonelli", url: "https://i.pinimg.com/736x/52/16/db/5216dba4d39b37376dd50fc62af77317.jpg" },
  { name: "Lando Norris", url: "https://i.pinimg.com/736x/ff/9f/74/ff9f74d45243e19c85956999292d5649.jpg" },
  { name: "Oscar Piastri", url: "https://i.pinimg.com/736x/06/48/e4/0648e4c9d2ca28bd9dffdfb6bb1d40dc.jpg" },
  { name: "Franco Colapinto", url: "https://i.pinimg.com/736x/32/47/64/3247641d305285e8d803a0035b8095bd.jpg" },
  { name: "Pierre Gasly", url: "https://i.pinimg.com/736x/61/2a/ed/612aedeebaedfa775527a946b9f041c3.jpg" },
  { name: "Fernando Alonso", url: "https://i.pinimg.com/736x/be/c9/68/bec96834616d7e1a240ebcea377fbfc8.jpg" },
  { name: "Lance Stroll", url: "https://i.pinimg.com/736x/bd/25/87/bd25873876630d40fd0fd1fe489bc491.jpg" },
  { name: "Carlos Sainz", url: "https://i.pinimg.com/736x/22/17/e6/2217e6a776e0c14e5e61f023f7eaa859.jpg" },
  { name: "Alexander Albon", url: "https://i.pinimg.com/736x/3f/af/db/3fafdbf67e5a819fcdc3601266c71b31.jpg" },
  { name: "Liam Lawson", url: "https://i.pinimg.com/736x/71/56/11/7156116bef5b3b879342a74fdcb4f5b0.jpg" },
  { name: "Arvid Lindblad", url: "https://i.pinimg.com/736x/69/ca/ce/69caceedebf49b64244c7b3e728351d5.jpg" },
  { name: "Esteban Ocon", url: "https://i.pinimg.com/736x/a9/83/7f/a9837f7f008603b9dfe35c8c0ce80441.jpg" },
  { name: "Oliver Bearman", url: "https://i.pinimg.com/736x/c3/4b/5a/c34b5ab3093b45634e03946089666cce.jpg" },
  { name: "Nico Hülkenberg", url: "https://i.pinimg.com/736x/7d/11/37/7d11377c5fcb81d998b5ce375fd93c29.jpg" },
  { name: "Gabriel Bortoleto", url: "https://i.pinimg.com/736x/4a/fa/a6/4afaa6a555fce8f8d22a6df4b4c00f8b.jpg" },
  { name: "Sergio Pérez", url: "https://i.pinimg.com/736x/53/68/7e/53687e3bf5a8bb2e5675bd56aeaea954.jpg" },
  { name: "Valtteri Bottas", url: "https://i.pinimg.com/736x/d4/3d/d8/d43dd8bd8dea90f051eac51b48163372.jpg" },
];

export default function ProfileView({ userProfile, onSaveProfile, points = 0, coins = 0 }) {
  const [name, setName] = useState(userProfile?.name || "Piloto F1");
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(
    userProfile?.avatarImg || DRIVERS[0].url
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const customBannerUrl = userProfile?.bannerImg || "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80";
  const titlesCount = userProfile?.titles || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (onSaveProfile) {
      onSaveProfile({
        ...userProfile,
        name: name.trim(),
        avatarImg: selectedAvatarUrl,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-zinc-950 border border-red-900/50 rounded-2xl overflow-hidden shadow-xl space-y-6 animate-fade-in">
      {/* BANNER DE CABECERA */}
      <div className="relative h-36 sm:h-48 w-full bg-zinc-900">
        <img
          src={customBannerUrl}
          alt="Banner de perfil"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        {/* AVATAR Y DATOS SOBRE EL BANNER */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="flex items-end gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-600 shadow-xl bg-zinc-900 shrink-0">
              <img
                src={selectedAvatarUrl}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = DRIVERS[0].url;
                }}
              />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-wider shadow-sm">
                {name}
              </h2>
              <p className="text-[10px] sm:text-xs text-red-500 font-mono font-bold">
                Piloto Oficial #PRODE-2026
              </p>
            </div>
          </div>

          {savedSuccess && (
            <span className="text-xs bg-green-950 text-green-400 font-bold px-3 py-1 rounded-lg border border-green-800">
              ✓ Guardado
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6 pt-0">
        {/* PUNTOS, MONEDAS Y TÍTULOS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-black p-3 rounded-xl border border-zinc-800">
            <span className="text-xs text-slate-400 uppercase font-bold block">Puntos</span>
            <span className="text-xl font-black text-red-400 font-mono">{points} pts</span>
          </div>
          <div className="bg-black p-3 rounded-xl border border-zinc-800">
            <span className="text-xs text-slate-400 uppercase font-bold block">Monedas</span>
            <span className="text-xl font-black text-amber-400 font-mono">🪙 {coins}</span>
          </div>
          <div className="bg-black p-3 rounded-xl border border-zinc-800 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-400 uppercase font-bold block">Títulos</span>
            <span className="text-xl font-black text-amber-500 font-mono">{titlesCount} 🏆</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-lg bg-black border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-600"
              placeholder="Escribí tu nombre..."
              required
            />
          </div>

          {/* SELECTOR DE FOTO DE PERFIL / PILOTO FAVORITO */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-3">
              Elegí la foto de tu piloto favorito
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-60 overflow-y-auto p-2 bg-black/50 border border-zinc-900 rounded-2xl">
              {DRIVERS.map((driver) => {
                const isSelected = selectedAvatarUrl === driver.url;
                return (
                  <button
                    key={driver.name}
                    type="button"
                    onClick={() => setSelectedAvatarUrl(driver.url)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all border ${
                      isSelected
                        ? "bg-red-950/40 border-red-600 scale-105 shadow-md shadow-red-900/30"
                        : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full overflow-hidden border ${isSelected ? "border-red-500" : "border-zinc-700"}`}>
                      <img
                        src={driver.url}
                        alt={driver.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-300 font-bold truncate w-full text-center">
                      {driver.name.split(" ")[1] || driver.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition shadow-lg"
          >
            Guardar Perfil
          </button>
        </form>

        {/* VITRINA DE TÍTULOS CONSEGUIDOS */}
        <div className="pt-4 border-t border-zinc-900">
          <h3 className="text-xs font-bold text-slate-300 uppercase mb-3 flex items-center gap-2">
            <span>🏆</span> Vitrina de Títulos Conseguidos
          </h3>
          <div className="bg-black/60 border border-amber-900/30 rounded-2xl p-6 text-center space-y-2">
            <span className="text-3xl block">🏆</span>
            <span className="text-sm font-black text-amber-400 font-mono uppercase tracking-widest block">
              PRÓXIMAMENTE
            </span>
            <p className="text-[11px] text-zinc-500">
              Aquí se desplegarán tus trofeos y medallas ganadas en las ligas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}