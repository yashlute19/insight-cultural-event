// src/components/Footer.jsx
"use client";

import { Instagram, Youtube, Twitter } from "lucide-react";
import { useRouter } from "next/navigation"; // optional; we use window.location for reliability

export default function Footer() {
  // Robust navigation helper:
  // - if already on the homepage, smooth-scroll to the section id
  // - otherwise, navigate the browser to "/#id" which will load root + jump to fragment
  const jumpTo = (id) => (e) => {
    e.preventDefault();

    // defensive: run only on client
    if (typeof window === "undefined") return;

    const targetPath = "/";

    // If currently on root path, try smooth scroll first
    if (window.location.pathname === targetPath) {
      const el = document.getElementById(id);
      if (el) {
        // close any open mobile nav if it exists (best-effort)
        const mobileMenuBtn = document.querySelector("[data-mobile-menu-button]");
        if (mobileMenuBtn) mobileMenuBtn.click?.();

        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // fallback: set hash so browser will try to jump
      window.location.href = `${targetPath}#${id}`;
      return;
    }

    // Not on root — navigate to root with fragment. Using location.href ensures browser handles the fragment jump.
    // This will load the root page and the browser will jump to the fragment automatically.
    window.location.href = `${targetPath}#${id}`;
  };

  return (
    <footer
      className="site-footer relative py-12 text-white "
      
    >
      <div className="footer-separator" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-cinzel mb-4 medieval-glow text-accent">INSIGHT 25-26</h3>
            <p className="text-gray-300 medievalsharp">Annual College Cultural & Sports Carnival</p>
          </div>

          {/* Quick Links: use onClick handler for robust fragment navigation */}
          <div>
            <h4 className="text-lg font-bold mb-4 medievalsharp">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/#home" onClick={jumpTo("home")} className="hover:text-accent transition-colors medievalsharp">
                  Home
                </a>
              </li>
              <li>
                <a href="/#points" onClick={jumpTo("points")} className="hover:text-accent transition-colors medievalsharp">
                  Points Table
                </a>
              </li>
              <li>
                <a href="/#events" onClick={jumpTo("events")} className="hover:text-accent transition-colors medievalsharp">
                  Events
                </a>
              </li>
              <li>
                <a href="/#gallery" onClick={jumpTo("gallery")} className="hover:text-accent transition-colors medievalsharp">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/#team" onClick={jumpTo("team")} className="hover:text-accent transition-colors medievalsharp">
                  Team
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 medievalsharp">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-accent hover:text-accent-dark transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-accent hover:text-accent-dark transition-colors">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-accent hover:text-accent-dark transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm sm:text-base medievalsharp">
            © {new Date().getFullYear()} INSIGHT — All rights reserved.
          </div>
          <div className="text-sm sm:text-base opacity-95 medievalsharp">• Contact: info@example.com</div>
        </div>
      </div>
    </footer>
  );
}
