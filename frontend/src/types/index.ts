export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 (number of cats)
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface ProjectLink {
  type: 'github' | 'youtube' | 'video' | 'demo' | 'website' | 'download';
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[]; // 改为图片数组
  technologies: string[];
  links: ProjectLink[];
  featured: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}
