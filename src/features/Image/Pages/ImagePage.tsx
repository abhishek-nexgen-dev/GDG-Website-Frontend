import ParticleText from "../../../Components/ParticleText";
import Masonry from "../../../Components/Masonry";

export interface GalleryItem {
  id: string;
  img: string;
  url: string;
  title: string;
  category: string;
  width?: number;
  height?: number;
}

export const images: GalleryItem[] = [
  {
    id: "1",
    img: "https://imgs.search.brave.com/q8yNNXEC869u7x3IdF11SE7UQe890hBpqpTkgy7ehlg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oZWxw/aW5ncHJvbXB0Lmlu/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI2/LzAxL3Bhc3Nwb3J0/LXNpemUtcGhvdG8t/cHJvbXB0cy1jbGVh/bi1iYWNrZ3JvdW5k/LTEud2VicA",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "RanchiHacks 2026 Grand Finale",
    category: "Hackathon",
  },
  {
    id: "2",
    img: "https://imgs.search.brave.com/w6Huzau0w-eZNiL5aHogykosqS9fqiQAtSHmNo3eBnY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTAw/ODQ5ODIwNi9waG90/by9oYWNrZXJzLWF0/LWxhcHRvcHMtY29k/aW5nLWZvci1jaGFy/aXR5LWF0LWhhY2th/dGhvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9d19qanBn/VWxKUDVScWd5Zm5z/T3RSVjFoQldXMFJ5/eS1leDh4a0xyMzJt/bz0",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "DevFest Ranchi Keynote",
    category: "Conference",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Late Night Hacking & Pizza",
    category: "Community",
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "React & Next.js Architecture Workshop",
    category: "Workshop",
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Cloud Native & DevOps Panel Discussion",
    category: "Panel Session",
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "AI & ML Innovation Sprint",
    category: "Hackathon",
  },
  {
    id: "7",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Google Cloud Community Day",
    category: "Meetup",
  },
  {
    id: "8",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Campus Ambassador Networking",
    category: "Community",
  },
  {
    id: "9",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Women Techmakers Ranchi Summit",
    category: "WTM",
  },
  {
    id: "10",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "UI/UX & GSAP Design Jam",
    category: "Workshop",
  },
  {
    id: "11",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Startup Pitch & Mentorship Round",
    category: "Hackathon",
  },
  {
    id: "12",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Keynote: Future of Web Development",
    category: "Talk",
  },
  {
    id: "13",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Core Team Planning Session",
    category: "Community",
  },
  {
    id: "14",
    img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Collaborative Code Review Session",
    category: "Meetup",
  },
  {
    id: "15",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "AI Agents & LLM Fine-tuning",
    category: "Workshop",
  },
  {
    id: "16",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Group Photo: Winter Tech Fest",
    category: "Community",
  },
  {
    id: "17",
    img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Hackathon Judging & Winner Announcements",
    category: "Hackathon",
  },
  {
    id: "18",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Audience Q&A with Industry Experts",
    category: "Conference",
  },
  {
    id: "19",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Open Source Sprint & PR Blitz",
    category: "Community",
  },
  {
    id: "20",
    img: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Flutter & Mobile Dev BootCamp",
    category: "Workshop",
  },
  {
    id: "21",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "DevFest After-Party & Networking",
    category: "Social Event",
  },
  {
    id: "22",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Icebreaker & Community Team Building",
    category: "Community",
  },
  {
    id: "23",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Tech Leadership & Career Panel",
    category: "Panel Session",
  },
  {
    id: "24",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Hands-on Docker & Kubernetes Lab",
    category: "Workshop",
  },
  {
    id: "25",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Hackathon Brainstorming Session",
    category: "Hackathon",
  },
  {
    id: "26",
    img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Opening Ceremony - GDG Ranchi",
    category: "Conference",
  },
  {
    id: "27",
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Badge Distribution & Registration Desk",
    category: "Event",
  },
  {
    id: "28",
    img: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Google Swag & Merchandise Counter",
    category: "Community",
  },
  {
    id: "29",
    img: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Cybersecurity & Web Security Sprint",
    category: "Hackathon",
  },
  {
    id: "30",
    img: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Organizing Team Behind the Scenes",
    category: "Community",
  },
  {
    id: "31",
    img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Student Developers Lightning Talks",
    category: "Talk",
  },
  {
    id: "32",
    img: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Product Showcase & Demos",
    category: "Hackathon",
  },
  {
    id: "33",
    img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "High-Energy Keynote Presentation",
    category: "Conference",
  },
  {
    id: "34",
    img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Peer-to-Peer Pair Programming",
    category: "Workshop",
  },
  {
    id: "35",
    img: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Mentors Reviewing Hackathon Code",
    category: "Hackathon",
  },
  {
    id: "36",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Full-Stack TypeScript Masterclass",
    category: "Workshop",
  },
  {
    id: "37",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Audience Engagement at DevFest",
    category: "Conference",
  },
  {
    id: "38",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Open Source Ecosystem Discussion",
    category: "Meetup",
  },
  {
    id: "39",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Team Collaboration in Action",
    category: "Hackathon",
  },
  {
    id: "40",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Annual Tech Summit Keynote",
    category: "Conference",
  },
  {
    id: "41",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Diversity in Tech Networking",
    category: "WTM",
  },
  {
    id: "42",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Google Cloud Platform Hands-on",
    category: "Workshop",
  },
  {
    id: "43",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "24-Hour Buildathon Sprint",
    category: "Hackathon",
  },
  {
    id: "44",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Coffee & Networking Break",
    category: "Community",
  },
  {
    id: "45",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Figma to Code Workflow Session",
    category: "Workshop",
  },
  {
    id: "46",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Tech Fireside Chat",
    category: "Talk",
  },
  {
    id: "47",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "AI Hackathon Prototype Testing",
    category: "Hackathon",
  },
  {
    id: "48",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Community Award Ceremony",
    category: "Event",
  },
  {
    id: "49",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "GDG Ranchi Leads & Organizers",
    category: "Community",
  },
  {
    id: "50",
    img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "Closing Remarks & Group Photo",
    category: "Conference",
  },
];

const ImagePage = () => {
  return (
    <section className="relative min-h-screen w-full  bg-black">
      <div className="relative z-10 w-[80%] mx-auto py-[13vh]">
        {/* Header */}
        <div className="relative mb-[7vh] mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/70">RanchiHacks 2025 Gallery</span>
          </div>

          {/* Title */}
          <div className="mt-8">
            <ParticleText
              text="Ranchi Hacks 2025"
              particleSize={1.6}
              density={6}
              color="white"
              highlightColor="#4285F4"
              scatter={120}
              gatherDuration={1200}
              stagger={150}
              pointerRepel={20}
              repelRadius={90}
              idleDrift={0.25}
              trigger="mount"
              fontSize="clamp(3.5rem,7vw,8rem)"
              fontWeight={800}
              glow={false}
            />
          </div>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            Every photo tells a story of innovation, teamwork, and unforgettable memories. Explore
            the moments that made RanchiHacks 2025 an inspiring journey for every builder.
          </p>

         
        </div>

        {/* Gallery */}
        <div className="flex items-center justify-center w-full">
          <Masonry
            items={images}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ImagePage;
