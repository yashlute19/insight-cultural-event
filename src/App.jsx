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
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="text-foreground">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === "home" && (
        <div id="home">
          <Hero />
          <About />
          <Footer />
        </div>
      )}

      {activeSection === "points" && (
        // removed bg-black so background video shows through
        <div id="points" className="pt-16 sm:pt-20 min-h-screen">
          <CulturalPointsTable />
          <Footer />
        </div>
      )}

      {activeSection === "events" && (
        <div id="events" className="pt-16 sm:pt-20 min-h-screen">
          <EventsTimeline />
          <Footer />
        </div>
      )}

      {activeSection === "gallery" && (
        <div id="gallery" className="pt-16 sm:pt-20 min-h-screen">
          <Gallery />
          <Footer />
        </div>
      )}

      {activeSection === "team" && (
        <div id="team" className="pt-16 sm:pt-20 min-h-screen">
          <TeamSection />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default App
