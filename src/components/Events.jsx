"use client";

import { useState, useEffect } from "react";
import { events } from "../data/eventsData"; // your events data
import EventModal from "./EventModal"; // adjust import path if needed

// return a numeric timestamp for an event (date + optional time) — safe parsing
function getEventTimestamp(ev) {
  const d = parseISODate(ev.date); // you already have parseISODate in this file
  if (!d) return 0;
  if (ev.time) {
    const tMatch = String(ev.time).match(/^(\d{1,2}):(\d{2})/);
    if (tMatch) {
      const hh = Number(tMatch[1]);
      const mm = Number(tMatch[2]);
      d.setHours(hh, mm, 0, 0);
    }
  }
  return d.getTime();
}

// sort by timestamp ascending (earliest first)
const sortedEvents = [...events].sort((a, b) => getEventTimestamp(a) - getEventTimestamp(b));

// safe date helpers — paste near the top of Events.jsx under imports
function parseISODate(dateStr) {
  // Accepts 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm...' — returns a Date at local midnight
  if (!dateStr) return null;

  // If it's an ISO full datetime, let Date handle it
  if (dateStr.includes("T")) {
    const d = new Date(dateStr);
    return isFinite(d) ? d : null;
  }

  // Otherwise parse YYYY-MM-DD manually to avoid timezone shifts
  const m = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return null;
  const [, yy, mm, dd] = m;
  // create local date at midnight
  const d = new Date(Number(yy), Number(mm) - 1, Number(dd));
  return isFinite(d) ? d : null;
}

