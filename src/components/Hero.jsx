"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date("December 20, 2025 09:00").getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToEvents = () => {
    const el = document.getElementById("events");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center mb-6">
        <img
          src="/Insight-name.webp"
          alt="INSIGHT Event Logo"
          className="w-76 sm:w-80 md:w-120 h-auto mb-2 mx-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
        />
        <p className="mt-1 sm:mt-2 px-4 text-sm sm:text-lg md:text-xl font-cinzel font-semibold text-[#F8D48A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] text-center max-w-2xl">
          St. Vincent Pallotti College of Engineering and Technology, Nagpur
        </p>
      </div>
      <div className="relative z-10 w-full flex justify-center my-6">
        <div
          className="relative w-full max-w-xl rounded-2xl overflow-visible
             h-[140px]    /* mobile */
             sm:h-[160px]
             md:h-[230px] /* original desktop height */
             min-h-[80px]"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/countdown.webp')",
              backgroundSize: "110% 100%",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-4 h-full">
            {[
              { value: pad(countdown.days), label: "Days" },
              { value: pad(countdown.hours), label: "Hours" },
              { value: pad(countdown.minutes), label: "Minutes" },
              { value: pad(countdown.seconds), label: "Seconds" },
            ].map((item, idx) => {
              const offsets = [0, -1, 0, -1];
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center"
                  style={{ transform: `translateY(${offsets[idx]}px)` }}
                >
                  <div className="text-xl sm:text-xl md:text-4xl countdown-blue medievalsharp leading-none">
                    {item.value}
                  </div>

                  <div className="text-xs sm:text-sm md:text-xl countdown-label-blue medievalsharp mt-1">
                    {item.label}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
