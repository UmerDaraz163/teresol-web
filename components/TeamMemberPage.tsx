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
      <section className="mt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
            <p className="text-xl text-blue-600 font-medium">{member.role}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Professional Summary
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {member.intro}
          </p>
        </div>
      </section>

      {/* Reportees Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Team Members</h2>
          {/* ✅ Changed to a 4-column grid on medium screens and up */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {member.reportees.map((rep, i) => (
              <div
                key={i}
                // ✅ Changed to a vertical layout with centered items
                className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-4"
              >
                {/* ✅ Image container with bottom margin */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image
                    src={rep.image}
                    alt={rep.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* ✅ Name is now below the image */}
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
