"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Aftermovie from "./components/Aftermovie"
import Footer from "./components/Footer"
import CulturalPointsTable from "./components/CulturalPointsTable"
import EventsTimeline from "./components/Events"
import Gallery from "./components/Gallery"
import TeamSection from "./components/TeamSection"

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const navigateTo = (id) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        setActiveSection={navigateTo}
      />

      {activeSection === "home" && (
        <>
          <Hero />
          <About />
          <Footer onNavigate={navigateTo} />
        </>
      )}

      {activeSection === "points" && (
        <>
          <CulturalPointsTable />
          <Footer onNavigate={navigateTo} />
        </>
      )}

      {activeSection === "events" && (
        <>
          <EventsTimeline />
          <Footer onNavigate={navigateTo} />
        </>
      )}

      {activeSection === "gallery" && (
        <>
          <Gallery />
          <Footer onNavigate={navigateTo} />
        </>
      )}

      {activeSection === "team" && (
        <>
          <TeamSection />
          <Footer onNavigate={navigateTo} />
        </>
      )}
    </>
  );
}

export default App
