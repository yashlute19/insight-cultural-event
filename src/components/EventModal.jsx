// EventModal.jsx — adds clickable fullscreen image viewer
"use client";

import { useEffect, useState } from "react";

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
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            visible ? "opacity-70" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />

        {/* dialog (fade + slide) */}
        <div
          className={`relative w-full md:max-w-5xl mx-4 md:mx-0 rounded-t-lg md:rounded-lg overflow-hidden transition-all duration-300 transform ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ willChange: "opacity, transform" }}
        >
          {/* glassy container */}
          <div className="md:flex bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl">
            {/* left: poster / visual area */}
            <div className="md:w-1/2 w-full relative flex items-center justify-center bg-black overflow-hidden">
              {/* Decorative blurred background (keeps full-bleed look on narrow screens) */}
              <div
                className="modal-bg-blur absolute inset-0 z-10"
                style={{
                  backgroundImage: `url("${event.posterBlur || event.poster || '/placeholder.svg'}")`,
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
                  src={event.poster || "/placeholder.svg"}
                  alt={event.name}
                  className="modal-img-foreground max-w-full max-h-full object-contain cursor-zoom-in"
                  onError={(e) => {
                    e.target.src = `/placeholder.svg?height=480&width=800&query=${encodeURIComponent(
                      event.name || "event"
                    )}+poster`;
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
              src={event.poster || "/placeholder.svg"}
              alt={event.name}
              className="block"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "98vw",
                maxHeight: "98vh",
                display: "block",
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
