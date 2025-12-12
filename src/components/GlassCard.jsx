/* GlassCard.jsx - Tailwind-only */
export default function GlassCard({ title, body, imgSrc, alt = "" }) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Glass panel (frosted background behind the box) */}
      <div
        className="
          relative
          bg-white/10            /* translucent tint so text pops */
          backdrop-blur-md       /* frosted effect - blurs what is behind the panel */
          ring-1 ring-white/10   /* faint border for crispness */
          rounded-2xl
          p-4 sm:p-6 md:p-8
          shadow-xl
          my-12
          overflow-hidden
        "
        role="region"
        aria-labelledby="glass-title"
      >
        {/* Soft highlight overlay (decorative) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/2 to-transparent mix-blend-overlay" />

        {/* Content container: everything here is NOT blurred by backdrop-filter */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          {/* Left: text */}
          <div className="flex-1 text-white">
            <h3 id="glass-title" className="text-xl md:text-2xl font-extrabold leading-tight">
              {title}
            </h3>
            <p className="mt-2 text-sm text-white/90">
              {body}
            </p>
          </div>

          {/* Right: photo — crisp, not blurred */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden bg-black/20 ring-1 ring-white/6">
            <img
              src={imgSrc}
              alt={alt}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
