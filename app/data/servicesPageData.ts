// Define the shape of a detailed feature object
export type FeatureDetail = {
    title: string;
    details: string[];
};
  
  export type Service = {
    icon: string;
    title:string;
    description: string;
    slug: string; // Unique identifier for the service, used in URLs
    features: string[] | FeatureDetail[];
    techIcons: string[];
    // techIconsLarge?: string[]; // New property for large images
};
  
  // Export the array of services data
  export const services: Service[] = [
  {
      icon: "ri-cpu-line",
      title: "Embedded Hardware Design Services",
      description: "Our embedded design includes complex multi-layers (18-24) high-speed signal processing PCBs, Single Board Computers (SBC) for time-scheduled applications, their board support packages/APIs for integration, and complete customized end-to-end product (qualified for tough temperature environment) with multiple designed cards.",
      slug: "embedded-hardware-design-services",
      features: [
      {
          title: "Single Board Computers (SBCs)",
          details: [
          "Offer a wide range of configurations including PowerPC & ARM architectures",
          "Support various form factors like Qseven, SMARC, SO-DIMM, and HPC",
          // "PowerPC features: VME 64/64x interface, Ethernet/Serials/OS, and low power consumption",
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
  {
    "icon": "/icons/esw.png",
    "title": "Enterprise Software Solutions",
    "description": "Well-reputed Research and Innovation (R&I) company with a proven track record in developing customized, cost efficient and scalable enterprise software solutions. We offer a comprehensive suite of services. We are a team of over 400 professionals includ- ing 20 PhDs from esteemed global institutes. We are ISO 9001, 20000, 27001 certified, guaranteeing industry-leading quality.",
    "slug": "enterprise-software-solutions",
    "features": [
      {
        "title": "Cloud-Native Banking & Fintech Solutions",
        "details": [
          "Modernizes large-scale legacy systems (e.g., a core banking solution with ~20 million+ lines of code for 1000+ branches and 1255+ ATMs) into advanced N-tier cloud-native, open-source architectures.",
          "Employs a unique requirement gathering process and detailed code analysis using Data Flow Diagrams (DFDs) and Class Diagrams with a human-in-the-loop mechanism.",
          "Enables seamless omni-channel and branchless banking through innovative digital tools, such as a secure Digital Account Opening app and a large-scale Biometric Verification System deployed on over 1800 devices for government pensioners.",
          "Achieves significant outcomes, including making systems future-ready for Digital and Open Banking, and reducing annual license costs by over 50%.",
          "Utilizes modern, scalable tech stacks including Microservices, Kubernetes, Open Stack, Kafka, and enterprise APIs (e.g., Temenos) within a secure mesh network."
        ]
      },
      // {
      //   "title": "Command & Control (C4I) Systems",
      //   "details": [
      //     "Develops state-of-the-art C4I systems designed to NATO standards for decisive action in complex operational scenarios.",
      //     "Built on an Enterprise Service Bus architecture with a robust AAA security framework.",
      //     "Integrates GIS, MIL-STD 2525C symbology, and various sensors to enable seamless Sensor-to-Shooter connectivity.",
      //     "Key components include Blue Force Tracking, an enterprise Video Management System (VMS) with H.265 compression, and handheld device applications."
      //   ]
      // },
      {
        "title": "Remote IT Team & Consultancy Services",
        "details": [
          "Provides access to a diverse pool of skilled professionals for remote IT team establishment, reducing operational costs.",
          "Offers flexible team scaling with 24/7 support and operations.",
          "Provides expert consultancy in: team restructuring, IT HR & onboarding, PMO setup, team training, and process establishment."
        ]
      },
      {
        "title": "Specialized Embedded Solutions",
        "details": [
          "Creates robust and efficient embedded solutions for critical applications.",
          "Follows industry best practices for coding standards, version control, and traceability.",
          "Expertise in designing complex, multi-layer (18-24) high-speed signal processing PCBs.",
          "Delivers end-to-end products qualified for harsh environments."
        ]
      }
    ],
    "techIcons": [
      "/services/sw1.png",
      "/services/sw2.png",
      "/services/sw3.png"
    ],
    // "techIconsLarge": [
    //   "/services-detail/sw1.png",
    //   "/services-detail/sw2.png",
    //   "/services-detail/sw3.png"
    // ]
  },
  {
    "icon": "/icons/ai.png",
    "title": "AI Development Services",
    "description": "The future of businesses resides in the transformative capabilities of Artificial Intelligence (AI). We help you integrate AI in your current infrastructure by delivering state-of-the-art AI software development services. Our competent developers provide you with custom solutions perfectly tailored to your requirements.",
    "slug": "ai-development-services",
    "features": [
      {
        "title": "Custom Integration & Tailored Solutions",
        "details": [
          "Focus on seamlessly integrating state-of-the-art AI capabilities into your existing infrastructure.",
          "Development of custom AI solutions that are perfectly tailored to meet unique client requirements and objectives."
        ]
      },
      {
        "title": "Core AI/ML Capabilities & Tools",
        "details": [
          "Expertise across key AI domains: Machine Learning (ML), Deep Learning (DL), Natural Language Processing (NLP), Computer Vision (CV), and Human-Computer Interaction (HCI).",
          "Proficiency in modern AI frameworks and tools including PyTorch, TensorFlow, OpenCV, AlexNet, and ResNet."
        ]
      },
      {
        "title": "Business Analytics & Risk Prediction",
        "details": [
          "Developed an advanced Business Analytics Suite for commercial banks, motivated by insights from social engineering algorithms.",
          "Aims to predict and mitigate money laundering, fraud, and credit risk.",
          "Analyzes suspicious customer behaviors using AI as the primary predictive source."
        ]
      },
      {
        "title": "Advanced Detection & Tracking Systems",
        "details": [
          "Designed and deployed a state-of-the-art AI system for detecting and tracking objects, people, and vehicles.",
          "Utilizes advanced Deep Learning and Computer Vision techniques.",
          "Operates in daylight, low light, and challenging conditions like rain, fog, and sandstorms with a remarkable range of up to 4km."
        ]
      },
      {
        "title": "Predictive Modeling for Energy",
        "details": [
          "Created an AI model to predict the power generated by a wind farm based on meteorological conditions and historical data.",
          "Provides real-time analysis and forecasting for the next hour up to a full year.",
          "Achieved an impressive predictive accuracy rate of 91%."
        ]
      },
      {
        "title": "Medical Image Analysis",
        "details": [
          "Solves complex medical imaging challenges such as detecting anomalies in MRI scans and removing artifacts from retinal images.",
          "Engineered a specialized 'Brain Image Processor' to accelerate the detection of cancer cells or damaged tissue, achieving 90% accuracy via unsupervised learning.",
          "Created an 'Eye Blob Remover' tool that uses supervised learning to eliminate light blobs from retinal scans with 95% accuracy.",
          "This technology is now successfully integrated into Ophthalmology imaging devices."
        ]
      }
    ],
    "techIcons": [
      "/services/ai1.png",
      "/services/ai2.png",
      "/services/ai3.png"
    ],
    // "techIconsLarge": [
    //     "/services-detail/ai1.png",
    //     "/services-detail/ai2.png",
    //     "/services-detail/ai3.png"
    // ]
  }
];