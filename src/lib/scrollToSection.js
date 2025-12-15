// src/lib/scrollToSection.js
export function scrollToSection(id) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
