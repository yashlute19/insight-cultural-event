import { teamData } from "../data/team";

export default function TeamSection() {
  return (
    <section id="team" className="py-16 sm:py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl medievalsharp text-center mb-12 medieval-glow font-bold">Our Team</h2>

        {/* Team Groups */}
        {Object.entries(teamData).map((groupEntry) => {
          const groupName = groupEntry[0];
          const members = groupEntry[1];
          const isSmallGroup = members.length < 4;

          return (
            <div key={groupName} className="mb-16">
              {/* Group Title */}
              <h3 className="text-3xl font-bold text-white text-center mb-8 medievalsharp">{groupName}</h3>

              {/* --- Conditional layout: grid for full rows, centered flex for small groups --- */}
              {isSmallGroup ? (
                <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap gap-8">
                  {members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center w-[260px]">
                      <div className="team-image-wrapper w-full">
                        <div className="team-image-inner">
                          <img
                            src={member.photo || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="p-4 text-center text-white">
                        <h4 className="text-2xl font-bold mb-1 medievalsharp">{member.name}</h4>
                        <p className="text-lg font-semibold medievalsharp medieval-glow">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Original 4-column grid for 4+ members (keeps original behaviour) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
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

                      <div className="p-4 text-center text-white">
                        <h4 className="text-2xl font-bold mb-1 medievalsharp text-white">{member.name}</h4>
                        <p className="text-lg font-semibold medievalsharp medieval-glow text-white">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
