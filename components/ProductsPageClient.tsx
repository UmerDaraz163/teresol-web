// components/ProductsPageClient.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
// import Image from "next/image";

export default function ProductsPageClient() {
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedTypes, setExpandedTypes] = useState<{
    [key: string]: boolean;
  }>({});

  const groupedProducts = [
    {
      groupTitle: "Single Board Computers SBC's",
      category: "Hardware Product",
      description:
        "TeReSol offers a wide range of Single Board Computers in different configurations (e.g., PowerPC / ARM) built using a variety of CPU and FPGA SoC platforms with form factors like Qseven, SMARC, SODIMM and HPC, by collaborating with Microsoft, Oracle, Qualcomm, Advantech, Nvidia, and NXP.",
      types: [
        {
          type: "PowerPC Architecture",
          models: [
            {
              title: "NXP QorIQ T1042-based Rugged 6U VME",
              image: "/products/sbc/sbc1.png",
              shortDescription:
                "NXP QorIQ T1042 PowerPC SBCs with quad-core 1.4GHz CPUs, DPAA, rich interfaces, low power, and MIL-grade ruggedization for avionics and marine LRUs.",
            },
            {
              title: "NXP PowerPC MPC8270-based Rugged 6U VME",
              image: "/products/sbc/sbc2.png",
              shortDescription:
                "PowerQUICC II (MPC8270) PowerPC SBCs with low power, Xilinx 6-series FPGA, multi-interface support, MIL-grade ruggedization, ideal for comms processing.",
            },
            {
              title: "NXP QorIQ T1042-based Rugged 3U VME",
              image: "/products/sbc/sbc3.png",
              shortDescription:
                "3U PowerPC SBCs with 4×1.4GHz E5500 cores, cache, SRAM, eMMC, low power, MIL-grade ruggedization, for avionics and marine LRUs.",
            },
          ],
        },
        {
          type: "NVIDIA Based",
          models: [
            {
              title: "Tegra K1- NVIDIA",
              image: "/products/sbc/sbc4.png",
              shortDescription:
                "NVIDIA-based XMC GPU modules with processor, memory, I/O, temp sensor, low power, and MIL-STD compliance.",
            },
            {
              title: "NVIDIA Xavier Single Board Computer",
              image: "/products/sbc/sbc5.png",
              shortDescription:
                "XMC/PMC GPU modules with processor, memory, video codec, I/O, GPS, sensors, low power, and MIL-STD compliance.",
            },
          ],
        },
        {
          type: "ARM Architecture",
          models: [
            {
              title: "X210 ARM",
              image: "/products/sbc/sbc6.png",
              shortDescription:
                "ARM-based SBCs in varied form factors, from single to octa-core, ideal for handhelds like smartphones and tablets.",
            },
          ],
        },
      ],
    },
    {
      groupTitle: "Video & Graphic Processing Cards",
      category: "Hardware Product",
      description:
        "TeReSol has experience of designing various Graphics and Video Processing/Compression modules. They consist of integrated host processor and GPU, flash memory, Video encoder & Decoder, multiple I/Os, GPS and multiple other sensors. They are low in power consumption and comply to multiple standards like MIL-STD-454G, MIL-STD-810B and MIL-STD-461-D",
      types: [
        {
          type: "Graphics & Video Boards",
          models: [
            {
              title: "Multifunction Audio Video Interface module",
              image: "/products/video-cards/card1.png",
              shortDescription:
                "6U VME ARM modules with processor, memory, video/audio I/O, temp sensor, and optional accessories.",
            },
            {
              title: "Tegra K1- NVIDIA based",
              image: "/products/video-cards/card2.png",
              shortDescription:
                "NVIDIA-based XMC GPU cards with processor, memory, I/O, temp sensors, low power, and MIL-STD compliance.",
            },
            {
              title: "NVIDIA Xavier Single Board Computer",
              image: "/products/video-cards/card3.png",
              shortDescription:
                "XMC/PMC GPU modules with processor, memory, video codec, I/O, GPS, sensors, low power, and MIL-STD compliance.",
            },
            {
              title: "Head Up Graphic Module card",
              image: "/products/video-cards/card4.png",
              shortDescription:
                "6U VME modules with AD processor, memory, video codec, multi-interfaces, voltage monitoring, MIL-STD compliance, and optional accessories.",
            },
          ],
        },
        {
          type: "Video Capture & Compression Cards",
          models: [
            {
              title: "Video Compression Card",
              image: "/products/video-cards/card5.png",
              shortDescription:
                "Compact rugged video capture device with VGA/composite input, H.264/MPEG-4 compression, real-time HD output, stackable DVR support, and RoHS compliance.",
            },
          ],
        },
      ],
    },
    {
      groupTitle: "I/O & Bus Interface Cards",
      category: "Hardware Product",
      description:
        "TeReSol has designed various Input Output and MUX BUS Interface modules and Adaptation cards. These play a critical role in the function of various LRUs in Mission Ready Systems. These have been designed in various form factors depending upon the application. They range from Interface cards to Multifunction I/O cards and Synchronous cards",
      types: [
        {
          type: "MUX BUS Interface Cards",
          models: [
            {
              title: "Quad Channel MIL-STD-1553B 6U VME",
              image: "/products/interface-cards/card1.png",
              shortDescription:
                "The 6U MBI bridges the CPU and 1553B bus via VME as BC or RT.",
            },
            {
              title: "Dual Channel MIL-STD-1553B PMC",
              image: "/products/interface-cards/card2.png",
              shortDescription:
                "Dual-channel 1553 cards with redundant channels, each supporting BC, MT, and dual RTs.",
            },
            {
              title: "Three Channel MIL-STD-1553B 3U VME",
              image: "/products/interface-cards/card3.png",
              shortDescription:
                "The 3U MBI bridges the CPU and 1553B bus via VME as BC or RT.",
            },
          ],
        },
        {
          type: "Multi Channel I/O Cards",
          models: [
            {
              title: "Multifunction I/O Module in 6U form factor-VME",
              image: "/products/interface-cards/card4.png",
              shortDescription:
                "Multifunction I/O module with 10 analog inputs, Ethernet, CAN, I²C, serial, 64 DI, 24 DO, and ROHS/CE/UL/60950 compliance.",
            },
            {
              title: "System Interface Module in 3U form factor-VME",
              image: "/products/interface-cards/card5.png",
              shortDescription:
                "System Interface Module delivers discrete signals, digitizes analog/synchro inputs, and generates GMHDG, AOA, and NAU signals for the CPU.",
            },
          ],
        },
        {
          type: "Synchronous/Adaptation Cards",
          models: [
            {
              title: "Synchro Discrete I/O Board in 6U form factor-VME",
              image: "/products/interface-cards/card6.png",
              shortDescription:
                "High-performance processors with FPU, onboard Xilinx 6-series FPGA, BIT, 16 analog inputs (12-bit ADC), 2 synchro channels, and 16 high-power DOs.",
            },
          ],
        },
      ],
    },
    // {
    //   groupTitle: "Mission Ready Systems",
    //   category: "Hardware Product",
    //   description:
    //     "TeReSol has extensive experience in providing rugged Mission Ready systems. We provide form-fit and Functional LRUs like Display Computer, Control Computers, Digital Video and Mission Data Recorders for various segments of Aerospace and Defence Industry",
    //   types: [
    //     {
    //       type: "Mission & Data Recorders",
    //       models: [
    //         {
    //           title: "Multipurpose Digital Video Recorder",
    //           image: "/products/mission-systems/system1.png",
    //           shortDescription: "High-performance video processing card.",
    //         },
    //         {
    //           title: "Dual Channel MIL-STD-1553B PMC",
    //           image: "/products/mission-systems/system2.png",
    //           shortDescription: "Versatile video and graphics card.",
    //         },
    //         {
    //           title: "Three Channel MIL-STD-1553B 3U VME",
    //           image: "/products/mission-systems/system3.png",
    //           shortDescription: "AI-optimized graphic processing SBC.",
    //         },
    //         {
    //           title: "Three Channel MIL-STD-1553B 3U VME",
    //           image: "/products/mission-systems/system4.png",
    //           shortDescription: "AI-optimized graphic processing SBC.",
    //         },
    //       ],
    //     },
    //     {
    //       type: "Avionics Computers",
    //       models: [
    //         {
    //           title: "Three Channel MIL-STD-1553B 3U VME",
    //           image: "/products/mission-systems/system5.png",
    //           shortDescription: "AI-optimized graphic processing SBC.",
    //         },
    //         {
    //           title: "Three Channel MIL-STD-1553B 3U VME",
    //           image: "/products/mission-systems/system6.png",
    //           shortDescription: "AI-optimized graphic processing SBC.",
    //         },
    //       ],
    //     },
    //     {
    //       type: "Multifunction Displays",
    //       models: [
    //         {
    //           title: "Smart Display Unit-I",
    //           image: "/products/mission-systems/system7.png",
    //           shortDescription: "Efficient hardware-level video compression.",
    //         },
    //         {
    //           title: "Smart Display Unit-II",
    //           image: "/products/mission-systems/system8.png",
    //           shortDescription: "Efficient hardware-level video compression.",
    //         },
    //       ],
    //     },
    //     {
    //       type: "Power Supplies",
    //       models: [
    //         {
    //           title: "Rack Mounted AC/DC Power Supply",
    //           image: "/products/mission-systems/system9.png",
    //           shortDescription: "Efficient hardware-level video compression.",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      groupTitle: "Automotive Systems",
      category: "Hardware Product",
      description:
        "TeReSol envisions a future where local Car manufacturers are enabled to provide International standard of experience in locally assembled Automobiles. TeReSol has designed and deployed state of the art Android based infotainment system, Vehicle tracking solutions and Harnessing for Armoured Personnel Carriers (APCs)",
      types: [
        {
          type: "Vehicle Systems & Solutions",
          models: [
            {
              title: "Vehicle Infotainment System",
              image: "/products/auto-systems/system1.png",
              shortDescription:
                "Android-based infotainment system with DVD, cameras, GSM/GPS, biometrics, OBD-II, TPMS, parking sensors—customizable and deployed in top car series.",
            },
            {
              title: "Vehicle Tracking Solutions",
              image: "/products/auto-systems/system2.png",
              shortDescription:
                "TeReSol’s TERETRACK offers GPS/GSM fleet tracking with satellite comms, sensor integration, onboard storage, and web-based management.",
            },
          ],
        },
      ],
    },
    {
      groupTitle: "Enterprise Software Solutions",
      category: "Software Product",
      description:
        "TeReSol’s Enterprise Fintech Solutions empower businesses to thrive in the digital age through a comprehensive suite of services delivered by a team of over 400 professionals, including 20 PhDs from esteemed global institutes. As an ISO 9001, 20000, and 27001 certified company, we ensure industry-leading quality while specializing in transforming outdated systems, delivering omni-channel banking experiences, managing IT infrastructure, and providing expert consultancy.",
      types: [
        {
          type: "Fintech Solution/Services",
          models: [
            {
              title: "Cloud Native Banking Solutions",
              image: "/products/software/cloud.jpg",
              shortDescription:
                "TeReSol modernizes legacy systems into scalable, cloud-native, open-source platforms with microservices and high-performance orchestration.",
            },
            {
              title: "Digital Banking Solutions",
              image: "/products/software/dbs.png",
              shortDescription:
                "TeReSol’s Digital Banking Solutions enable secure, branchless banking with biometric verification and 24/7 support.",
            },
            {
              title: "Remote IT Team Establishment",
              image: "/products/software/remote.jpeg",
              shortDescription:
                "We provide skilled teams with 24/7 support, flexible scaling, and lower costs than in-house staffing.",
            },
            {
              title: "Consultancy Services",
              image: "/products/software/consultancy.jpg",
              shortDescription:
                "We optimize IT teams through restructuring, PMO setup, recruitment, process guidelines, and training.",
            },
          ],
        },
        {
          type: "Access Control Platform",
          models: [
            {
              title: "i-MPLOYEE Software",
              image: "/products/software/imployee.jpg",
              shortDescription:
                "A state-of-the-art access control system with a fast, energy-efficient processor, multi-step authentication, dual storage, and up to 8 hours of battery backup.",
            },
          ],
        },
        {
          type: "Infotainment System",
          models: [
            {
              title: "Software Suite",
              image: "/products/software/infotainment.jpeg",
              shortDescription:
                "A state-of-the-art infotainment system offering multiple driver profiles, Bluetooth/WiFi/GSM connectivity with video calls, telephony features, and sensor integration for camera, tyre pressure, battery, temperature, and engine load.",
            },
            {
              title: "TereTrack",
              image: "/products/software/teretrack.png",
              shortDescription:
                "The TeReTrack Fleet Management platform is a web and mobile-based solution offering real-time monitoring and updates, deeper insights for fleet maintenance, fuel consumption, and workforce planning, alerts for geo-fencing and driver behavior, comprehensive reports for actionable analytics, biometrics authentication, and sensor integration with devices like dashcams and temperature sensors.",
            },
          ],
        },
      ],
    },
    {
      groupTitle: "HR Management Systems",
      category: "Hardware Product",
      description:
        "TeReSol’s indigenous product i-MPLOYEE is a unique, comprehensive and innovative attendance, access and reporting system based on modern biometric and RFID technology. i-MPLOYEE is one of a kind, on the go, plug-n-play solution which enables customer’s flexibility to get attendance and access data from any temporary or permanent location through smart phone application or web portal",
      types: [
        {
          type: "Imployee Biometric System",
          models: [
            {
              title: "I-MPLOYEE",
              image: "/products/hr-systems/imployee.png",
              shortDescription:
                "Advanced access control system with high-speed processor, multi-factor authentication, dual storage, and 8-hour backup.",
            },
          ],
        },
      ],
    },
  ];

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) => ({ ...prev, [groupIndex]: !prev[groupIndex] }));
  };

  const toggleType = (key: string) => {
    setExpandedTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{ backgroundImage: `url('/products/products3.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Innovative software and hardware products designed to solve
            real-world business challenges.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Product Portfolio
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            TeReSol’s Product Portfolio spans advanced embedded systems,
            ruggedized computing platforms, and mission-critical electronics
            tailored for defense, aerospace, automotive, and industrial sectors.
            From high-performance Single Board Computers and video processing
            modules to avionics computers and AI-powered solutions, our products
            meet the toughest operational and environmental standards.
          </p>

          {groupedProducts.map((group, groupIndex) => {
            const isGroupExpanded = expandedGroups[groupIndex];

            return (
              <div
                key={groupIndex}
                className="mb-4 shadow-lg px-6 py-4 rounded-lg bg-gray-100"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 bg-gradient-to-r from-[#25237b] to-[#8b0303] bg-clip-text text-transparent">
                  {group.groupTitle}
                </h2>
                <p className="text-black mb-4">{group.description}</p>
                <button
                  onClick={() => toggleGroup(groupIndex)}
                  className="whitespace-nowrap text-white px-6 py-2 rounded-full font-semibold text-md bg-[#25237b] hover:bg-[#8b0303] transition-all duration-300 transform hover:scale-105"
                >
                  {isGroupExpanded ? "View Less" : "View More"}
                </button>

                <AnimatePresence initial={false}>
                  {isGroupExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 py-2">
                        {group.types.map((type, typeIndex) => {
                          const typeKey = `${groupIndex}-${typeIndex}`;
                          const isTypeExpanded =
                            expandedTypes[typeKey] || false;

                          return (
                            <div
                              key={typeIndex}
                              className="bg-white shadow-md rounded-xl p-6"
                            >
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {type.type}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                High-performance modules using {type.type}{" "}
                                architecture.
                              </p>
                              <button
                                onClick={() => toggleType(typeKey)}
                                className="whitespace-nowrap text-white px-4 py-2 rounded-full font-semibold text-sm bg-[#25237b] hover:bg-[#8b0303] transition-all duration-300 transform hover:scale-105"
                              >
                                {isTypeExpanded ? "View Less" : "View Models"}
                              </button>

                              <AnimatePresence initial={false}>
                                {isTypeExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                    }}
                                    className="overflow-hidden mt-6 space-y-6"
                                  >
                                    {type.models.map((model, modelIndex) => (
                                      <div
                                        key={modelIndex}
                                        className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-sm text-center"
                                      >
                                        <img
                                          src={model.image}
                                          alt={model.title}
                                          className="w-40 h-40 object-contain rounded-md mb-4 hover:scale-105 transition-transform duration-300 will-change-transform"
                                        />
                                        <h4 className="text-lg font-semibold text-gray-900">
                                          {model.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-2">
                                          {model.shortDescription}
                                        </p>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Teresol Products?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Enterprise-Grade Quality
                    </h3>
                    <p className="text-gray-600">
                      Built to meet the highest standards of reliability and
                      performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-settings-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Customizable Solutions
                    </h3>
                    <p className="text-gray-600">
                      Flexible products that can be tailored to your specific
                      requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-customer-service-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Comprehensive Support
                    </h3>
                    <p className="text-gray-600">
                      24/7 technical support and regular updates to ensure
                      optimal performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-money-dollar-circle-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Cost-Effective
                    </h3>
                    <p className="text-gray-600">
                      Competitive pricing with excellent return on investment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
              <img
                src="/products/about-us2.webp"
                alt="Product Benefits"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Explore Our Products?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a demo or consultation to see how our products can benefit
            your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Request Demo
            </Link>
            {/* <Link
              href="/contact"
              className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block"
            >
              Get Quote
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
