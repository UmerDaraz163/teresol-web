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
  name: string;
  role: string;
  image: string;
  intro: string;
  teamMembers: teamMember[];
};

// ✅ Mapping abbreviations to full forms
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
  // ✅ Check if full form exists, otherwise fallback to abbreviation
  const fullRole = roleMap[member.role] || member.role;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Top Section */}
      <section className="mt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={400}
              className="object-cover shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {member.name}
            </h1>
            <p className="text-xl text-blue-600 font-medium">{fullRole}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-8 px-36">
        <div className="container mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Professional Summary
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {member.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Reportees Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Team Members
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {member.teamMembers.map((teamMem, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <Image
                  src={teamMem.image}
                  alt={teamMem.name}
                  width={500}
                  height={500}
                  className="w-full aspect-square object-cover object-top"
                />

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {teamMem.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {teamMem.role ?? "Team Member"}
                  </p>
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
