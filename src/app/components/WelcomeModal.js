"use client";

export default function WelcomeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-950 border border-red-900/60 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* CABECERA */}
        <div className="text-center space-y-2">
          <span className="text-3xl">🏎️</span>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            ¡Bienvenido a <span className="text-red-600">F1 Prode Club</span>!
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            La plataforma definitiva para competir con tus amigos en cada Gran Premio.
          </p>
        </div>

        {/* CONTENIDO Y CARACTERÍSTICAS */}
        <div className="space-y-4">
          
          {/* Ligas y Pronósticos */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <span className="text-xl shrink-0">🏆</span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase">Ligas & Pronósticos</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Crea tus propias ligas privadas, invita a tus amigos con un código y predice el podio antes de cada carrera.
              </p>
            </div>
          </div>

          {/* Sistema de Puntos */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <span className="text-xl shrink-0">📊</span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase">Sistema de Puntos</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Acierta las posiciones del Top 3 para sumar puntos oficiales y escalar posiciones en la tabla general.
              </p>
            </div>
          </div>

          {/* Tienda */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <span className="text-xl shrink-0">🛍️</span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
                Tienda <span className="text-[9px] bg-amber-950 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-800">Próximamente</span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Canjea tus monedas obtenidas por recompensas exclusivas, cascos y personalizaciones.
              </p>
            </div>
          </div>

          {/* Juegos y Noticias */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-amber-900/40 flex items-start gap-3">
            <span className="text-xl shrink-0">🎮</span>
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase flex items-center gap-2">
                Juegos y Noticias <span className="text-[9px] bg-amber-950 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-800">Próximamente</span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Minijuegos interactivos de F1 y el feed de noticias de la categoría en tiempo real.
              </p>
            </div>
          </div>

        </div>

        {/* BOTÓN DE INICIO */}
        <button
          onClick={onClose}
          className="w-full bg-red-700 hover:bg-red-600 text-white font-black text-xs uppercase py-3.5 rounded-xl transition shadow-lg shadow-red-950 tracking-wider"
        >
          ¡Entendido, a correr! 🏁
        </button>

      </div>
    </div>
  );
}