"use client";

import { useState } from "react";

export default function StoreView({ coins = 0, setCoins }) {
  const [activeTab, setActiveTab] = useState("objetos"); // 'objetos' | 'juegos'
  const [boughtItems, setBoughtItems] = useState([]);

  const items = [
    { id: "1", title: "Avatar VIP Hamilton", cost: 100, icon: "🏎️", desc: "Foto de perfil exclusiva Ferrari." },
    { id: "2", title: "Insignia Poleman", cost: 150, icon: "⚡", desc: "Medalla dorada en la tabla global." },
    { id: "3", title: "Trazado Dorado Zandvoort", cost: 200, icon: "🇳🇱", desc: "Efecto especial para tu sala de trofeos." },
    { id: "4", title: "Potenciador x2 Puntos", cost: 250, icon: "🚀", desc: "Duplica tus puntos en la próxima carrera." },
  ];

  const handleBuy = (item) => {
    if (coins < item.cost) {
      alert("No tenés suficientes monedas 🪙 para este ítem.");
      return;
    }
    if (setCoins) setCoins(coins - item.cost);
    setBoughtItems([...boughtItems, item.id]);
    alert(`¡Compraste "${item.title}" exitosamente!`);
  };

  return (
    <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-6 shadow-xl space-y-6 animate-fade-in">
      {/* CABECERA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span>🛍️</span> Tienda del Paddock
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Usá tus monedas para desbloquear ventajas, insignias o jugar minijuegos.
          </p>
        </div>
        <div className="bg-amber-950/60 border border-amber-600/50 px-4 py-2 rounded-xl text-amber-300 text-xs font-black flex items-center gap-1.5 self-start sm:self-auto">
          <span>🪙</span> {coins} Monedas
        </div>
      </div>

      {/* PESTAÑAS (NAVEGACIÓN) */}
      <div className="flex gap-3 border-b border-zinc-900 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("objetos")}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center gap-2 ${
            activeTab === "objetos"
              ? "bg-red-900 text-white border border-red-600/50 shadow-md shadow-red-950/50"
              : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
          }`}
        >
          <span>🎒</span> Objetos y Ventajas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("juegos")}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center gap-2 ${
            activeTab === "juegos"
              ? "bg-red-900 text-white border border-red-600/50 shadow-md shadow-red-950/50"
              : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
          }`}
        >
          <span>🎮</span> Juegos
        </button>
      </div>

      {/* PESTAÑA: OBJETOS */}
      {activeTab === "objetos" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const isBought = boughtItems.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-black border border-zinc-800 hover:border-red-900/40 p-4 rounded-xl flex flex-col justify-between space-y-3 transition"
              >
                <div className="space-y-2">
                  <span className="text-3xl block">{item.icon}</span>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>

                <button
                  onClick={() => handleBuy(item)}
                  disabled={isBought || coins < item.cost}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                    isBought
                      ? "bg-zinc-900 text-zinc-500 cursor-default border border-zinc-800"
                      : coins >= item.cost
                      ? "bg-amber-500 hover:bg-amber-400 text-black font-black"
                      : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
                  }`}
                >
                  {isBought ? "Obtenido ✓" : `Canjear • 🪙 ${item.cost}`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* PESTAÑA: JUEGOS (POR AHORA VACÍA) */}
      {activeTab === "juegos" && (
        <div className="bg-black/60 border border-zinc-800 rounded-xl p-10 text-center space-y-3">
          <div className="text-4xl animate-pulse">🎮🏎️</div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Zona de Minijuegos en Construcción
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Próximamente podrás competir en minijuegos de F1 para ganar monedas y premios para el Prode.
          </p>
          <span className="inline-block text-[10px] bg-red-950 text-red-400 border border-red-900/60 px-3 py-1 rounded-full font-mono font-bold uppercase">
            Próximamente
          </span>
        </div>
      )}
    </div>
  );
}