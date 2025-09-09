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
    reportees: [
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
    reportees: [
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
    reportees: [
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
    reportees: [
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
    intro: `Air Commodore (Retd.) Farooq Umer Khan is a distinguished technology leader with a remarkable career in the Pakistan Air Force and extensive expertise in PCB design, embedded systems, and advanced hardware engineering. Currently serving as Chief Technology Officer (CTO), he leverages decades of technical and leadership experience to drive innovation, oversee complex projects, and deliver cutting-edge solutions.

With a strong background in design engineering and system development, he combines strategic vision with deep technical insight, enabling organizations to achieve both technological advancement and operational excellence. His rare blend of military discipline, engineering proficiency, and executive leadership makes him highly effective in guiding teams, shaping technology roadmaps, and ensuring mission-critical outcomes.`,
    reportees: [
      { name: "Dr. Shahzad Arshad", image: "/leadership/staff/Dr. Shahzad Arshad.jpeg" },
      { name: "Adeel Tariq", image: "/place-holder.jpg" },
      { name: "Raheel Bari", image: "/leadership/staff/Raheel Bari.webp" },
      { name: "Daniyal Islam", image: "/place-holder.jpg" },
    ],
  },
  {
    slug: "dr-bilal-rauf",
    name: "Dr. Bilal Rauf",
    role: "CIO",
    image: "/leadership/CIO1.webp",
    intro: `Dr. Bilal manages information systems and IT strategy, aligning
    technology resources with business objectives.`,
    reportees: [
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
    reportees: [
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
    reportees: [
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
    reportees: [
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
    reportees: [
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
