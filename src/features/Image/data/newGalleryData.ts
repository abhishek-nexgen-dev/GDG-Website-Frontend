export type ExperimentalImage = {
  id: string;
  src: string;
  alt: string;
  event: string;
  year: number;
  location?: string;
  description?: string;
};

export type NarrativeSection = {
  id: string;
  title: string;
  subtitle: string;
  composition: "A" | "B" | "C" | "D" | "E" | "F";
  images: ExperimentalImage[];
};

export const heroImages: ExperimentalImage[] = [
  { id: "h1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", alt: "Event", event: "DEVFEST RANCHI", year: 2024 },
  { id: "h2", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", alt: "People", event: "CLOUD STUDY JAM", year: 2024 },
  { id: "h3", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", alt: "Team", event: "COMMUNITY MEETUP", year: 2024 },
  { id: "h4", src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80", alt: "Crowd", event: "AI WORKSHOP", year: 2024 },
  { id: "h5", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", alt: "Code", event: "HACKATHON", year: 2024 },
  { id: "h6", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80", alt: "Talk", event: "GOOGLE I/O EXTENDED", year: 2023 },
];

export const gallerySections: NarrativeSection[] = [
  {
    id: "s1",
    title: "01 — THE OPENING",
    subtitle: "2024",
    composition: "A",
    images: [
      { id: "s1_1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80", alt: "Large Stage", event: "DEVFEST RANCHI", year: 2024, location: "Ranchi", description: "One day. Hundreds of builders. Countless conversations." },
      { id: "s1_2", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", alt: "Audience", event: "DEVFEST RANCHI", year: 2024 },
      { id: "s1_3", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", alt: "Networking", event: "DEVFEST RANCHI", year: 2024 },
      { id: "s1_4", src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80", alt: "Crowd", event: "DEVFEST RANCHI", year: 2024 },
      { id: "s1_5", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", alt: "Laptop", event: "DEVFEST RANCHI", year: 2024 },
      { id: "s1_6", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80", alt: "Talk", event: "DEVFEST RANCHI", year: 2024 },
      { id: "s1_7", src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", alt: "Coding", event: "DEVFEST RANCHI", year: 2024 },
      { id: "s1_8", src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80", alt: "Group", event: "DEVFEST RANCHI", year: 2024 },
    ]
  },
  {
    id: "s2",
    title: "02 — THE PEOPLE",
    subtitle: "COMMUNITY",
    composition: "B",
    images: [
      { id: "s2_1", src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80", alt: "Portrait", event: "COMMUNITY MEETUP", year: 2024 },
      { id: "s2_2", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", alt: "Group", event: "COMMUNITY MEETUP", year: 2024 },
      { id: "s2_3", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80", alt: "Candid", event: "COMMUNITY MEETUP", year: 2023 },
      { id: "s2_4", src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", alt: "Event", event: "COMMUNITY MEETUP", year: 2023 },
      { id: "s2_5", src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80", alt: "Meeting", event: "COMMUNITY MEETUP", year: 2023 },
      { id: "s2_6", src: "https://images.unsplash.com/photo-1504384764586-bb4cdc1705b0?auto=format&fit=crop&w=800&q=80", alt: "Discussion", event: "COMMUNITY MEETUP", year: 2023 },
    ]
  },
  {
    id: "s3",
    title: "03 — THE BUILD",
    subtitle: "WORKSHOPS",
    composition: "C",
    images: [
      { id: "s3_1", src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", alt: "Code", event: "CLOUD STUDY JAM", year: 2024 },
      { id: "s3_2", src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80", alt: "Hackathon", event: "HACKATHON", year: 2023 },
      { id: "s3_3", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", alt: "Mentoring", event: "AI WORKSHOP", year: 2024 },
      { id: "s3_4", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", alt: "Code", event: "CLOUD STUDY JAM", year: 2024 },
      { id: "s3_5", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", alt: "Hackathon", event: "HACKATHON", year: 2023 },
      { id: "s3_6", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", alt: "Mentoring", event: "AI WORKSHOP", year: 2024 },
    ]
  },
  {
    id: "s4",
    title: "04 — THE STAGE",
    subtitle: "2023",
    composition: "D",
    images: [
      { id: "s4_1", src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80", alt: "Speaker", event: "GOOGLE I/O EXTENDED", year: 2023, description: "Inspiring talks from industry leaders." },
      { id: "s4_2", src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80", alt: "Panel", event: "GOOGLE I/O EXTENDED", year: 2023 },
      { id: "s4_3", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80", alt: "Audience Q&A", event: "GOOGLE I/O EXTENDED", year: 2023 },
      { id: "s4_4", src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80", alt: "Speaker", event: "GOOGLE I/O EXTENDED", year: 2023 },
      { id: "s4_5", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", alt: "Panel", event: "GOOGLE I/O EXTENDED", year: 2023 },
      { id: "s4_6", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", alt: "Audience Q&A", event: "GOOGLE I/O EXTENDED", year: 2023 },
    ]
  },
  {
    id: "s5",
    title: "05 — THE ARCHIVE",
    subtitle: "2022",
    composition: "E",
    images: [
      { id: "s5_1", src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80", alt: "Early days", event: "FIRST MEETUP", year: 2022 },
      { id: "s5_2", src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80", alt: "Workshop", event: "WEB3 TALK", year: 2022 },
      { id: "s5_3", src: "https://images.unsplash.com/photo-1504384764586-bb4cdc1705b0?auto=format&fit=crop&w=800&q=80", alt: "Early days", event: "FIRST MEETUP", year: 2022 },
      { id: "s5_4", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", alt: "Workshop", event: "WEB3 TALK", year: 2022 },
    ]
  }
];
