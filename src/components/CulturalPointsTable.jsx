// CulturalPointsTable.jsx — patched: debug + dedupe + safe keys
import React, { useEffect } from "react";
import { departmentsData } from "../data/departments";
import Image from "next/image";

export default function CulturalPointsTable() {
  useEffect(() => {
    console.log("Imported departmentsData:", departmentsData);
    const ids = departmentsData.map(d => d.id);
    const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupIds.length) console.warn("Duplicate dept ids (in source):", [...new Set(dupIds)]);

    const names = departmentsData.map(d => (d.name || "").toString().trim().toLowerCase());
    const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
    if (dupNames.length) console.warn("Duplicate dept names (in source):", [...new Set(dupNames)]);
  }, []);

  // create sorted copy
  const sorted = [...departmentsData].sort((a, b) => b.totalPoints - a.totalPoints);

  // non-destructive dedupe by id (keeps first occurrence)
  const deduped = (() => {
    const seen = new Set();
    const out = [];
    for (const d of sorted) {
      if (seen.has(d.id)) {
        console.warn("Ignored duplicate department id during render:", d.id, d.name);
        continue;
      }
      seen.add(d.id);
      out.push(d);
    }
    return out;
  })();

  // optional: custom short forms mapping (only used if dept.short is missing)
  const shortMap = {
    "computer science and engineering": "CSE",
    "bachelor of vocation": "BVOC",
    "mechanical engineering": "ME",
    "civil engineering": "CV",
    "electrical engineering": "EE",
    "artificial intelligence": "AI",
    "cse- data science": "DS",
    "cse- cyber security": "CS",
    "electronics and telecommunication": "ETC",
    "computer science and business systems": "CSBS",
    "industrial iot": "IIOT",
    "information technology": "IT",
    // add as many mappings as you like (lowercase keys)
  };


  return (
    <section id="points" className="py-16 sm:py-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl medievalsharp text-center mb-12 medieval-glow font-bold">
          Cultural Points Table
        </h2>

        <div className="outer-glass relative mx-4 sm:mx-0">
          <div className="inner-container flex justify-center">
            {/* --- Replace the current cultural-table-wrap block with this --- */}
            <div className="relative w-full max-w-4xl cultural-table-wrap">

              <div className="relative cultural-video-inner">

                {/* BACKGROUND IMAGE (HIGH PRIORITY) */}
                <Image
                  src="/table-bg-optimized.webp"
                  alt=""
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL="/table-bg-blur.webp"
                  className="object-cover object-center z-0"
                />
                {/* DARK OVERLAY */}
                <div className="cultural-video-overlay absolute inset-0 z-10" />

                {/* TABLE CONTENT — sits on top of the bg (same DOM parent) */}
                <div className="relative z-30 p-6 cultural-table-content">
                  {/* DESKTOP TABLE */}
                  <div className="hidden md:block">
                    <div className="overflow-x-hidden min-w-0">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="text-white/90 text-sm">
                            <th className="px-4 py-3 text-left-center font-semibold font-cinzel">
                              <span className="medieval-glow">Rank</span>
                            </th>
                            <th className="px-4 py-3 text-left font-semibold font-cinzel pl-15">
                              <span className="medieval-glow">Department</span>
                            </th>
                            <th className="px-4 py-3 text-center font-semibold font-cinzel">
                              <span className="medieval-glow">Total Points</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {deduped.map((dept, idx) => (
                            <tr key={`${dept.id}-${idx}`} className="group transition-colors border-b border-white/6">
                              <td className="px-4 py-4">
                                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold bg-transparent border-2 border-green-500 ring-1 ring-white/6 text-[#5affa0]">
                                  {idx + 1}
                                </div>
                              </td>

                              <td className="px-4 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 min-w-[40px] min-h-[40px] flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden relative glassy-badge">
                                  <span className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#5affa0]/12 to-transparent" />
                                  <span className="medieval-glow medievalsharp text-[#5affa0] whitespace-nowrap z-10">
                                    {(
                                      (dept.short && dept.short.toString().trim()) ||
                                      shortMap[(dept.name || "").toString().trim().toLowerCase()] ||
                                      (dept.name || "").slice(0, 2)
                                    ).toString().toUpperCase()}
                                  </span>
                                </div>

                                <div>
                                  <div className="font-semibold font-cinzel medieval-glow text-white/95">{dept.name}</div>
                                  <div className="text-xs font-cinzel medieval-glow text-white/60">{dept.college ?? ""}</div>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-center text-white font-bold">{dept.totalPoints}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* MOBILE STACKS */}
                  <div className="md:hidden space-y-3">
                    {deduped.map((dept, idx) => (
                      <div
                        key={`${dept.id}-${idx}`}
                        className="bg-white/3 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-white/6"
                      >
                        <div className="flex items-center gap-3 w-full min-w-0">
                          <div className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold bg-transparent border-2 border-green-500 ring-1 ring-white/6 text-[#5affa0] flex-shrink-0">
                            {idx + 1}
                          </div>

                          <div className="flex items-center gap-3 min-w-0 ml-1">
                            <div className="w-10 h-10 min-w-[40px] min-h-[40px] flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden relative glassy-badge">
                              <span className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#5affa0]/12 to-transparent" />
                              <span className="medieval-glow medievalsharp text-[#5affa0] whitespace-nowrap z-10">
                                {(
                                  (dept.short && dept.short.toString().trim()) ||
                                  shortMap[(dept.name || "").toString().trim().toLowerCase()] ||
                                  (dept.name || "").slice(0, 2)
                                ).toString().toUpperCase()}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <div className="font-semibold font-cinzel medieval-glow text-white/95 break-words">
                                {dept.name}
                              </div>
                              <div className="text-xs font-cinzel text-white/60">{dept.college ?? ""}</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-white font-bold mx-auto mt-3 sm:mt-0 sm:ml-4  font-cinzel flex-shrink-0 ">
                          Total points - {dept.totalPoints}
                        </div>
                      </div>
                    ))}
                  </div>

                </div> {/* end table content */}

              </div> {/* end cultural-video-inner / bg container */}

            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
