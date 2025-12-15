// EventModal.jsx — adds clickable fullscreen image viewer
"use client";

import { useEffect, useState } from "react";

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);
const CashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
  </svg>
);

function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return "";
  const m = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return dateStr; // fallback if format differs

  const [, yyyy, mm, dd] = m;
  return `${dd.padStart(2, "0")}-${mm.padStart(2, "0")}-${yyyy}`;
}


export default function EventModal({ event, onClose }) {

  const [visible, setVisible] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    // show animation
    setVisible(true);
    // prevent body scroll while modal open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // close on Escape if parent hasn't already handled it
    function onKey(e) {
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else handleClose();
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev || "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomed]);

  if (!event) return null;

  const handleClose = () => {
    // run hide animation then call parent's onClose
    setVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // match transition duration below
  };

  // open fullscreen viewer
  const openViewer = (e) => {
    e.stopPropagation();
    setZoomed(true);
  };

  // close viewer
  const closeViewer = () => setZoomed(false);

  return (
    <>
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center border-0 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={`${event.name} details`}
      >
        {/* overlay */}
        <div
          onClick={handleClose}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${visible ? "opacity-70" : "opacity-0 pointer-events-none"
            }`}
          aria-hidden="true"
        />

        {/* dialog (fade + slide) */}
        <div
          className={`relative w-full md:max-w-5xl mx-4 md:mx-0 rounded-t-lg md:rounded-lg overflow-hidden transition-all duration-300 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }
  max-h-[100dvh] md:max-h-none`}
          style={{ willChange: "opacity, transform" }}
        >
          {/* glassy container */}
          <div className="md:flex bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl overflow-y-auto max-h-[100dvh]">

            {/* left: poster / visual area */}
            <div className="md:w-1/2 w-full relative flex items-center justify-center bg-black overflow-hidden">
              {/* Decorative blurred background (keeps full-bleed look on narrow screens) */}
              <div
                className="modal-bg-blur absolute inset-0 z-10"
                style={{
                  backgroundImage: `url("${event.poster}-800.webp")`,

                }}
                aria-hidden="true"
              />

              {/* foreground image — click to open full-screen viewer */}
              <div
                className="relative z-30 w-full h-full flex items-center justify-center p-4"
                onClick={openViewer}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openViewer(e); }}
                aria-label={`Open ${event.name} image in full view`}
              >
                <img
                  src={`${event.poster}-1200.webp`}
                  alt={event.name}
                  className="modal-img-foreground max-w-full max-h-full object-contain cursor-zoom-in"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                  draggable={false}
                />

              </div>
            </div>

            {/* right: content */}
            <div className="p-6 md:p-8 md:w-1/2 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold carnival-font text-primary mb-2">
                    {event.name}
                  </h2>
                </div>
                {/* intentionally removed X button as requested */}
              </div>

              {/* description & extra images */}
              <div className="mt-6 text-neutral-200 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2 medieval-glow medievalsharp">About Event</h3>
                  <p className="leading-relaxed text-lg">{event.description}</p>
                  {/* Date */}
                  {(event.date) && (
                    <div>
                      <h4 className="text-lg pt-4 medievalsharp text-white mb-1">Event Details</h4>
                      <p className="text-base flex items-center gap-2">
                        <CalendarIcon />
                        {formatDateDDMMYYYY(event.date)}

                      </p>

                    </div>
                  )}

                  {/* Prize Pool */}
                  {event.prizePool && (
                    <div>
                      <h4 className="text-lg pt-4 medievalsharp text-white mb-1">Prize Pool</h4>
                      <p className="text-base flex items-center gap-2">
                        <TrophyIcon />
                        {event.prizePool}
                      </p>
                    </div>
                  )}

                  {/* Entry Fee */}
                  {event.entryFee && (
                    <div>
                      <h4 className="text-lg medievalsharp pt-4 text-white mb-1">Entry Fee</h4>
                      <p className="text-base flex items-center gap-2">
                        <CashIcon />
                        {event.entryFee}
                      </p>
                    </div>
                  )}

                  {/* Contacts */}
                  {event.contacts && event.contacts.length > 0 && (
                    <div>
                      <h4 className="text-lg medievalsharp pt-4 text-white mb-2">Contact</h4>
                      <div className="space-y-2">
                        {event.contacts.map((c, i) => (
                          <div
                            key={i}
                            className="flex flex-col text-sm sm:text-base"
                          >
                            <span className="font-medium">
                              {c.name} — <span className="opacity-80">{c.role}</span>
                            </span>
                            <a
                              href={`tel:${c.phone}`}
                              className="hover:underline w-fit flex items-center gap-2"
                            >
                              <PhoneIcon />
                              {c.phone}
                            </a>

                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {event.moreImages && event.moreImages.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">Gallery</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {event.moreImages.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${event.name} extra ${i + 1}`}
                          className="w-full h-32 object-cover rounded"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg";
                          }}
                          draggable={false}
                        />
                      ))}
                    </div>
                  </div>
                )}


                {event.rules && event.rules.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Rules & Guidelines</h3>
                    <ul className="text-neutral-300 list-disc list-inside space-y-2">
                      {event.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>



            </div>
          </div>
        </div>
      </div>


      {/* Fullscreen viewer overlay (when zoomed) */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
          aria-label={`${event.name} image full view`}
        >
          <div
            className="relative max-w-[98vw] max-h-[98vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // prevent closing when interacting with viewer content
          >
            {/* image itself — natural size shown up to max viewport */}
            <img
              src={`${event.poster}-1200.webp`}
              alt={event.name}
              style={{
                maxWidth: "98vw",
                maxHeight: "98vh",
                margin: "0 auto",
              }}
              draggable={false}
            />




          </div>
        </div>

      )}
    </>
  );
}
