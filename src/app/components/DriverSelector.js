"use client";

import { useState, useEffect } from "react";

// --- LISTA DE PILOTOS ACTUALIZADA ---
const PILOTOS = [
  // RED BULL
  { id: "VER", nombre: "Max Verstappen", escuderia: "Red Bull", num: 1, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png" },
  { id: "LAW", nombre: "Liam Lawson", escuderia: "Red Bull", num: 30, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png" },
  
  // MCLAREN
  { id: "NOR", nombre: "Lando Norris", escuderia: "McLaren", num: 4, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png" },
  { id: "PIA", nombre: "Oscar Piastri", escuderia: "McLaren", num: 81, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png" },
  
  // FERRARI
  { id: "LEC", nombre: "Charles Leclerc", escuderia: "Ferrari", num: 16, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png" },
  { id: "HAM", nombre: "Lewis Hamilton", escuderia: "Ferrari", num: 44, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png" },
  
  // MERCEDES
  { id: "RUS", nombre: "George Russell", escuderia: "Mercedes", num: 63, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png" },
  { id: "ANT", nombre: "Kimi Antonelli", escuderia: "Mercedes", num: 12, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KIMANT01_Kimi_Antonelli/kimant01.png" },
  
  // ASTON MARTIN
  { id: "ALO", nombre: "Fernando Alonso", escuderia: "Aston Martin", num: 14, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png" },
  { id: "STR", nombre: "Lance Stroll", escuderia: "Aston Martin", num: 18, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png" },
  
  // ALPINE
  { id: "GAS", nombre: "Pierre Gasly", escuderia: "Alpine", num: 10, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png" },
  { id: "COL", nombre: "Franco Colapinto", escuderia: "Alpine", num: 43, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png" },
  
  // RACING BULLS (RB)
  { id: "TSU", nombre: "Yuki Tsunoda", escuderia: "RB", num: 22, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png" },
  { id: "LIN", nombre: "Arvid Lindblad", escuderia: "RB", num: 15, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ARVLIN01_Arvid_Lindblad/arvlin01.png" },
  
  // WILLIAMS
  { id: "ALB", nombre: "Alexander Albon", escuderia: "Williams", num: 23, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png" },
  { id: "SAI", nombre: "Carlos Sainz", escuderia: "Williams", num: 55, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png" },
  
  // SAUBER
  { id: "HUL", nombre: "Nico Hulkenberg", escuderia: "Sauber", num: 27, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png" },
  { id: "BOR", nombre: "Gabriel Bortoleto", escuderia: "Sauber", num: 5, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png" },
  
  // HAAS
  { id: "OCO", nombre: "Esteban Ocon", escuderia: "Haas", num: 31, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png" },
  { id: "BEA", nombre: "Oliver Bearman", escuderia: "Haas", num: 87, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png" },
  
  // CADILLAC F1 TEAM
  { id: "PER", nombre: "Sergio Pérez", escuderia: "Cadillac", num: 11, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png" },
  { id: "BOT", nombre: "Valtteri Bottas", escuderia: "Cadillac", num: 77, foto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png" },
];

export default function DriverSelector({ idLiga, onGuardadoExitoso }) {
  const [pole, setPole] = useState("");
  const [podio, setPodio] = useState({ p1: "", p2: "", p3: "" });
  const [dnfs, setDnfs] = useState({ dnf1: "", dnf2: "", dnf3: "" });
  const [guardadoStatus, setGuardadoStatus] = useState("ideal");

  const obtenerPiloto = (id) => PILOTOS.find((p) => p.id === id);

  useEffect(() => {
    try {
      const prediccionGuardada = localStorage.getItem(`prediccion_f1_${idLiga || "global"}`);
      if (prediccionGuardada) {
        const datos = JSON.parse(prediccionGuardada);
        if (datos.pole) setPole(datos.pole);
        if (datos.podio) setPodio(datos.podio);
        if (datos.dnfs) setDnfs(datos.dnfs);
      }
    } catch (e) {
      console.error("Error al cargar localStorage:", e);
    }
  }, [idLiga]);

  const handleGuardarPrediccion = async () => {
    setGuardadoStatus("guardando");

    try {
      const datosAGuardar = {
        pole,
        podio,
        dnfs,
        fechaActualizacion: new Date().toISOString(),
      };

      localStorage.setItem(`prediccion_f1_${idLiga || "global"}`, JSON.stringify(datosAGuardar));

      setTimeout(() => {
        setGuardadoStatus("exito");
        setTimeout(() => {
          setGuardadoStatus("ideal");
          if (onGuardadoExitoso) onGuardadoExitoso();
        }, 1500);
      }, 500);
    } catch (error) {
      console.error("Error al guardar la predicción:", error);
      setGuardadoStatus("error");
      setTimeout(() => setGuardadoStatus("ideal"), 4000);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-950/20 rounded-full blur-3xl -z-10" />

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-red-500 uppercase tracking-wide flex items-center gap-2">
          🎯 <span className="text-white">Tu Predicción -</span> GP Países Bajos
        </h2>
      </div>

      {/* POLE POSITION */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
        <label className="block text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">
          ⚡ Pole Position (Sábado)
        </label>
        <select
          value={pole}
          onChange={(e) => setPole(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 text-sm focus:border-red-500 focus:outline-none mb-3 transition"
        >
          <option value="">Seleccionar piloto...</option>
          {PILOTOS.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.num} {p.nombre} ({p.escuderia})
            </option>
          ))}
        </select>

        {pole && (
          <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-red-500/30 animate-fade-in">
            <img src={obtenerPiloto(pole)?.foto} alt={pole} className="w-16 h-16 object-cover bg-slate-800 rounded-lg shadow-md" />
            <div>
              <p className="font-bold text-white text-base">{obtenerPiloto(pole)?.nombre}</p>
              <p className="text-xs text-red-400 font-medium">{obtenerPiloto(pole)?.escuderia}</p>
            </div>
          </div>
        )}
      </div>

      {/* PODIO */}
      <div>
        <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">🏆 Podio de Carrera</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["p1", "p2", "p3"].map((pos, idx) => {
            const pSel = obtenerPiloto(podio[pos]);
            const borderColors = ["border-yellow-500/50", "border-slate-400/50", "border-orange-700/50"];

            const pilotosDisponibles = PILOTOS.filter((p) => {
              if (p.id === podio[pos]) return true;
              return !Object.values(podio).includes(p.id);
            });

            return (
              <div key={pos} className={`bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner ${pSel ? borderColors[idx] : ""}`}>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  {idx + 1}° Puesto
                </label>
                <select
                  value={podio[pos]}
                  onChange={(e) => setPodio({ ...podio, [pos]: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 text-sm focus:border-red-500 focus:outline-none mb-3"
                >
                  <option value="">Seleccionar...</option>
                  {pilotosDisponibles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>

                {pSel && (
                  <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-lg animate-fade-in">
                    <img src={pSel.foto} alt={pSel.nombre} className="w-12 h-12 object-cover bg-slate-800 rounded-lg" />
                    <div>
                      <p className="font-bold text-xs">{pSel.nombre}</p>
                      <p className="text-[10px] text-slate-400">{pSel.escuderia}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ABANDONOS */}
      <div className="bg-slate-950 p-4 rounded-xl border border-red-900/30">
        <h3 className="text-xs font-bold uppercase text-red-400 mb-3 tracking-wider flex items-center gap-2">
          ⚠️ <span className="text-slate-200">Predicción de</span> 3 Abandonos (DNF)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["dnf1", "dnf2", "dnf3"].map((key, idx) => {
            const dnfSel = obtenerPiloto(dnfs[key]);

            const pilotosDisponibles = PILOTOS.filter((p) => {
              if (p.id === dnfs[key]) return true;
              return !Object.values(dnfs).includes(p.id);
            });

            return (
              <div key={key}>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                  Abandono {idx + 1}
                </label>
                <select
                  value={dnfs[key]}
                  onChange={(e) => setDnfs({ ...dnfs, [key]: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 text-xs focus:border-red-500 focus:outline-none mb-2"
                >
                  <option value="">Seleccionar piloto...</option>
                  {pilotosDisponibles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>

                {dnfSel && (
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg animate-fade-in">
                    <img src={dnfSel.foto} alt={dnfSel.nombre} className="w-10 h-10 object-cover bg-slate-800 rounded-lg" />
                    <span className="text-xs font-bold text-white">{dnfSel.nombre}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTÓN GUARDAR */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleGuardarPrediccion}
          disabled={guardadoStatus === "guardando"}
          className={`w-full text-white font-bold py-4 rounded-xl transition duration-150 shadow-lg flex items-center justify-center gap-3 cursor-pointer ${
            guardadoStatus === "exito"
              ? "bg-green-600 hover:bg-green-500"
              : guardadoStatus === "error"
              ? "bg-amber-600 hover:bg-amber-500"
              : guardadoStatus === "guardando"
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {guardadoStatus === "guardando" && (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
          )}
          {guardadoStatus === "ideal" && "Enviar Predicción"}
          {guardadoStatus === "guardando" && "Guardando..."}
          {guardadoStatus === "exito" && "✅ ¡Predicción Guardada con éxito!"}
          {guardadoStatus === "error" && "⚠️ Error al guardar. Reintenta."}
        </button>
      </div>
    </div>
  );
}