"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/**
 * Navbar — fixed + highlights active section based on scroll.
 * Fixes:
 *  - imports useEffect (avoids "useEffect is not defined")
 *  - marks component "use client" for Next.js app router
 *  - safe guards for window when SSR
 *  - smooth scroll on click and updates activeSection on scroll
 */

export default function Navbar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Points Table ", id: "points" },
    { label: "Events", id: "events" },
    { label: "Gallery", id: "gallery" },
    { label: "Team", id: "team" },
  ];

  // Scroll-to-section when a nav item is clicked
  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);

    // Slight delay so mobile menu can close first (layout shift)
    setTimeout(() => {
      if (typeof window === "undefined") return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  // Update activeSection based on scroll position (runs on client)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = null;
    let timeout = null;

    const sections = ["home", "points", "events", "gallery", "team"];

    const check = () => {
      let current = "home";
      const targetLine = 160; // px from top to consider as "in view"

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetLine && rect.bottom >= 120) {
          current = sec;
          break;
        }
      }

      // Only update if changed
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);

      // also throttle fallback
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        check();
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once initially to set state correctly
    check();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Row: logo at far left, nav pushed to the right */}
        <div className="flex items-center h-16 sm:h-20 w-full">
          {/* LOGO */}
          <div className="flex items-center gap-2 text-white font-bold carnival-font drop-shadow-lg flex-none">
            <img
              src="/logo.webp"
              alt="INSIGHT Logo"
              className="h-8 sm:h-14 w-auto drop-shadow-lg hover:scale-105 transition-transform"
            />
            <span className="text-lg sm:text-2xl font-cinzel">INSIGHT 25–26</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-10 items-center pr-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`cursor-pointer transition-all font-cinzel duration-300 font-semibold text-base sm:text-lg drop-shadow-md ${
                    activeSection === item.id ? "text-accent scale-110" : "text-white hover:text-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white p-2 drop-shadow-lg" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (collapsible) */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-white/10 navbar-glass-mobile">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-2 rounded font-cinzel transition-all text-white hover:bg-white/10 bg-transparent"
              >
                {activeSection === item.id ? (
                  <span className="medieval-glow inline-block px-1">{item.label}</span>
                ) : (
                  <span>{item.label}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
