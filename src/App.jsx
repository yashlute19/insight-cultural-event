"use client"

import Loader from "./components/Loader";
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
  const [isLoading, setIsLoading] = useState(false);


  const navigateTo = (id) => {
    if (id === activeSection) return;

    setIsLoading(true);

    // let loader render
    requestAnimationFrame(() => {
      setTimeout(() => {
        setActiveSection(id);
        window.scrollTo({ top: 0 });

        // hide loader after section mounts
        setTimeout(() => {
          setIsLoading(false);
        }, 350);
      }, 200);
    });
  };

  return (
    <>
      {isLoading && <Loader />}
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
