"use client";

import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

type teamMember = {
  name: string;
  image: string;
  role?: string;
};

type TeamMember = {
  slug: string;
  name:string;
  role: string;
  image: string;
  intro: string | string[];
  teamMembers: teamMember[];
};

// Mapping abbreviations to full forms
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
              className="object-cover shadow-lg rounded-full border-4 border-gray-600"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Professional Summary
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify">
            {Array.isArray(member.intro) ? (
              member.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{member.intro}</p>
            )}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Team Members
          </h2>

          <div className="flex flex-wrap justify-center gap-y-8 -mx-4">
            {member.teamMembers.map((teamMem, i) => (
              <div key={i} className="w-1/2 sm:w-1/3 md:w-1/4 px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden text-center group h-full">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={teamMem.image}
                      alt={teamMem.name}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {teamMem.name}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {teamMem.role ?? "Team Member"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
