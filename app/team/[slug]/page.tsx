import { notFound } from "next/navigation";
import TeamMemberPage from "@/components/TeamMemberPage";

// Centralized team data (could also be imported from a separate file)
const team = [
  {
    slug: "dr-muhammad-faisal-khan",
    name: "Dr. Muhammad Faisal Khan",
    role: "CEO",
    image: "/leadership/CEO.png",
    intro: `Dr. Faisal leads Teresol with a vision for innovation and growth, 
    guiding the company's strategy and long-term goals with deep expertise in technology leadership.`,
    teamMembers: [
      { name: "Huzaifa", image: "/place-holder.jpg" },
      { name: "Umer", image: "/place-holder.jpg" },
      { name: "Ali Khan", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "dr-naveed-iqbal",
    name: "Dr. Naveed Iqbal",
    role: "COO",
    image: "/leadership/COO.webp",
    intro: `Dr. Naveed oversees operational excellence at Teresol, ensuring
    smooth delivery of projects and client satisfaction. He has deep expertise
    in large-scale system implementation.`,
    teamMembers: [
      { name: "Sara Ahmed", image: "/place-holder.jpg" },
      { name: "Usman Tariq", image: "/place-holder.jpg" },
      { name: "Maryam Noor", image: "/place-holder.jpg" },
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
    intro: `Mr Muhammad Farooq Umer Khan is an Aeronautical (Avionics) Engineer with more than 30 years of professional experience across varied domains of Research and Development and Project Management.<br /><br />
Mr. Muhammad Farooq Umer Khan is a highly accomplished technology innovator. He specializes in hardware and software architecture design, embedded systems, signal analysis and system integration. He has rich experience of applied research, and has successfully produced numerous electronic systems which are currently in use in various types of aircraft and ground systems. His expertise and dedication have played a key role in establishing TeReSol as a leader in open-architecture computing and electronic systems for aerospace, defense, and industrial applications.<br /><br />
Prior to his present assignment, he served in Pakistan Air Force in engineering branch where he supervised projects of different scope and magnitude at organizational, national and international levels, while being at senior management positions.<br /><br />
Mr Khan has also remained actively involved in enhancing Academia-Industry linkages. He has worked as Director ORIC (Office of Research, Innovation & Commercialization) at NuTech University, Islamabad. Based on extensive hand-on experience of carrying out R&D, he made sizeable efforts in creating an enabling environment for product-based research through creation of a meaningful interface between the researchers and industry. He assisted in providing strategic and operational support to the research activities of university, focusing on turning knowledge into innovation through generation of products and refinement of production processes.<br /><br />
Mr Khan is a published author having multiple internationally recognized and conference papers to his credit.`,

    teamMembers: [
      { name: "Dr. Shahzad Arshad", image: "/leadership/staff/Dr. Shahzad Arshad.jpeg", role: "PD RF Team" },
      { name: "Adeel Tariq", image: "/leadership/staff/Adeel Tariq.jpeg", role: "PD Tech Support" },
      { name: "Raheel Bari", image: "/leadership/staff/Raheel Bari.webp", role: "PD Embedded Team" },
      { name: "Daniyal Islam", image: "/place-holder.jpg", role: "PD Embedded Team" },
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
