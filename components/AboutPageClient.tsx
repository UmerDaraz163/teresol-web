"use client";

import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
import AboutPreviewSection from "@/components/AboutPreviewSection";

export default function AboutPageClient() {
  const team = [
    {
      slug: "dr-muhammad-faisal-khan",
      name: "Dr. Muhammad Faisal Khan",
      role: "Chief Executive Officer",
      image: "/leadership/CEO.png",
    },
    {
      slug: "dr-naveed-iqbal",
      name: "Dr. Naveed Iqbal",
      role: "Chief Operating Officer",
      image: "/leadership/COO.webp",
    },
    {
      slug: "dr-ahmad-muqeem-sheri",
      name: "Dr. Ahmad Muqeem Sheri",
      role: "Chief Design Officer",
      image: "/leadership/CDO.jpeg",
    },
    {
      slug: "mansoor-ahmad-khan",
      name: "Mansoor Ahmad Khan",
      role: "Chief Marketing Officer",
      image: "/leadership/CMO2.png",
    },
    {
      slug: "farooq-umer-khan",
      name: "Farooq Umer Khan",
      role: "Chief Technology Officer",
      image: "/leadership/CTOo.webp",
    },
    {
      slug: "dr-bilal-rauf",
      name: "Dr. Bilal Rauf",
      role: "Chief Information Officer",
      image: "/leadership/CIO1.webp",
    },
    {
      slug: "aamir-masood",
      name: "Aamir Masood",
      role: "Chief Project Officer",
      image: "/leadership/CPO.png",
    },
    {
      slug: "babar-amin",
      name: "Babar Amin",
      role: "Advisor International Projects",
      image: "/leadership/Adv-Intl-Project.png",
    },
    {
      slug: "air-cdre-asim-adnan-r",
      name: "Air Cdre Asim Adnan (R)",
      role: "Advisor Aviation Projects",
      image: "/leadership/Adv Avcs.jpeg",
    },
    {
      slug: "col-abdul-rauf-sim-r",
      name: "Col Abdul Rauf SI(M) (R)",
      role: "Advisor Defense Projects",
      image: "/leadership/Adv-GrdDef-Proj.png",
    },
  ];

  const values = [
    {
      icon: "ri-lightbulb-line",
      title: "Innovation",
      description:
        "We constantly push the boundaries of technology to deliver cutting-edge solutions that drive progress.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Quality",
      description:
        "Our commitment to excellence ensures that every solution we deliver meets the highest standards of quality.",
    },
    {
      icon: "ri-team-line",
      title: "Collaboration",
      description:
        "We believe in working closely with our clients to understand their needs and deliver tailored solutions.",
    },
    {
      icon: "ri-customer-service-line",
      title: "Support",
      description:
        "Our dedicated support team ensures that our clients receive continuous assistance and maintenance.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover"
        style={{
          backgroundImage: "url(/about-us3.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Teresol
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Leading the way in innovative technology solutions across Pakistan
            and beyond
          </p>
        </div>
      </section>

      <AboutPreviewSection />
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals leading Teresol&apos;s innovation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {team.map((member, index) => {
              const isClickable =
                member.role === "Chief Technology Officer" 
                ||
                member.role === "Chief Executive Officer" ||
                member.role === "Chief Operating Officer";

              // ✅ Define the card's inner content as a constant
              const cardContent = (
                <>
                  <div className="relative w-full aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                </>
              );
              
              // ✅ Conditionally render the card inside a Link or a div
              return isClickable ? (
                <Link
                  key={index}
                  href={`/team/${member.slug}`}
                  className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our commitment to
              excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6 mx-auto">
                  <i className={`${value.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the many satisfied clients who have transformed their
            businesses with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block"
            >
              Let&apos;s Connect{" "}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
