import { notFound } from "next/navigation";
import TeamMemberPage from "@/components/TeamMemberPage";

// Centralized team data (could also be imported from a separate file)
const team = [
  {
    slug: "dr-muhammad-faisal-khan",
    name: "Dr. Muhammad Faisal Khan",
    role: "CEO",
    image: "/leadership/CEO.png",
    intro: `Dr. Muhammad Faisal Khan is a highly accomplished and experienced technology innovator. He is a seasoned entrepreneur, who sequentially co-founded TeReSol and KRTECH Private Limited, Pakistan; both research-based organizations. Dr. Khan has been leading the companies as Chief Executive Officer since 2017. Prior to founding TeReSol, Dr. Khan also served as an Assistant Professor at the National University of Sciences and Technology (NUST) from February 2009 to April 2014. <br /><br />
Currently Dr. Khan is heading workforce of more than 400 Engineers and 20 PhDs. He specializes in hardware and software architecture designing, embedded systems, signal analysis, system integration (mechanical and electrical) and image processing. Dr. Khan's expertise and commitment have been instrumental in positioning TeReSol as a leader in open architecture computing and electronic systems for aerospace, defense, and industrial applications. His team has successfully produced six top of the line products for defense as well as private sector under his dynamic lead. Under his leadership, TeReSol has been recognized as a fast-growing R&D company, notably being featured in the Japan International Cooperation Agency's (JICA) report highlighting Pakistan as 'the next ICT powerhouse'. <br /><br />
Dr. Khan is also the member of National Committee on Research & Development, R&D Division, Higher Education Commission, Government of Pakistan and has been awarded RCCI ICT Company of the Year 2015 as well as P@SHA Award for health and wellbeing sector 2016 in Pakistan.
Dr. Muhammad Faisal Khan is a published author with over twelve internationally recognized journal and conference papers to his credit.`,
    teamMembers: [
      // { name: "Farooq Umer Khan", image: "/leadership/CTOo.webp", role: "CTO" },
      // { name: "Dr. Bilal Rauf", image: "/leadership/CIO1.webp", role: "CIO" },
    ],
  },
  {
    slug: "dr-naveed-iqbal",
    name: "Dr. Naveed Iqbal",
    role: "COO",
    image: "/leadership/COO.webp",
    intro: `Dr Naveed is a serial entrepreneur, with an acumen of designing innovatively creative products. He has served as VP engineering for a decade and was responsible for transformation of user idea into a high-level product design and its translation into product features; selection of available technology; supervise and guide teams while making “product development plan” and designing & testing of core algorithms; etc. Presently, he is managing operations of 400+ engineers team in multiple cities and countries as COO.<br /><br />
Dr Naveed has served as teaching & research faculty in Military College of Signals (A constituent College of NUST) 2007 till 2020. During these years, he taught various subjects related to Advance Signal & Image Processing, supervised MS & PhD students in this domain. Moreover, he served as Head of Computer Software Engineering department for two years and supervised academic management of more than 300 students. During this time, he established a national research center in field of Image Processing Center with funding of Ministry of Sciences and Technology Pakistan, won and completed multiple national & international academic research fundings including from DaaD (Germany) for many years, represented Pakistan in various academic events under Higher Education Commission of Pakistan banner etc.<br /><br />
In 2010, Dr Naveed was selected by US Department of Commerce (through their Commercial Law Development Program - CLDP program) as top ten emerging academic entrepreneurs from Pakistan for Professional Entrepreneurship training at USA and have worked with many US AIDS program and been referred as a success story many times.<br /><br />
As part of Corporate Social Responsibility, Dr Naveed is on industrial advisory board panel in multiple universities including Capital University (CUST), Air University, etc.  part of steering committee of National Robotics Center, Pakistan and member of Government Regulatory Committee in Pakistan Software Houses Association (PASHA) on volunteer basis.
Dr. Naveed Iqbal is a published author with over twelve internationally recognized journal and conference papers to his credit.`,
    teamMembers: [
      // { name: "Sara Ahmed", image: "/place-holder.jpg" },
      // { name: "Usman Tariq", image: "/place-holder.jpg" },
      // { name: "Maryam Noor", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "dr-ahmad-muqeem-sheri",
    name: "Dr. Ahmad Muqeem Sheri",
    role: "CDO",
    image: "/leadership/CDO.jpeg",
    intro: `Dr. Ahmad Muqeem Sheri did his PHD in Machine Learning from Gwangju Institute of Science and Technology, South Korea. He is working as Chief Design Officer in TeReSol Pvt. Ltd. since July 2019. He served as Research Professor in GIST, South Korea. He also worked as Assistant Professor at National University of Sciences and Technology. <br></br> As project director in TeReSol Pvt Ltd., his key responsibilities include project planning, managing development teams, monitoring progress, liaising between front-end and back-end teams and documenting the project at different stages. His technical skills include C/C++, Java, JS, software engineering, DevOps strategy, software architecture. Currently, he is working on BAHL core banking system project.`,
    teamMembers: [],
  },
  {
    slug: "mansoor-ahmad-khan",
    name: "Mansoor Ahmad Khan",
    role: "CMO",
    image: "/leadership/CMO2.png",
    intro: `Mansoor Ahmed Khan – Chief Marketing Officer, Teresol (Pvt.) Ltd.
Mansoor Khan is a seasoned business leader with over 35+ years of experience, recognized for driving organizational growth, developing high-performing teams, and building long-term stakeholder relationships. For more than thirty-five(35) years, he has been at the forefront of Pakistan’s offshore software development industry. He founded Rel-Soft (Pvt.) Ltd., later acquired by VentureChest, a Venture Capital Fund and restructured as Makabu (Pvt.) Ltd. in 2000. Since then, as CEO of Makabu, he has overseen strategy, marketing, client relations, project delivery, financial management, and team development, transforming the company into a progressive organization with a strong international footprint.
<br></br> In 2016, Mansoor Khan took on the role of Chief Marketing Officer at Teresol (Pvt.) Ltd., where he leads the company’s marketing, sales, and business development initiatives. His mandate is to drive sustainable business growth by developing new client relationships, expanding into targeted industries, and strengthening Teresol’s product and service ecosystem. Mansoor Khan is also responsible for building strategic alliances, enhancing Teresol’s international portfolio, and ensuring the company remains aligned with its vision of innovation and excellence.
<br></br> Beyond his corporate responsibilities, Mansoor Khan is deeply engaged in community and professional initiatives. He serves as a Trustee of JAQ Education Trust, an organization committed to educational development, and as a Board Member of OPEN Islamabad, a global network fostering entrepreneurship and professional growth.
With a proven record of leadership and a passion for fostering innovation, Mansoor Khan  brings both vision and execution to his role. His extensive experience and strategic direction continue to play a central role in positioning Teresol as a forward-looking and client-focused organization.`,
    teamMembers: [],
  },
  {
    slug: "farooq-umer-khan",
    name: "Farooq Umer Khan",
    role: "CTO",
    image: "/leadership/CTO2o.webp",
    intro: `Mr. Farooq Umer Khan is an Aeronautical (Avionics) Engineer with 30 years of professional experience spanning Research & Development and Project Management. Currently serving as Chief Technology Officer (CTO), he leverages decades of technical and leadership experience to drive innovation, oversee complex projects, and deliver cutting-edge solutions.

<br></br> A highly accomplished technology innovator, he specializes in hardware and software architecture design, embedded systems, signal analysis, and system integration. With a strong background in design engineering and system development, he combines strategic vision with deep technical insight, enabling organizations to achieve both technological advancement and operational excellence.

<br></br> He has extensive applied research experience and has successfully developed numerous electronic systems currently deployed in various types of aircraft and ground platforms. His expertise and dedication played a key role in establishing TeReSol as a leader in open-architecture computing and electronic systems for aerospace, defense, and industrial applications.

<br></br> Earlier in his career, he served in the Pakistan Air Force as part of the engineering branch, where he managed projects of diverse scope and complexity at organizational, national, and international levels while holding senior management positions. Mr. Khan is also a published author with multiple internationally recognized conference papers to his credit`,

    teamMembers: [
      {
        name: "Dr. Shahzad Arshad",
        image: "/leadership/staff/DrShahzadArshad.jpeg",
        role: "Project Director Radio Frequency",
        intro:
          "Dr. Shahzad Arshad serves as Project Director-RF & Microwave Systems at TeReSol, leveraging over 20 years of experience in RF systems design to spearhead the end-to-end development of radar and wireless comm systems. He brings extensive experience in leading technical teams for technology development projects, adeptly guiding cross-functional teams to achieve project milestones and drive innovation.",
      },
      {
        name: "Adeel Tariq",
        image: "/leadership/staff/AdeelTariq.webp",
        role: "Project Director Technical Support",
        intro:
          "With 27+ years of distinguished experience, he has successfully managed radar, avionics and system integration programs at national and international levels. As Project Director (Technical Support), he leads end-to-end program delivery; spanning hardware, production, logistics and networks, while driving innovation, efficiency and customer satisfaction. A seasoned professional who is passionate about transforming complex challenges into enduring successes.",
      },
      {
        name: "Raheel Bari",
        image: "/leadership/staff/RaheelBari.webp",
        role: "Project Director Embedded Systems",
        intro:
          "Mr. Raheel Bari is working as Project Director-Embedded Systems at TeReSol with overall 20+ years of experience in embedded hardware, firmware, and system architecture. He drives complex product development from concept to certification, delivering high-reliability, standards-compliant electronics system",
      },
      {
        name: "Danyal Sajid",
        image: "/leadership/staff/DanyalSajid.webp",
        role: "Project Director Embedded Systems",
        intro:
          "Mr. Danyal Sajid is working as Project Director-Embedded Systems at TeReSol with over 25 years of experience leading communications and embedded system development projects. He brings unmatched expertise in DSP/FPGA hardware–software design, RF spectrum monitoring, and avionics system integration. Renowned for driving innovation and mission-critical solutions, he excels in managing complex R&D initiatives from concept to deployment.",
      },
    ],
  },
  {
    slug: "dr-bilal-rauf",
    name: "Dr. Bilal Rauf",
    role: "CIO",
    image: "/leadership/CIO1.webp",
    intro: `Dr. Bilal Rauf holds a Ph.D. in Information Security from the National University of Sciences and Technology (NUST), Pakistan. He has been serving as the Chief Information Officer (Software) at TeReSol Pvt. Ltd. since June 2021. Prior to joining TeReSol, he worked as an Assistant Professor at NUST.
<br></br>As Project Director at TeReSol, Dr. Rauf oversees project planning and execution, manages front-end development teams, ensures seamless integration of front-end applications, and monitors overall project progress and deliverables. His responsibilities also include dividing tasks into manageable components, overseeing deployment activities, addressing quality assurance (QA) issues, facilitating coordination between front-end and back-end teams, and maintaining project documentation throughout various stages.
<br></br>Dr. Rauf possesses strong technical expertise in JavaScript, Java, CSS, Python, C/C++, SQL, Nmap, and Vue.js. He is currently leading work on IFRS 9 compliance and Core Banking System projects.`,
    teamMembers: [],
  },
  {
    slug: "aamir-masood",
    name: "Aamir Masood",
    role: "CPO",
    image: "/leadership/CPO.png",
    intro: `Aamir Masood Khan is a Leadership professional with 25+ years of diverse experience in Acedemia, R&D, and the corporate sector. He has worked with globally renowned MNCs like Siemens, Nokia, and Ericsson in multiple positions – transitioning from pure technical roles to senior leadership positions. 
<br></br> Aamir started his professional career as the Gold Medalist of the first batch of NUST, and later on completed his two Masters degrees with distinction – first from ISU, USA and second from CASE, PAK.
<br></br> In his early career, he worked as a faculty member at NUST for six years, where his contributions in teaching and research were recognized at multiple forums. 
<br></br> Aamir has played a key role in telecommunication industry’s growth of Pakistan during his experience at Siemens, Nokia Siemens Networks, Ericsson, Nexus Telecom, and Mobilink (now Jazz). He has held regional and global assignments that have helped him work with diverse teams to achieve significant milestones.  He has successfully completed multiple technical, management, and leadership certifications/trainings from Pakistan, UAE, Germany, Thailand, and Finland.   
<br></br> Aamir has contributed significantly to high-impact national projects as the COO of National Testing Service (NTS), and later on as the CEO of TEPS (a technology partner of PMC for digitization of various tests within Pakistan, and at international level).`,
    teamMembers: [],
  },
  {
    slug: "babar-amin",
    name: "Babar Amin",
    role: "Adv Intl Project",
    image: "/leadership/Adv-Intl-Project.png",
    intro: `Ambassador Babar Amin is currently serving as Advisor for Foreign Business Development with TeReSol®, Pakistan. He previously had a distinguished 33-year career in the Foreign Service of Pakistan, retiring at the rank of Special Foreign Secretary (BS-22). His notable diplomatic assignments included serving as High Commissioner of Pakistan to Australia, Ambassador to Norway, Deputy High Commissioner to India, and Consul General in Guangzhou, China. At the Ministry of Foreign Affairs in Islamabad, he held senior positions including Additional Foreign Secretary and National Coordinator for the SCO, as well as Director General for China, CARs & ECO, and Policy Planning & Public Diplomacy. Before joining the Foreign Service, he served as a Provincial Service Officer with the Government of Punjab in administrative roles.

<br></br> Throughout his diplomatic career, Ambassador Amin was deeply engaged in advancing economic, trade, investment, educational, scientific, and technological cooperation with partner countries. He worked across G2G, G2B, and B2B platforms, as well as hybrid engagement models. He led numerous government and private sector negotiations in the fields of economic policy, trade, investment, and taxation, and facilitated partnerships between Pakistani and foreign enterprises in sectors such as IT and software, manufacturing, services, and agriculture.

<br></br> Beyond his professional career, Ambassador Amin continues to contribute actively to intellectual and policy discourse. He regularly participates in international and domestic conferences, seminars, and roundtables, and writes op-eds for leading newspapers and journals. He is a member of the Academic Committee of the Foreign Service Academy of Pakistan, where he also serves as guest faculty, in addition to teaching at Quaid-i-Azam University, Islamabad.`,
    teamMembers: [],
  },
  {
    slug: "air-cdre-asim-adnan-r",
    name: "Air Cdre Asim Adnan (R)",
    role: "Adv Avcs",
    image: "/leadership/Adv Avcs.jpeg",
    intro: `Air Cdre Asim Adnan (R) is an accomplished Avionics Engineer with over 40 years of distinguished service in the Pakistan Air Force (PAF). Since October 2016, he has been serving as Advisor Aviation & Special Projects at TeReSol Pvt. Ltd., where he contributes his extensive expertise in aerospace and defense systems.
<br></br> Over the course of his career, he has held several senior positions, including Deputy Director General at AERO, Pakistan, where he led a multidisciplinary team of over 100 engineers and 150 technicians in developing advanced aerospace and avionics systems in compliance with AS-9100 Aerospace Standards. As Assistant Chief of Air Staff at PAF Headquarters, Islamabad, he provided strategic support on the life cycle maintenance of aviation systems. Earlier, as Technical Attaché at the Pakistan Embassy in Berlin, he established strong linkages with leading European aerospace and defense OEMs, managing procurement, contract negotiations, life cycle support, and follow-up activities.
<br></br> He also served as Director of Electronic Warfare Systems, overseeing nationwide management of PAF’s EW capabilities. With more than four decades of professional experience, he has specialized in the induction, commissioning, and life cycle management of aerospace and avionics systems from U.S., European, and Chinese OEMs, contributing significantly to the modernization of the PAF.
<br></br> Licensed by the CAA Pakistan as an Aircraft Maintenance Engineer (Boeing 737-200), he has hands-on expertise in line and C-check maintenance of Boeing 737 and Falcon DA-20 aircraft, along with EW-related modifications of C-130 systems. His experience further includes depot-level maintenance of radar, C4I, environmental control, and power generation systems.
<br></br> His international exposure includes coordinating with German regulatory authorities on export controls and negotiating contracts with global manufacturers such as EADS, Saab-Ericsson, Aselsan, Mectron, and CETC for major PAF and PAC Kamra projects.
<br></br> He has also completed several advanced professional courses, including the Senior Engineering Management Course at PAF College of Aeronautical Engineering, the Air War Course at PAF Air War College, Karachi, and technical certifications in avionics, radar, EW, and aircraft maintenance from international institutions in Germany, USA, Sri Lanka, and Malaysia.
<br></br> For his outstanding professional achievements, he has been awarded the Sitara-i-Imtiaz (Military) by the President of Pakistan, along with multiple commendations and certificates of merit from the Chief of the Air Staff, PAF, including recognition for excellence on Special Mission DA-20 Aircraft, successful modification of the Marconi Condor Radar System, and best performance in project work during BE (Avionics).`,
    teamMembers: [],
  },
  {
    slug: "col-abdul-rauf-sim-r",
    name: "Col Abdul Rauf SI(M) (R)",
    role: "Adv Grd Def Proj",
    image: "/leadership/Adv-GrdDef-Proj.png",
    intro: `Col (Retd.) Abdul Rauf, a BSc Telecom Engineering graduate from UET Lahore, is currently serving as the Project Director at TeReSol Pvt Ltd. He specializes in communications, with over 25 years of experience in planning, operations, and maintenance of various communication systems, including optical fiber, satellite, and field communication networks. He has extensive expertise in designing, operating, and maintaining VSAT networks.<br></br>
With approximately 30 years of service in the Pakistan Army, he has held various command and staff appointments, gaining significant experience in personnel management, communication operations, and training activities at multiple levels. In addition to his military tenure, he has spent about eight years in procurement, contract management, and defense industrial management. He firmly believes in the core values of honesty, loyalty, and hard work.`,
    teamMembers: [],
  },
  {
    slug: "muhammad-jamal-shah",
    name: "Muhammad Jamal Shah",
    role: "Director Operations",
    image: "/leadership/DirOps.webp",
    intro: `Lt. Col. (Rted) Muhammad Jamal Shah did his Master’s in Business Administration from University of Engineering and Technology (UET), Taxila, Pakistan. He is working as Director Operations in TeReSol Pvt. Ltd. since 2012. His ability to analyze diverse information and formulate recommendations quickly is a unique quality of his. His skills include ability to motivate others, strategic thinking, multi-functional team experience, tolerance of ambiguity; flexibility, interpersonal skills and ability to recognize key factors in extensive data.`,
    teamMembers: [],
  },
];

export async function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export default async function TeamMemberProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const member = team.find((m) => m.slug === slug);

  if (!member) return notFound();

  return <TeamMemberPage member={member} />;
}
