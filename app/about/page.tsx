"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import AboutPreviewSection from "@/components/AboutPreviewSection";

export default function About() {
  const team = [
    {
      name: "Dr. Muhammad Faisal Khan",
      role: "CEO",
      image: "/place-holder.jpg",
    },
    {
      name: "Dr. Naveed Iqbal",
      role: "COO",
      image: "/place-holder.jpg",
    },
    {
      name: "Dr. Mansoor Ahmad Khan",
      role: "CMO",
      image: "/place-holder.jpg",
    },
    {
      name: "Farooq Umer Khan",
      role: "CTO",
      image: "/place-holder.jpg",
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

  // const milestones = [
  //   { year: "2009", event: "Teresol Pvt Ltd founded" },
  //   { year: "2012", event: "Expanded to hardware solutions" },
  //   { year: "2015", event: "Launched embedded systems division" },
  //   { year: "2018", event: "Achieved ISO 9001 certification" },
  //   { year: "2020", event: "Reached 500+ completed projects" },
  //   { year: "2024", event: "15 years of excellence in technology" }
  // ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Modern%20corporate%20office%20building%20exterior%20with%20glass%20facade%20and%20blue%20accent%20lighting%2C%20professional%20business%20environment%20with%20clean%20architectural%20design%2C%20Pakistani%20technology%20company%20headquarters&width=1920&height=600&seq=abouthero&orientation=landscape)`,
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
      {/* Company Story */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2009, Teresol Pvt Ltd began as a small software development company with a vision to transform businesses through innovative technology solutions. Over the past 15 years, we have evolved into a comprehensive technology partner, offering software development, hardware solutions, and embedded systems.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our journey has been marked by continuous growth, technological advancement, and an unwavering commitment to client satisfaction. Today, we serve over 50 clients across various industries, having successfully completed more than 500 projects.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Teresol, we believe that technology should be accessible, reliable, and transformative. This philosophy drives everything we do, from initial consultation to ongoing support.
              </p>
            </div>
            <div>
              <img
                src="https://readdy.ai/api/search-image?query=Pakistani%20technology%20company%20office%20interior%20showing%20modern%20workspace%20with%20developers%20and%20engineers%20collaborating%2C%20clean%20professional%20environment%20with%20computers%20and%20hardware%20equipment%2C%20natural%20lighting&width=600&height=400&seq=story1&orientation=landscape"
                alt="Our Story"
                className="w-full h-96 object-cover object-top rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Timeline
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones in our 15-year journey of innovation and growth
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center mb-8 last:mb-0">
                <div className="w-20 text-right mr-8">
                  <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full mr-8 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals leading Teresol's innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white p-8 rounded-xl shadow-lg text-center"
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
              Let's Connect{" "}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
