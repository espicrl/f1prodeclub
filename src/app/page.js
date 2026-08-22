"use client";

import { useState } from "react";
import Header from "./components/Header";
import GroupManager from "./components/GroupManager";
import CountdownTimer from "./components/CountdownTimer";
import LeagueView from "./components/LeagueView";
import CalendarModal, { RACES_2026 } from "./components/CalendarModal";
import StoreView from "./components/StoreView";
import ProfileView from "./components/ProfileView";
import WelcomeModal from "./components/WelcomeModal";
import { PILOT_AVATARS } from "./components/ProfileModal";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("home");
  const [ligaActiva, setLigaActiva] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState(RACES_2026[0]);

  // ESTADO DE PERFIL DE USUARIO CON OFFSET VERTICAL DE ENCUADRE
  const [userProfile, setUserProfile] = useState({
    name: "Piloto F1",
    avatarImg: PILOT_AVATARS[0].img,
    avatarOffset: 20, // Offset por defecto para centrar la cara
  });

  const [coins] = useState(250);
  const [points] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <WelcomeModal />

      <Header 
        coins={coins} 
        points={points} 
        currentTab={currentTab} 
        onChangeTab={(tab) => setCurrentTab(tab)}
        userProfile={userProfile}
      />

      <main className="max-w-4xl mx-auto p-4 space-y-6 flex-1 w-full">
        {/* PESTAÑA 1: INICIO */}
        {currentTab === "home" && (
          <div className="space-y-6 animate-fade-in">
            <CountdownTimer
              selectedRace={selectedRace}
              onOpenCalendar={() => setIsCalendarOpen(true)}
            />

            <CalendarModal
              isOpen={isCalendarOpen}
              onClose={() => setIsCalendarOpen(false)}
              selectedRaceId={selectedRace.id}
              onSelectRace={(race) => setSelectedRace(race)}
            />
          </div>
        )}

        {/* PESTAÑA 2: LIGAS */}
        {currentTab === "leagues" && (
          <div className="space-y-6 animate-fade-in">
            {!ligaActiva ? (
              <GroupManager onSeleccionarLiga={(liga) => setLigaActiva(liga)} />
            ) : (
              <LeagueView 
                liga={ligaActiva} 
                selectedRace={selectedRace}
                onBack={() => setLigaActiva(null)} 
                currentUserProfile={userProfile}
              />
            )}
          </div>
        )}

        {/* PESTAÑA 3: PERFIL */}
        {currentTab === "profile" && (
          <ProfileView 
            userProfile={userProfile}
            onSaveProfile={(newProfile) => setUserProfile(newProfile)}
            coins={coins}
            points={points}
          />
        )}

        {/* PESTAÑA 4: TIENDA */}
        {currentTab === "store" && (
          <StoreView coins={coins} />
        )}
      </main>
    </div>
  );
}