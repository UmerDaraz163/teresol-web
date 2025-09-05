"use client";

import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

type Reportee = {
  name: string;
  image: string;
};

type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  intro: string;
  reportees: Reportee[];
};

export default function TeamMemberPage({ member }: { member: TeamMember }) {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Top Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {member.name}
            </h1>
            <p className="text-xl text-blue-600 font-medium">{member.role}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{member.intro}</p>
        </div>
      </section>

      {/* Reportees Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Reportees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {member.reportees.map((rep, i) => (
              <div
                key={i}
                className="flex items-center bg-white rounded-lg shadow-md p-4"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={rep.image}
                    alt={rep.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-800 font-medium">{rep.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
