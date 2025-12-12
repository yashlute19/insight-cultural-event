"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Analytics } from "@vercel/analytics/next";

export default function ClientRoot({ children }) {
  // `loading` = true while waiting for window.load
  // `showLoader` = whether to render the loader element in DOM
  // `visible` = controls CSS class for fade (opacity)
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // We keep `loading` for logic (children hidden), then start fade
      setLoading(false);
      // trigger CSS fade-out
      setVisible(false);
      // after the CSS transition ends, remove loader from DOM
      // we wait slightly longer than the CSS transition (400ms)
      setTimeout(() => setShowLoader(false), 500);
    };

    if (typeof window !== "undefined" && (document.readyState === "complete" || document.readyState === "interactive")) {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {/* Render loader only while showLoader true */}
      {showLoader && (
        <div className={visible ? "loader-screen" : "loader-screen loader-hidden"}>
          <Loader />
        </div>
      )}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {children}
      </div>

      <Analytics />
    </>
  );
}
