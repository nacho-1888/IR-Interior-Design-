import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "madrid-residence",
    title: "The Madrid Residence",
    location: "Madrid, Spain",
    description: "A bold exploration of textures and patterns, blending mid-century modern with contemporary Spanish craftsmanship.",
    coverImage: "https://picsum.photos/seed/madrid1/1920/1080",
    gallery: [
      "https://picsum.photos/seed/madrid1/1200/800",
      "https://picsum.photos/seed/madrid2/1200/800",
      "https://picsum.photos/seed/madrid3/1200/800",
    ],
    year: "2024",
    category: "Residential",
  },
  {
    id: "velazquez-penthouse",
    title: "Velázquez Penthouse",
    location: "Barrio de Salamanca, Madrid",
    description: "An airy, light-filled space featuring sculptural furniture and a curated collection of contemporary art.",
    coverImage: "https://picsum.photos/seed/velazquez1/1920/1080",
    gallery: [
      "https://picsum.photos/seed/velazquez1/1200/800",
      "https://picsum.photos/seed/velazquez2/1200/800",
      "https://picsum.photos/seed/velazquez3/1200/800",
    ],
    year: "2023",
    category: "Residential",
  },
  {
    id: "castellana-studio",
    title: "Castellana Studio",
    location: "Paseo de la Castellana, Madrid",
    description: "A sophisticated workspace designed for creativity, with deep jewel tones and custom marble accents.",
    coverImage: "https://picsum.photos/seed/castellana1/1920/1080",
    gallery: [
      "https://picsum.photos/seed/castellana1/1200/800",
      "https://picsum.photos/seed/castellana2/1200/800",
      "https://picsum.photos/seed/castellana3/1200/800",
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
