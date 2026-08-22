import React, { useState, useEffect } from 'react';

export default function App() {
  // Estado de Usuario (Puntos, Trofeos y Monedas desde 0)
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('f1_user_data');
    return saved ? JSON.parse(saved) : {
      id: Date.now(),
      username: "Usuario",
      points: 0,
      trophies: 0,
      coins: 0,
      avatar: "avatar1.png"
    };
  });

  // Lista de Avatares (Sin nombres de pilotos)
  const avatars = [
    { id: 1, img: "/avatars/avatar1.png" },
    { id: 2, img: "/avatars/avatar2.png" },
    { id: 3, img: "/avatars/avatar3.png" },
    { id: 4, img: "/avatars/avatar4.png" }
  ];

  // Estado de Ligas (Sin liga pública por defecto)
  const [leagues, setLeagues] = useState(() => {
    const saved = localStorage.getItem('f1_leagues');
    return saved ? JSON.parse(saved) : [];
  });

  const [leagueName, setLeagueName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [inputCode, setInputCode] = useState('');

  useEffect(() => {
    localStorage.setItem('f1_user_data', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('f1_leagues', JSON.stringify(leagues));
  }, [leagues]);

  // Generar código único para ligas
  const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  // Crear Liga (Pública o Privada)
  const handleCreateLeague = (e) => {
    e.preventDefault();
    if (!leagueName.trim()) return;

    const newLeague = {
      id: Date.now(),
      name: leagueName,
      isPrivate: isPrivate,
      code: isPrivate ? generateCode() : null,
      members: [userData] // Solo entra el usuario que la crea
    };

    setLeagues([...leagues, newLeague]);
    setLeagueName('');
    setIsPrivate(false);
  };

  // Unirse a Liga por Código
  const handleJoinByCode = (e) => {
    e.preventDefault();
    const target = leagues.find(l => l.code === inputCode.trim().toUpperCase());
    if (target) {
      if (!target.members.some(m => m.id === userData.id)) {
        target.members.push(userData);
        setLeagues([...leagues]);
        setInputCode('');
        alert(`Te uniste a la liga: ${target.name}`);
      } else {
        alert("Ya estás en esta liga.");
      }
    } else {
      alert("Código de liga no encontrado.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 font-sans relative pb-10">
      
      {/* TARJETA DEL GP (Responsive fix: Calendario sin encimarse con Sprint) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
          <div>
            <span className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Gran Premio Seleccionado</span>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              🇳🇱 GP de Países Bajos
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <button className="text-xs text-gray-400 hover:text-white transition-colors">
              📅 Ver Calendario →
            </button>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              ⚡ Carrera Sprint
            </span>
          </div>
        </div>

        {/* Contador y Horarios */}
        <div className="grid grid-cols-4 gap-2 text-center bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-4">
          <div><p className="text-lg font-bold">1</p><p className="text-[10px] text-gray-500">DÍAS</p></div>
          <div><p className="text-lg font-bold">7</p><p className="text-[10px] text-gray-500">HS</p></div>
          <div><p className="text-lg font-bold">49</p><p className="text-[10px] text-gray-500">MIN</p></div>
          <div><p className="text-lg font-bold">20</p><p className="text-[10px] text-gray-500">SEG</p></div>
        </div>
      </div>

      {/* SECCIÓN DE AVATARES (Solo imágenes, sin nombres) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold mb-3 text-gray-300">Seleccionar Foto de Perfil</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {avatars.map((avatar) => (
            <div 
              key={avatar.id} 
              onClick={() => setUserData({ ...userData, avatar: avatar.img })}
              className={`cursor-pointer rounded-full p-1 border-2 transition-all ${
                userData.avatar === avatar.img ? 'border-red-500 scale-105' : 'border-transparent'
              }`}
            >
              <img src={avatar.img} alt="Avatar" className="w-14 h-14 rounded-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DE LIGAS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <h3 className="text-lg font-bold mb-4">Gestión de Ligas</h3>
        
        {/* Crear Liga */}
        <form onSubmit={handleCreateLeague} className="flex flex-col gap-3 mb-6">
          <input 
            type="text" 
            placeholder="Nombre de la Liga" 
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm outline-none focus:border-red-500"
          />
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isPrivate} 
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-0"
            />
            Hacer liga privada (requiere código para unirse)
          </label>
          <button type="submit" className="bg-red-600 hover:bg-red-700 font-bold py-2 rounded-lg text-xs uppercase tracking-wider">
            Crear Liga
          </button>
        </form>

        {/* Unirse con Código */}
        <form onSubmit={handleJoinByCode} className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Código Privado" 
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm flex-1 uppercase outline-none focus:border-red-500"
          />
          <button type="submit" className="bg-slate-800 hover:bg-slate-700 font-bold px-4 rounded-lg text-xs">
            Unirse
          </button>
        </form>

        {/* Listado de Ligas del Usuario */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase">Mis Ligas</h4>
          {leagues.length === 0 ? (
            <p className="text-xs text-gray-600">No estás en ninguna liga aún.</p>
          ) : (
            leagues.map((league) => (
              <div key={league.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800/60 flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm">{league.name}</p>
                  <p className="text-[10px] text-gray-500">Miembros: {league.members.length}</p>
                </div>
                {league.isPrivate && (
                  <span className="bg-slate-800 text-gray-300 text-[10px] px-2 py-1 rounded font-mono">
                    Código: {league.code}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* VERSIÓN DEL SITE EN LA ESQUINA INFERIOR */}
      <span className="fixed bottom-2 right-2 text-[10px] text-gray-500 font-mono opacity-60 pointer-events-none z-50">
        f1prodeclub beta version 0.0.0.1
      </span>
    </div>
  );
}