"use client";

import { useState, useEffect } from "react";

export default function GroupManager({ onSeleccionarLiga }) {
  const [tab, setTab] = useState("mis-grupos");
  const [grupos, setGrupos] = useState([]);
  const [nombreNuevoGrupo, setNombreNuevoGrupo] = useState("");
  const [codigoUnirse, setCodigoUnirse] = useState("");
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    try {
      const gruposGuardados = localStorage.getItem("grupos_f1_club");
      if (gruposGuardados) {
        setGrupos(JSON.parse(gruposGuardados));
      } else {
        const grupoGlobal = [
          { id: "GLOBAL", nombre: "Liga Pública F1", codigo: "F1-2026", esAdmin: false, miembros: 142 }
        ];
        setGrupos(grupoGlobal);
        localStorage.setItem("grupos_f1_club", JSON.stringify(grupoGlobal));
      }
    } catch (e) {
      console.error("Error al cargar grupos:", e);
    }
  }, []);

  const guardarGruposEnStorage = (nuevosGrupos) => {
    setGrupos(nuevosGrupos);
    localStorage.setItem("grupos_f1_club", JSON.stringify(nuevosGrupos));
  };

  const generarCodigo = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let resultado = "F1-";
    for (let i = 0; i < 4; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
  };

  const handleCrearGrupo = (e) => {
    e.preventDefault();
    if (!nombreNuevoGrupo.trim()) return;

    const nuevoGrupo = {
      id: Date.now().toString(),
      nombre: nombreNuevoGrupo.trim(),
      codigo: generarCodigo(),
      esAdmin: true,
      miembros: 1,
    };

    const listaActualizada = [...grupos, nuevoGrupo];
    guardarGruposEnStorage(listaActualizada);
    setNombreNuevoGrupo("");
    setMensaje({ tipo: "exito", texto: `¡Liga "${nuevoGrupo.nombre}" creada con éxito!` });
    setTimeout(() => {
      setMensaje({ tipo: "", texto: "" });
      if (onSeleccionarLiga) onSeleccionarLiga(nuevoGrupo);
    }, 1000);
  };

  const handleUnirseGrupo = (e) => {
    e.preventDefault();
    const codigoClean = codigoUnirse.trim().toUpperCase();
    if (!codigoClean) return;

    const grupoExistente = grupos.find((g) => g.codigo === codigoClean);
    if (grupoExistente) {
      if (onSeleccionarLiga) onSeleccionarLiga(grupoExistente);
      return;
    }

    const nuevoGrupo = {
      id: Date.now().toString(),
      nombre: `Liga ${codigoClean}`,
      codigo: codigoClean,
      esAdmin: false,
      miembros: Math.floor(Math.random() * 8) + 2,
    };

    const listaActualizada = [...grupos, nuevoGrupo];
    guardarGruposEnStorage(listaActualizada);
    setCodigoUnirse("");
    setMensaje({ tipo: "exito", texto: "¡Te uniste a la liga correctamente!" });
    setTimeout(() => {
      setMensaje({ tipo: "", texto: "" });
      if (onSeleccionarLiga) onSeleccionarLiga(nuevoGrupo);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
            🏆 Mis Ligas
          </h2>
          <p className="text-xs text-slate-400">Entrá a una liga para ingresar tus pronósticos</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setTab("mis-grupos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === "mis-grupos" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Ligas
          </button>
          <button
            onClick={() => setTab("crear")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === "crear" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            + Crear
          </button>
          <button
            onClick={() => setTab("unirse")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === "unirse" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            🔗 Unirse
          </button>
        </div>
      </div>

      {mensaje.texto && (
        <div
          className={`p-3 rounded-xl text-xs font-bold text-center animate-fade-in ${
            mensaje.tipo === "exito"
              ? "bg-green-950/80 text-green-400 border border-green-800"
              : "bg-red-950/80 text-red-400 border border-red-800"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {tab === "mis-grupos" && (
        <div className="space-y-3">
          {grupos.length === 0 ? (
            <p className="text-slate-500 text-center py-6 text-sm">No estás en ninguna liga aún.</p>
          ) : (
            grupos.map((grupo) => (
              <div
                key={grupo.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{grupo.nombre}</h3>
                    {grupo.esAdmin && (
                      <span className="bg-red-950 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-800">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">👥 {grupo.miembros} miembros</p>
                </div>

                <button
                  onClick={() => onSeleccionarLiga && onSeleccionarLiga(grupo)}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md flex items-center gap-1"
                >
                  Pronosticar →
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "crear" && (
        <form onSubmit={handleCrearGrupo} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
              Nombre de tu Liga
            </label>
            <input
              type="text"
              placeholder="Ej: F1 Amigos de la Facu"
              value={nombreNuevoGrupo}
              onChange={(e) => setNombreNuevoGrupo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 text-sm focus:border-red-500 focus:outline-none transition"
              maxLength={30}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg"
          >
            Crear e Ingresar
          </button>
        </form>
      )}

      {tab === "unirse" && (
        <form onSubmit={handleUnirseGrupo} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
              Código de la Liga
            </label>
            <input
              type="text"
              placeholder="Ej: F1-A8K2"
              value={codigoUnirse}
              onChange={(e) => setCodigoUnirse(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 text-sm font-mono uppercase focus:border-red-500 focus:outline-none transition"
              maxLength={10}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition border border-slate-700"
          >
            Unirme e Ingresar
          </button>
        </form>
      )}
    </div>
  );
}