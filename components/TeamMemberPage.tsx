"use client";

import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

type teamMember = {
  name: string;
  image: string;
  role?: string;
  intro?: string;
};

type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  intro: string | string[];
  teamMembers: teamMember[];
};

// ✅ FIX: Corrected and completed the role map for accuracy
const roleMap: Record<string, string> = {
  CEO: "Chief Executive Officer",
  COO: "Chief Operating Officer",
  CTO: "Chief Technical Officer",
  CIO: "Chief Information Officer",
  CDO: "Chief Digital Officer",
  CMO: "Chief Marketing Officer",
  CPO: "Chief Product Officer",
  "Adv Intl Project": "Advisor International Projects",
  "Adv Avcs": "Advisor Avionics & Special Projects",
  "Adv Grd Def Proj": "Advisor Ground Defense Projects",
};

export default function TeamMemberPage({ member }: { member: TeamMember }) {
  const fullRole = roleMap[member.role] || member.role;

  return (
    <div className="min-h-screen ">
      <Header />

      <section className="bg-gray-800 pt-24 pb-16 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={400}
              className="object-cover shadow-lg rounded-[24px] border-4 border-gray-600"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {member.name}
            </h1>
            <p className="text-xl text-blue-300 font-medium">{fullRole}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-0 max-w-4xl">
          <div
            className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: Array.isArray(member.intro)
                ? member.intro.join("<br /><br />")
                : member.intro,
            }}
          />
        </div>
      </section>

      {/* Team Members Section */}
      {member.teamMembers && member.teamMembers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Team Members
            </h2>
            <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
              {member.teamMembers.map((teamMem, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center group hover:shadow-2xl transition-all duration-300"
                >
                  {/* ✅ FIX: Image container with a fixed width that doesn't shrink */}
                  <div className="relative w-full h-full sm:w-48 flex-shrink-0 aspect-square">
                    <Image
                      src={teamMem.image}
                      alt={teamMem.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* ✅ FIX: Text container now grows to fill the remaining space */}
                  <div className="p-6 flex-1 flex flex-col justify-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {teamMem.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {teamMem.role ?? "Team Member"}
                    </p>
                    {teamMem.intro && (
                      <p className="text-gray-600 text-medium mt-2 text-justify">
                        {teamMem.intro}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

