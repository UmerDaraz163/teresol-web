// Define the shape of a detailed feature object
export type FeatureDetail = {
    title: string;
    details: string[];
  };
  
  export type Service = {
    icon: string;
    title:string;
    description: string;
    features: string[] | FeatureDetail[];
    techIcons: string[];
    // techIconsLarge?: string[]; // New property for large images
  };
  
  // Export the array of services data
  export const services: Service[] = [
    {
      icon: "ri-cpu-line",
      title: "Embedded Hardware Design Services",
      description: "Our embedded design includes complex multi-layers (18-24) high-speed signal processing PCBs, Single Board Computers (SBC) for time-scheduled applications, their board support packages/APIs for external integration, and complete customized end-to-end product (qualified for tough temperature environment) with multiple designed cards.",
      features: [
        {
          title: "Single Board Computers (SBCs)",
          details: [
            "Offers a wide range of configurations including PowerPC & ARM architectures",
            "Supports various form factors like Qseven, SMARC, SO-DIMM, and HPC",
            "PowerPC features: VME 64/64x interface, Ethernet/Serials/OS, and low power consumption",
            "ARM features: Single/Quad/Octa Core processors in a small form factor with very low power consumption",
            "Developed by working closely with Tier-1 silicon companies like Oracle, Qualcomm, Nvidia, and NXP"
          ]
        },
        {
          title: "Military Avionics",
          details: [
            "Display Computer: Acts as a backup Navigation & Attack Unit (NAU) and is MIL-STD-461, MIL-STD-810 & MIL-STD-704 Compliant",
            "Control Computer: Works as a centralized monitoring unit for navigation and mission avionics",
            "Receives data from LRUs via 1553B bus, discrete, synchro, and analog signal interfaces"
          ]
        },
        {
          title: "Mission Data Recorders",
          details: [
            "Features 6 to 8 video channels, 4 audio channels, and 12 data channels",
            "Includes 3 x 1553B Mux Bus interfaces and 128/256 GB of data storage",
            "Compliant with MIL-STD-810 and MIL-STD-461 environmental standards"
          ]
        },
        {
          title: "FPGA Boards",
          details: [
            "Development of customized IP Cores",
            "Expertise in Xilinx Spartan 3, Spartan 6, Zynq & Vertex FPGAs"
          ]
        },
        {
          title: "Graphical Processing Units (GPUs)",
          details: [
            "Utilizes NVIDIA GPUs on PMC/XMC Daughter Boards",
            "Includes on-board FPGA for customization"
          ]
        },
        {
          title: "Ground-based Defense & Ruggedized Equipment",
          details: [
            "AI-based autotracking systems for tanks and ground vehicles",
            "Design of complex harnesses and cables adhering to MIL, IEA & IPC standards",
            "Development of rugged field computers and AC-DC power supplies"
          ]
        }
      ],
      techIcons: [
        '/services/hw1.png',
        '/services/hw2.png',
        '/services/hw3.png',
      ],
    //   // ADDED techIconsLarge
    //   techIconsLarge: [
    //       '/services-details/hw1.png',
    //       '/services-details/hw2.png',
    //       '/services-details/hw3.png',
    //   ],
    },
    // {
    //   icon: "/icons/esw.png",
    //   title: "Enterprise Software Solutions",
    //   description: "As a well-reputed Research and Innovation (R&I) company, we have a proven track record in developing customized, cost-efficient, and scalable enterprise software solutions. We are a team of over 400 professionals, including 20 PhDs from esteemed global institutes, and are ISO 9001, 20000, and 27001 certified.",
    //   features: [
    //     {
    //       title: "Cloud-Native Banking & Fintech Solutions",
    //       details: [
    //         "Transforms legacy core banking systems into advanced N-tier cloud-native open-source systems.",
    //         "Enables seamless omni-channel and branchless banking, including digital account opening and biometric verification.",
    //         "Delivered solutions include a Core Banking System modernization for over 3 million customers and a biometric verification system for 1800+ devices.",
    //         "Utilizes modern technology stacks including Microservices, Kubernetes, Open Stack, and Kafka."
    //       ]
    //     },
    //     {
    //       title: "Command & Control (C4I) Systems",
    //       details: [
    //         "Develops state-of-the-art Command and Control Systems to provide situational awareness.",
    //         "Provides decision advantage for critical operations."
    //       ]
    //     },
    //     {
    //       title: "Remote IT Team & Consultancy Services",
    //       details: [
    //         "Provides access to a diverse pool of skilled professionals for remote IT team establishment.",
    //         "Reduces operational costs and allows for flexible scaling of teams with 24/7 support.",
    //         "Offers consultancy for team restructuring, IT HR, PMO setup, and process improvement."
    //       ]
    //     },
    //     {
    //       title: "Specialized Embedded Solutions",
    //       details: [
    //         "Creates robust and efficient embedded solutions for critical applications.",
    //         "Follows industry best practices for coding standards, version control, and traceability."
    //       ]
    //     }
    //   ],
    //   techIcons: [
    //     '/services/sw1.png',
    //     '/services/sw2.png',
    //     '/services/sw3.png',
    //   ],
    //   // ADDED techIconsLarge
    //   techIconsLarge: [
    //       '/services-details]/sw1.png',
    //       '/services-details]/sw2.png',
    //       '/services-details]/sw3.png',
    //   ],
    // },
    // {
    //   icon: "/icons/ai.png",
    //   title: "AI Development Services",
    //   description: "The future of businesses resides in the transformative capabilities of Artificial Intelligence (AI). We help you integrate AI in your current infrastructure by delivering state-of-the-art AI software development services. Our competent developers provide you with custom solutions perfectly tailored to your requirements.",
    //   features: [
    //     {
    //       title: "Business Analytics & Risk Prediction",
    //       details: [
    //         "Developed an advanced Business Analytics Suite for commercial banks.",
    //         "Aims to predict and mitigate money laundering, fraud, and credit risk.",
    //         "Analyzes suspicious customer behaviors using AI as the primary predictive source."
    //       ]
    //     },
    //     {
    //       title: "Advanced Detection & Tracking Systems",
    //       details: [
    //         "Designed and deployed a state-of-the-art AI system for detecting and tracking objects, people, and vehicles.",
    //         "Utilizes advanced Deep Learning and Computer Vision techniques.",
    //         "Operates in daylight, low light, and challenging conditions like rain, fog, and sandstorms with a range of up to 4km."
    //       ]
    //     },
    //     {
    //       title: "Predictive Modeling for Energy",
    //       details: [
    //         "Created an AI model to predict the power generated by a wind farm based on meteorological conditions and historical data.",
    //         "Provides real-time analysis and forecasting for the next hour up to a full year.",
    //         "Achieved an impressive predictive accuracy rate of 91%."
    //       ]
    //     },
    //     {
    //       title: "Medical Image Analysis",
    //       details: [
    //         "Engineered a specialized 'Brain Image Processor' to accelerate the detection of cancer cells or damaged tissue in MRI scans, achieving 90% accuracy.",
    //         "Created an 'Eye Blob Remover' tool that uses supervised learning to eliminate light blobs from retinal scans with 95% accuracy.",
    //         "This technology is now integrated into Ophthalmology imaging devices."
    //       ]
    //     }
    //   ],
    //   techIcons: [
    //     '/services/ai1.png',
    //     '/services/ai2.png',
    //     '/services/ai3.png',
    //   ],
    //   // ADDED techIconsLarge
    //   techIconsLarge: [
    //       '/services-details]/ai1.png',
    //       '/services-details]/ai2.png',
    //       '/services-details]/ai3.png',
    //   ],
    // }
  ];