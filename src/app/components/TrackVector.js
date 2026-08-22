"use client";

// Siluetas oficiales exactas de Wikimedia
const CIRCUIT_TRACKS = {
  australia: {
    name: "GP de Australia",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Albert_Park_Circuit_2021.svg",
  },
  monaco: {
    name: "GP de Mónaco",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Circuit_Monaco.svg",
  },
  austria: {
    name: "GP de Austria",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/Red_Bull_Ring.svg",
  },
  silverstone: {
    name: "GP de Gran Bretaña",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Silverstone_Circuit_2011.svg",
  },
  monza: {
    name: "GP de Italia",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Autodromo_Nazionale_Monza_pg.svg",
  },
  spa: {
    name: "GP de Bélgica",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/Circuit_Spa-Francorchamps.svg",
  }
};

export default function TrackVector({ trackKey = "monaco", className = "w-24 h-24" }) {
  const track = CIRCUIT_TRACKS[trackKey] || CIRCUIT_TRACKS.monaco;

  return (
    <div className={`relative flex items-center justify-center p-2 ${className}`}>
      <img
        src={track.imgUrl}
        alt={track.name}
        className="w-full h-full object-contain filter transition-transform duration-300 hover:scale-105"
        style={{
          filter: "invert(78%) sepia(82%) saturate(490%) hue-rotate(355deg) brightness(102%) contrast(102%) drop-shadow(0px 0px 8px rgba(251, 191, 36, 0.8))"
        }}
      />
    </div>
  );
}