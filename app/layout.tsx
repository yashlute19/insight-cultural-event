import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Cinzel_Decorative } from "next/font/google";
import { MedievalSharp } from "next/font/google"; // next/font uses underscores for some names
import ClientRoot from "../src/components/ClientRoot"; // client-side wrapper (created below)

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700"],
  display: "swap",
});

const medievalSharp = MedievalSharp({
  subsets: ["latin"],
  variable: "--font-medievalsharp",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Insight",
  description: "INSIGHT: Annual College Cultural & Sports Carnival",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico" }, // multi-size ICO
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/ms-icon-310x310.png", sizes: "310x310", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzelDecorative.variable} ${medievalSharp.variable}`}>
      <head>
        {/* preload the hero background so it starts downloading early */}
        <link rel="preload" as="image" href="/hero-background.webp" />
        {/* optionally preload other critical images */}
      </head>

      <body>
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/hero-background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "saturate(1.05) contrast(1.03)",
            WebkitFilter: "saturate(1.05) contrast(1.03)",
          }}
        >
          {/* subtle golden overlay to preserve carnival tone */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(255,230,160,0.06), rgba(255,200,80,0.04))",
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Page content sits above the background. ClientRoot handles loader + fades. */}
        <div className="relative z-20 min-h-screen overflow-x-hidden">
          <ClientRoot>{children}</ClientRoot>
        </div>
      </body>
    </html>
  );
}
