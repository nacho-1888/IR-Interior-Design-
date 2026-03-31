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
    id: "retiro-loft",
    title: "Retiro Loft",
    location: "Near Retiro Park, Madrid",
    description: "Industrial elements meet organic textures in this open-plan loft overlooking the city's green heart.",
    coverImage: "https://picsum.photos/seed/retiro1/1920/1080",
    gallery: [
      "https://picsum.photos/seed/retiro1/1200/800",
      "https://picsum.photos/seed/retiro2/1200/800",
      "https://picsum.photos/seed/retiro3/1200/800",
    ],
    year: "2023",
    category: "Residential",
  },
];
