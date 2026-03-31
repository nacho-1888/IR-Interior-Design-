import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "montalban",
    title: "Montalbán",
    location: "Madrid, Spain",
    description: "A masterful fusion of eclectic textures and curated art, creating a living space that feels both architectural and intimately personal.",
    coverImage: "/assets/projects/montalban/hero.png",
    gallery: [
      "/assets/projects/montalban/img1.png",
      "/assets/projects/montalban/img2.png",
      "/assets/projects/montalban/img3.png",
      "/assets/projects/montalban/hero.png",
    ],
    year: "2024",
    category: "Residential",
  },
  {
    id: "marques-de-cubas",
    title: "Marqués de Cubas",
    location: "Jerónimos, Madrid",
    description: "An exceptional residence where classical architecture meets avant-garde interior design in one of Madrid's most prestigious corners.",
    coverImage: "/assets/projects/marques-cubas/img1.png",
    gallery: [
      "/assets/projects/marques-cubas/img1.png",
    ],
    year: "2023",
    category: "Residential",
  },
  {
    id: "aca-entre-nos",
    title: "Aca entre Nos",
    location: "Madrid, Spain",
    description: "A sanctuary of warmth and character, where every detail tells a story through rich materials and sophisticated silhouettes.",
    coverImage: "/assets/projects/aca-entre-nos/img1.png",
    gallery: [
      "/assets/projects/aca-entre-nos/img1.png",
      "/assets/projects/aca-entre-nos/img2.png",
      "/assets/projects/aca-entre-nos/img3.png",
      "/assets/projects/aca-entre-nos/img4.png",
    ],
    year: "2024",
    category: "Commercial",
  },
  {
    id: "reina",
    title: "Reina",
    location: "Chueca, Madrid",
    description: "A vibrant and light-filled residence where historic architectural details meet a fresh, contemporary materiality.",
    coverImage: "/assets/projects/reina/img1.png",
    gallery: [
      "/assets/projects/reina/img1.png",
      "/assets/projects/reina/img2.png",
      "/assets/projects/reina/img3.png",
    ],
    year: "2024",
    category: "Residential",
  },
];