function formatDateDDMMYYYY(dateStr) {
  const d = parseISODate(dateStr);
  if (!d) return "Date TBD";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`; // e.g. 20-12-2025
}

// Optional nicer format: 20 Dec 2025
function formatDatePretty(dateStr) {
  const d = parseISODate(dateStr);
  if (!d) return "Date TBD";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}


export default function Events() {
  const [open, setOpen] = useState(null); // event id or null
  useEffect(() => {
    console.log("Events imported:", events);
    const ids = events.map(e => e.id);
    const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupIds.length) console.warn("Duplicate ids in runtime events:", [...new Set(dupIds)]);
    const titles = events.map(e => (e.title || e.name || "").toString().trim().toLowerCase());
    const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
    if (dupTitles.length) console.warn("Duplicate titles in runtime events:", [...new Set(dupTitles)]);
    console.log("events.length =", events.length);
  }, []);


  useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="events" className="py-16 bg-transparent px-4">
      <div className="max-w-6xl mx-auto  text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl medievalsharp text-center mb-12 medieval-glow font-bold">
          Events Timeline
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* center vertical line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-700 transform -translate-x-1/2 z-20"
          />

          {/* list */}
          <ul className="space-y-8 mobile-timeline-rail md:space-y-12">

            {sortedEvents.map((ev, idx) => {

              const isLeft = idx % 2 === 0;

              return (
                <li key={ev.id} className="relative">
                  {/* ===== MOBILE ROW: left rail (dot + date/time) + right card ===== */}
                  <div className="flex items-start gap-4 md:hidden px-2 ">
                    {/* Left rail cell */}
                    <div className="left-rail-cell">
                      {/* dot (ensure it sits above the rail) */}
                      <div className="left-rail-dot w-4 h-4 rounded-full bg-accent border-2 border-neutral-900 timeline-dot-blink" />
                      {/* date/time under dot - same style as desktop */}
                      <div className="mt-2 text-[13px] text-[#2bd522] medievalsharp medieval-glow tracking-wide text-center">
                        <div className="font-bold drop-shadow-lg ">
                          {formatDateDDMMYYYY(ev.date)}
                        </div>
                        <div className="text-[11px] text-[#2bd522] medieval-glow font-bold medievalsharp italic">
                          {ev.time}
                        </div>
                      </div>
                    </div>

                    {/* Right cell: card + connector */}
                    <div className="flex-1 relative">
                      {/* connector line from left rail to card */}
                      <div
                        className="mobile-connector absolute left-0 top-6 -translate-x-1/2"
                        aria-hidden="true"
                      />
                      <div className="pl-4">
                        <EventCard ev={ev} onOpen={() => setOpen(ev.id)} />
                      </div>
                    </div>
                  </div>


                  {/* ===== DESKTOP ROW: original alternating layout (kept) ===== */}
                  <div className="hidden md:flex flex-col md:flex-row items-center md:items-stretch">
                    {/* center dot + date/time (desktop only) */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -top-2 flex-col items-center z-30">
                      <div
                        className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent border-2 border-neutral-900 timeline-dot-blink"
                        aria-hidden="true"
                      />
                      <div className="medieval-glow mt-2 text-[13px] text-[#2bd522] medievalsharp tracking-wide text-center">
                        <div className="font-bold drop-shadow-lg">
                          {formatDateDDMMYYYY(ev.date)}

                        </div>
                        <div className="medieval-glow text-[11px] text-[#2bd522] font-bold medievalsharp italic">
                          {ev.time}
                        </div>
                      </div>
                    </div>

                    {/* Left side (desktop shows if isLeft; mobile handled above) */}
                    <div
                      className={`w-full md:w-1/2 px-4 md:px-8 ${isLeft ? "md:pr-12 md:order-1" : "md:pr-8 md:order-1 md:opacity-0 md:pointer-events-none"
                        }`}
                    >
                      {isLeft && (
                        <div className="hidden md:block relative">
                          <div
                            className="timeline-connector timeline-connector-behind"
                            data-length="med"
                            style={{
                              right: "-3rem",
                              position: "absolute",
                              width: "3rem",
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      {/* left-column: push card toward center on md+ */}
                      <div className={`${isLeft ? "md:flex md:justify-end" : "md:hidden"}`}>
                        <div className="w-full md:w-auto">
                          <EventCard ev={ev} onOpen={() => setOpen(ev.id)} />
                        </div>
                      </div>


                      <div className="md:hidden mt-4">
                        {!isLeft && <EventCard ev={ev} onOpen={() => setOpen(ev.id)} />}
                      </div>
                    </div>

                    {/* spacer center */}
                    <div className="hidden md:flex md:w-0 md:flex-1" />

                    {/* Right side */}
                    <div
                      className={`w-full md:w-1/2 px-4 md:px-8 ${!isLeft ? "md:pl-12 md:order-3" : "md:pl-8 md:order-3 md:opacity-0 md:pointer-events-none"
                        }`}
                    >
                      {!isLeft && (
                        <div className="hidden md:block relative">
                          <div
                            className="timeline-connector timeline-connector-behind"
                            data-length="long"
                            style={{
                              left: "-3rem",
                              position: "absolute",
                              width: "3rem",
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      {/* right-column: keep card to the left edge of its column (toward center) */}
                      <div className={`${!isLeft ? "md:flex md:justify-start" : "md:hidden"}`}>
                        <div className="w-full md:w-auto">
                          <EventCard ev={ev} onOpen={() => setOpen(ev.id)} />
                        </div>
                      </div>

                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Modal / Drawer for event details */}
      {open && (
        /* EventModal expects prop name 'event' in your uploaded modal file. */
        <EventModal event={events.find((e) => e.id === open)} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}

function EventCard({ ev, onOpen, isLcpCandidate = false }) {
  // decide sizes value according to your card CSS.
  // If the card max width is 288px on desktop and smaller on mobile:
  const sizes = "(max-width: 640px) 280px, 288px";

  const base = ev.posterBase || ev.poster; // fallback to old prop
  const src400 = `${base}-400.webp`;
  const src800 = `${base}-800.webp`;
  const src1200 = `${base}-1200.webp`;
  const defaultSrc = src800; // fallback for browsers not using srcset

  return (
    <div className="flex justify-center relative">
      <button onClick={onOpen} className="w-full md:w-72 h-48 md:h-56 lg:h-60 shrink-0 overflow-hidden rounded-lg shadow-sm relative">
        <div className="events-image-wrapper" style={{ borderRadius: "10px" }}>
          <div className="events-image-inner">
            <img
              src={defaultSrc}
              srcSet={`${src400} 400w, ${src800} 800w, ${src1200} 1200w`}
              sizes={sizes}
              alt={ev.name}
              loading={isLcpCandidate ? "eager" : "lazy"} // make LCP candidate eager
              fetchPriority={isLcpCandidate ? "high" : "auto"} // browsers supporting it
              draggable={false}
              className="w-full h-full timeline-crop object-cover"
            />
          </div>
        </div>
      </button>
    </div>
  );
}

