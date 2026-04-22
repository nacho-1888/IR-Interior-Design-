export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  year: string;
  category: string;
  customPosition?: string;
  imagePositions?: Record<string, string>;
}
