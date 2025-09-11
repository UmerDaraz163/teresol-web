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
    intro: `Dr. Ahmad drives digital innovation at Teresol, focusing on 
    data-driven strategies and modern transformation practices.`,
    teamMembers: [
      { name: "Imran Ali", image: "/place-holder.jpg" },
      { name: "Kiran Fatima", image: "/place-holder.jpg" },
      { name: "Zeeshan Malik", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "mansoor-ahmad-khan",
    name: "Mansoor Ahmad Khan",
    role: "CMO",
    image: "/leadership/CMO2.png",
    intro: `Mansoor leads the marketing initiatives at Teresol, building
    brand value and customer engagement through innovative campaigns.`,
    teamMembers: [
      { name: "Hira Shah", image: "/place-holder.jpg" },
      { name: "Bilal Asif", image: "/place-holder.jpg" },
      { name: "Ayesha Khan", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "farooq-umer-khan",
    name: "Farooq Umer Khan",
    role: "CTO",
    image: "/leadership/CTOo.webp",
    intro: `Mr. Farooq Umer Khan is an Aeronautical (Avionics) Engineer with 30 years of professional experience spanning Research & Development and Project Management. Currently serving as Chief Technology Officer (CTO), he leverages decades of technical and leadership experience to drive innovation, oversee complex projects, and deliver cutting-edge solutions.

<br></br> A highly accomplished technology innovator, he specializes in hardware and software architecture design, embedded systems, signal analysis, and system integration. With a strong background in design engineering and system development, he combines strategic vision with deep technical insight, enabling organizations to achieve both technological advancement and operational excellence.

<br></br> He has extensive applied research experience and has successfully developed numerous electronic systems currently deployed in various types of aircraft and ground platforms. His expertise and dedication played a key role in establishing TeReSol as a leader in open-architecture computing and electronic systems for aerospace, defense, and industrial applications.

<br></br> Earlier in his career, he served in the Pakistan Air Force as part of the engineering branch, where he managed projects of diverse scope and complexity at organizational, national, and international levels while holding senior management positions. Mr. Khan is also a published author with multiple internationally recognized conference papers to his credit`,

    teamMembers: [
      {
        name: "Dr. Shahzad Arshad",
        image: "/leadership/staff/Dr. Shahzad Arshad.jpeg",
        role: "Project Director Radio Frequency",
        intro:
          "With over 30 years of experience, Specialized in radio frequency systems, ensuring reliable communication and signal integrity across projects. Focused on designing, testing, and optimizing RF solutions for advanced defense technologies.",
      },
      {
        name: "Adeel Tariq",
        image: "/leadership/staff/Adeel Tariq.jpeg",
        role: "Project Director Technical Support",
        intro:
          "With over 25 years of experince in relative field, Dedicated to providing end-to-end technical assistance, ensuring smooth operation of systems and tools. Skilled in troubleshooting, resolving issues, and supporting teams to maintain peak efficiency.",
      },
      {
        name: "Raheel Bari",
        image: "/leadership/staff/Raheel Bari.webp",
        role: "Project Director Embedded Systems",
        intro:
          "Mr. Raheel Bari is working as Project Director – Embedded Systems at TeReSol with overall 20+ years of experience in embedded hardware, firmware, and system architecture. He drives complex product development from concept to certification, delivering high-reliability, standards-compliant electronics systems for aerospace and defense applications.",
      },
      {
        name: "Daniyal Islam",
        image: "/place-holder.jpg",
        role: "Project Director Embedded Systems",
        intro:
          "Focused on developing and optimizing embedded systems that power critical applications. Skilled in firmware design, hardware-software integration, and delivering reliable real-time solutions.",
      },
    ],
  },
  {
    slug: "dr-bilal-rauf",
    name: "Dr. Bilal Rauf",
    role: "CIO",
    image: "/leadership/CIO1.webp",
    intro: `Dr. Bilal manages information systems and IT strategy, aligning
    technology resources with business objectives.`,
    teamMembers: [
      { name: "Hassan Raza", image: "/place-holder.jpg" },
      { name: "Maha Qureshi", image: "/place-holder.jpg" },
      { name: "Adnan Farid", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "aamir-masood",
    name: "Aamir Masood",
    role: "CPO",
    image: "/leadership/CPO.png",
    intro: `Aamir drives product strategy and development, ensuring Teresol
    delivers impactful and market-ready solutions.`,
    teamMembers: [
      { name: "Nida Khan", image: "/place-holder.jpg" },
      { name: "Rashid Ali", image: "/place-holder.jpg" },
      { name: "Zainab Mirza", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "babar-amin",
    name: "Babar Amin",
    role: "Adv Intl Project",
    image: "/leadership/Adv-Intl-Project.png",
    intro: `Babar advises on international projects, bringing a wealth of
    global experience to Teresol's ventures.`,
    teamMembers: [
      { name: "Ali Raza", image: "/place-holder.jpg" },
      { name: "Sadia Noor", image: "/place-holder.jpg" },
      { name: "Ahmed Jan", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "air-cdre-asim-adnan-r",
    name: "Air Cdre Asim Adnan (R)",
    role: "Adv Avcs",
    image: "/leadership/Adv Avcs.jpeg",
    intro: `Asim brings aerospace and defense expertise, advising Teresol on
    advanced systems and strategic initiatives.`,
    teamMembers: [
      { name: "Waqas Hanif", image: "/place-holder.jpg" },
      { name: "Saira Malik", image: "/place-holder.jpg" },
      { name: "Jawad Yousaf", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "col-abdul-rauf-sim-r",
    name: "Col Abdul Rauf SI(M) (R)",
    role: "Adv Grd Def Proj",
    image: "/leadership/Adv-GrdDef-Proj.png",
    intro: `Col Abdul Rauf advises Teresol on ground defense projects, providing
    critical military and defense expertise.`,
    teamMembers: [
      { name: "Moiz Khan", image: "/place-holder.jpg" },
      { name: "Fatima Aslam", image: "/place-holder.jpg" },
      { name: "Kashif Mehmood", image: "/place-holder.jpg" },
    ],
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
