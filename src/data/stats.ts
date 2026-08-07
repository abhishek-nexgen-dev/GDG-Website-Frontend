export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 800, suffix: "+", label: "Members" },
  { value: 25, suffix: "+", label: "Events" },
  { value: 15, suffix: "+", label: "Communities" },
  { value: 4, suffix: "+", label: "Projects" },
];
