"use client";

export default function DriverSelector({ drivers = [], value, onChange, label = "Piloto" }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-xs font-bold text-red-400 block uppercase">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-red-600"
      >
        <option value="">Seleccionar Piloto...</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name} ({driver.team})
          </option>
        ))}
      </select>
    </div>
  );
}