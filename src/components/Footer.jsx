// src/components/Footer.jsx
"use client";

import { scrollToSection } from "../lib/scrollToSection";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer({ onNavigate }) {


  return (
    <footer
      className="site-footer relative py-12 text-white">
      <div className="footer-separator" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-cinzel mb-4 medieval-glow text-accent">INSIGHT 25-26</h3>
            <p className="text-gray-300 medievalsharp">Annual College Cultural & Sports Carnival</p>
          </div>

          <div className="text-left">

            <h4 className="text-lg font-bold mb-4 medievalsharp">Quick Links</h4>

            <ul className="space-y-2">
              {[
                ["Home", "home"],
                ["Points Table", "points"],
                ["Events", "events"],
                ["Gallery", "gallery"],
                ["Team", "team"],
              ].map(([label, id], index) => (
                <li
                  key={id}
                  className="footer-link"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <button
                    onClick={() => onNavigate(id)}
                    className="
        relative
        medievalsharp
        transition-all duration-300 ease-out
        hover:text-accent
        hover:translate-x-1
        focus:outline-none
      "
                  >
                    {/* underline animation */}
                    <span className="relative">
                      {label}
                      <span
                        className="
            absolute left-0 -bottom-0.5
            h-[2px] w-0
            bg-accent
            transition-all duration-300
            group-hover:w-full
          "
                      />
                    </span>
                  </button>
                </li>
              ))}

            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 medievalsharp">Follow Us</h4>
            <div className="flex gap-4">
              <a
  href="https://www.instagram.com/_insight_2025/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-accent hover:text-accent-dark transition-colors"
>
  <Instagram size={24} />
</a>

            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Left: copyright */}
          <div className="text-sm sm:text-base medievalsharp text-left">
            © {new Date().getFullYear()} INSIGHT — All rights reserved.
          </div>

          {/* Right: contacts */}
          <div className="text-[16px] sm:text-base medievalsharp text-left md:text-right space-y-1">
            <div className="opacity-95 font-semibold">Contacts</div>
            <div className="opacity-90">Ansheel Salodkar: 7620416523</div>
            <div className="opacity-90">Peter Salve: 9921336948</div>
            <div className="opacity-90">Simran Bobde: 9545394495</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
