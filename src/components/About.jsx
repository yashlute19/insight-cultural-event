import { aboutData } from "../data/about";
import Aftermovie from "./Aftermovie";

export default function About() {
  const people = aboutData.keyPeople || [];

  return (
    <section className="py-16 sm:py-20 px-4 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* -------------------------
    Glass Box 0: About College
   ------------------------- */}
        <div className="relative rounded-2xl shadow-xl overflow-hidden">
          {/* glow ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl
               ring-1 ring-teal-400/30
               shadow-[0_0_20px_rgba(0,128,128,0.5)]
               z-0"
          />

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-gray-600
                  p-6 sm:p-8 md:p-10 relative z-10">
            <h2 className="w-full flex justify-center text-center
               text-4xl sm:text-5xl md:text-6xl
               medievalsharp mb-8 medieval-glow font-bold">
              About College
            </h2>

            {/* content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* LEFT: Image */}
              <div className="w-full aspect-5/3 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={aboutData.college.photo}
                  alt={aboutData.college.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT: Text */}
              <div className="text-white text-lg leading-relaxed space-y-6">
                {/* description */}
                <p className="opacity-95">
                  {aboutData.college.description}
                </p>

                {/* vision */}
                <div className="pt-4">
                  <h4 className="text-xl font-semibold medievalsharp mb-2">
                    Vision
                  </h4>
                  <p className="opacity-95">
                    {aboutData.college.vision}
                  </p>
                </div>

                {/* mission */}
                <div className="pt-4">
                  <h4 className="text-xl font-semibold medievalsharp mb-2">
                    Mission
                  </h4>
                  <p className="opacity-95">
                    {aboutData.college.mission}
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* -------------------------
            Glass Box 1: About + Aftermovie
           ------------------------- */}
        <div className="relative rounded-2xl shadow-xl overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl
                       ring-1 ring-teal-400/30  /* Adjusted ring color for green/magical look */
                       shadow-[0_0_20px_rgba(0,128,128,0.5)] /* Adjusted shadow for green glow */
                       z-0" /* Set z-index lower than the content */
          />
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-gray-600 p-6 sm:p-8 md:p-10 relative text-center z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl medievalsharp text-center mb-6 medieval-glow font-bold">
              About INSIGHT
            </h2>

            <p className="text-xl text-white text-center mb-8 max-w-3xl mx-auto">
              {aboutData.description}
            </p>


          </div>
        </div>


        {/* -------------------------
            Glass Box 2: People Grid (separate box)
           ------------------------- */}
        <div className="relative bg-white/8 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden border-2 border-gray-600">
          {/* subtle border/glow for the people box (lighter) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl
                       ring-1 ring-teal-400/30  /* Adjusted ring color for green/magical look */
                       shadow-[0_0_20px_rgba(0,128,128,0.5)] /* Adjusted shadow for green glow */
                       z-0" /* Set z-index lower than the content */
          />


          <div className="relative z-20 ">
            <h3 className="w-full text-center mb-8">
  <span
    className="inline-block
               text-3xl sm:text-4xl md:text-5xl
               font-bold
               medievalsharp medieval-glow
               text-white"
  >
    Our Leaders
  </span>
</h3>
            {/* responsive grid — picks correct columns for the number of people */}
            { /* replace the existing grid wrapper with this block */}
            <div
              className={`grid grid-cols-1 gap-8 ${people.length === 1 ? "md:grid-cols-1" :
                people.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                }`}
            >
              {people.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="aspect-square w-full max-w-[280px] team-image-wrapper  rounded-lg overflow-hidden">
                    <div className="team-image-inner">
                      <img
                        src={person.photo || "/placeholder.svg"}
                        alt={person.name}
                        className="w-full h-full"
                        onError={(e) => {
                          e.target.src = `/placeholder.svg?height=300&width=300&query=Portrait+of+${person.name}`;
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <h4 className="text-lg font-bold text-white font-cinzel mb-1">
                      {person.name}
                    </h4>
                    <p className="medieval-glow  text-xl font-semibold">
                      {person.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>



          </div>
        </div>

        {/* additional glass boxes can be appended here later */}
      </div>
    </section>
  );
}
