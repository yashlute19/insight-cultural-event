export default function Aftermovie() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
      

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl border-2 border-green-600"
            src="https://www.youtube.com/embed/O3WkuvWGGhw?rel=0"
            title="INSIGHT Aftermovie"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-center text-white text-lg mt-8  font-cinzel font-semibold">
          Relive the excitement from last year's carnival and get ready for even more fun!
        </p>
      </div>
    </section>
  )
}
