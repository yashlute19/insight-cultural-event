import { teamData } from "../data/team"

export default function TeamSection() {
  return (
    <section id="team" className="py-16 sm:py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl medievalsharp text-center mb-12 medieval-glow font-bold">Our Team</h2>

        {/* Team Groups */}
        {Object.entries(teamData).map((groupEntry) => (
          <div key={groupEntry[0]} className="mb-16">
            {/* Group Title */}
            <h3 className="text-3xl font-bold text-white text-center mb-8 medievalsharp">{groupEntry[0]}</h3>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {groupEntry[1].map((member) => (
                <div key={member.id} className="flex flex-col items-center">

                  {/* 🔥 Animated Border Image Box */}
                  <div className="team-image-wrapper max-w-[260px] w-full">
                    <div className="team-image-inner">
                      <img
                        src={member.photo || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `/placeholder.svg?height=300&width=300&query=Portrait+of+${member.name}`;
                        }}
                      />
                    </div>
                  </div>
                 

                  {/* Member Info */}
                  <div className="p-4 text-center text-white">
                    <h4 className="text-2xl font-bold mb-1 medievalsharp text-white">{member.name}</h4>
                    <p className="text-lg  font-semibold medievalsharp medieval-glow text-white">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
