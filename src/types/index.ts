export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  images: string[];
  github?: string;
  live?: string;
  category: 'web' | 'fullstack' | 'mobile' | 'other';
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  date: string;
  image: string;
  badge?: string;
}

export interface Seminar {
  id: string;
  title: string;
  date: string;
  location: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design';
  level: number; // 1–5
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
