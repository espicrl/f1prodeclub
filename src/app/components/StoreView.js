"use client";

import { useState } from "react";

export default function StoreView({ coins = 0, setCoins }) {
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
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div>
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span>🛍️</span> Tienda del Paddock
          </h2>
          <p className="text-xs text-slate-400 mt-1">Usá tus monedas para desbloquear ventajas e insignias.</p>
        </div>
        <div className="bg-amber-950/60 border border-amber-600/50 px-4 py-2 rounded-xl text-amber-300 text-xs font-black flex items-center gap-1.5">
          <span>🪙</span> {coins} Monedas
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const isBought = boughtItems.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-black border border-zinc-800 p-4 rounded-xl flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-3xl block">{item.icon}</span>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>

              <button
                onClick={() => handleBuy(item)}
                disabled={isBought || coins < item.cost}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase transition ${
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
    </div>
  );
}