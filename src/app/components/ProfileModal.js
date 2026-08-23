"use client";

export default function ProfileModal({ isOpen, onClose, userProfile, onSave }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border border-red-900/60 rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <h3 className="text-sm font-black text-white uppercase">Editar Perfil</h3>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-xs text-slate-400">Podés actualizar tu perfil desde la pestaña Perfil.</p>
        <button
          onClick={onClose}
          className="w-full bg-red-700 text-white font-bold text-xs uppercase py-2.5 rounded-xl"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}