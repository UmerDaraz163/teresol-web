import { image } from "framer-motion/client";

 // Data arrays

export const heroSlides = [
  {
    video: "/HW1.1.mp4",
    duration: 18000,
    textCues: [
      { startTime: 0, endTime: 2.16, title: "Innovatively Creative", subtitle: "Engineering forward-thinking ideas into reality." },
      { startTime: 2.16, endTime: 7.14, title: "Embedded Design Services", subtitle: "Expert solutions for your custom hardware challenges." },
      { startTime: 7.15, endTime: 9.55, title: "Wide Range of Single Board Computers", subtitle: "Powerful and versatile platforms for any project." },
      { startTime: 9.56, endTime: 13.92, title: "AI Embedded Systems", subtitle: "Bringing intelligent processing and machine learning to the edge." },
      { startTime: 13.93, endTime: 18.92, title: "Next-Gen RF Solutions", subtitle: "Advanced wireless technology for seamless connectivity." },
    ]
  },
  {
    video: "/SW1.3.mp4",
    duration: 10000,
    textCues: [
      { startTime: 0, endTime: 4, title: "Enterprise Software Solutions", subtitle: "Scalable and robust applications to empower your business." },
      { startTime: 4.01, endTime: 6.9, title: "Modernization of Legacy Systems", subtitle: "Transforming financial services for the digital age." },
      { startTime: 7, endTime: 10, title: "Serving Your World", subtitle: "Delivering technology that makes a global impact." },
    ]
  },
  {
    title: "Innovatively Creative",
    subtitle: "Transforming businesses through cutting-edge technology",
    image: "/hero2.png",
    duration: 5000
  }
];
  export const clients = [
    { name: "Pakistan Air Force", logo: "/clients/paf-logo.png" },
    { name: "Heavy Industries Taxila", logo: "/clients/HIT-01.png" },
    { name: "Advanced Navigation and Positioning Corporation", logo: "/clients/anpc.png" },
    { name: "Honda", logo: "/clients/honda.png" },
    { name: "Fauji Fertilizer Bin Qasim Ltd", logo: "/clients/ffbl.png" },
    { name: "Oil & Gas Development Company", logo: "/clients/OGDCL.png" },
    { name: "Go", logo: "/clients/go.png" },
    { name: "Albayrak", logo: "/clients/Albayrak.png" },
    { name: "Sybrid", logo: "/clients/sybrid.png" },
    { name: "Bank Al Habib", logo: "/clients/bank-al-habib.png" },
    { name: "The First MicroFinanceBank", logo: "/clients/tfmfb.png" },
    { name: "National Bank of Pakistan", logo: "/clients/nbp-logo.png" },
  ];
  export const featuredServices = [
    {
      icon: "ri-cpu-line",
      title: "Embedded Hardware Design & Development Services",
      description: "Our embedded design includes complex multi layers (18-24) high speed signal processing PCBs, Single Board Computers (SBC) for time sched-uled applications, their board support packages/APIs for external integration and complete customized end to end product (qualified for tough temperature environment) with multiple designed cards.",
      slug: "embedded-hardware-design-services",
      features:[],
      techIcons: [
        '/services/hw1.png',
        '/services/hw2.png',
        '/services/hw3.png',
      ]  
  
      // features: ["Single Board Computers (SBCs)", "Military Avionics", "Display Computer", "Control Computer", "Mission Data Recorders", "Ground-based Defense Solutions", "AI based Autotracking System", "Ruggedized Field Equipment"]
    },
    {
      icon: "/icons/esw.png",
      title: "Enterprise Software Solutions",
      description: "Well-reputed Research and Innovation (R&I) company with a proven track record in developing customized, cost efficient and scalable enterprise software solutions. We offer a comprehensive suite of services. We are a team of over 400 professionals includ- ing 20 PhDs from esteemed global institutes. We are ISO 9001, 20000, 27001 certified, guaranteeing industry-leading quality.",
      slug: "enterprise-software-solutions",
      features:[],
      techIcons: [
        '/services/sw1.png',
        '/services/sw2.png',
        '/services/sw3.png',
      ]
  
      // features: ["Command, Control, Communications, Computers and Intelligence (C4I) System", "Banking", "Fintech", "Embedded Solutions"]
    },
    {
      icon: "/icons/ai.png",
      title: "AI Development Services",
      description: "The future of businesses reside in the transformative capabilities of Artificial Intelligence (AI). We help you integrate AI in your current infrastructure by delivering state-of-art AI software development services. Our competent developers provide you with custom solutions perfectly tailored to your requirements.",
      slug: "ai-development-services",
      features:[],
      techIcons: [
        '/services/ai1.png',
        '/services/ai2.png',
        '/services/ai3.png',
      ]
      // features: ["Business Analytics Suite", "AI Detection and Tracking System", "Wind Power Estimation", "Brain Image Processing", "Eye Blob Remover",]
    }
    // {
    //   icon: "ri-dashboard-line",
    //   title: "Automotive Electronics",
    //   description: "TeReSol has successfully developed and delivered advanced automotive electronics and access control systems, offering end-to-end lifecycle support. Trusted by leading corporate clients across Pakistan, our solutions ensure reliability, efficiency, and innovation",
    //   features: ["Fleet Management Solution", "Vehicle Infotainment System"]
    // }
  ];
  export const markers = [
    {
      name: "Zambia",
      position: { top: '54%', left: '50%' },
      color: "#198A00",
      text: ""
    },
    {
      name: "Pakistan",
      position: { top: '38%', left: '65%' },
      color: "#01411C",
      text: ""
    },
    {
      name: "Qatar",
      position: { top: '44%', left: '60%' },
      color: "#8A1538",
      text: ""
    },
    {
      name: "Singapore",
      position: { top: '49%', left: '83%' },
      color: "#EE2536",
      text: ""
    },
    {
      name: "France",
      position: { top: '25%', left: '42%' },
      color: "#EF4135",
      text: ""
    },
    {
      name: "USA",
      position: { top: '30%', left: '15%' },
      color: "#3C3B6E",
      text: ""
    }
  ];
  export const stats = [
    {
      value: "100+",
      title: "Clients Served",
      subtitle: "Across various industries",
      colorClasses: "text-green-600",
      borderClasses: "from-green-500 to-emerald-700"
    },
    {
      value: "15+",
      title: "Years Experience",
      subtitle: "Pioneering Excellence, Shaping the Future",
      colorClasses: "text-orange-600",
      borderClasses: "from-red-600 to-pink-700"
    },
    {
      value: "24/7",
      title: "Client Support",
      subtitle: "Round-the-clock availability",
      colorClasses: "text-red-600",
      borderClasses: "from-red-600 to-pink-700"
    },
    {
      value: "5+",
      title: "Countries Reached",
      subtitle: "Expanding worldwide every year",
      colorClasses: "text-blue-700",
      borderClasses: "from-blue-600 to-indigo-900"
    },
    
  ];
  export const certifications = [
    {
      title: "ISO 9001",
      description: "Standard For Quality Management Systems",
      image: "/iso9001.png"
    },
    {
      title: "ISO 20000",
      description: "International IT Service Management Standard",
      image: "/iso2000-01.png"
    },
    {
      title: "MIL-STD-704 COMPLIANT",
      description: "    U.S. military standard that defines the characteristics of electrical power provided to equipment on military aircraft.",
      image: "/mil-std-704.png"
    },
    {
      title: "MIL-STD-461 COMPLIANT",
      description: "Military standard that specifies requirements for the control of electromagnetic interference (EMI) characteristics of electronic equipment and subsystems",
      image: "/mil-std-461.png"
    },
    {
      title: "MIL-STD-810 COMPLIANT",
      description: "Military standard that establishes environmental engineering considerations and laboratory tests to assess the performance of equipment under various environmental conditions.",
      image: "/mil-std-810.png"
    },
  ];
  export const memberships = [
    {
      title: "P@SHA Member",
      description: "Pakistan Software Houses Association",
      image: "/PASHA.png"
    },
    {
      title: "PSEB",
      description: "Quality Management Systems",
      image: "/PSEB.png"
    },
    {
      title: "PTA",
      description: "Regulatory Body For Telecom",
      image: "/PTA.png"
    },
    {
      title: "PAeC",
      description: "Defense Contractor And An Aerospace Manufacturer",
      image: "/PAec-01.png"
    }
  ];
  export const featuredBlogs = [
    {
      title: "TeReSol featured in top ICT companies list in latest report by Japan International Cooperation Agency (JICA)",
      excerpt: "State-run Japan International Cooperation Agency (JICA) has termed Pakistan as ‘the next ICT powerhouse’ as the country’s tech exports climbed six times over a decade. The report is based on a yearlong study by JICA in collaboration with Pakistan Embassy Tokyo. <br> TeReSol got recognized as a fast-growing R&D company and is included in ‘Featured ICT Companies’",
      date: "December 15, 2024",
      category: "Technology",
      image: "/blogs/JICA-News.jpg",
      readTime: "1 min read"
    },
    {
      title: "Signing of MoU with the Institute of Space Technology (IST)",
      excerpt: "TeReSol has joined hands with Institute of Space Technology (IST) by signing Memorandum of Understanding (MoU) to promote University-Industry collaboration through joint research and development activities.",
      date: "December 10, 2024",
      category: "Corporate News",
      image: "/blogs/mou-ist-teresol.png",
      readTime: "3 min read"
    },
    {
      title: "TeReSol won an award at PaSHA ICT Awards 2016",
      excerpt: "P@SHA organised its 13th annual ICT Awards Ceremony, lauding innovation and excellence in the Pakistan ICT industry and recognized the efforts of outstanding achievers who have been making waves locally and internationally.",
      date: "December 5, 2024",
      category: "Corporate News",
      image: "/blogs/pasha-award.png",
      readTime: "6 min read"
    }
  ];