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
  icon?: string;
}

export interface TimelineSkill {
  year: number;
  month: string;
  skill: string;
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

export interface Role {
  icon: string;
  title: string;
  description: string;
}

export interface Education {
  universityName: string;
  degree: string;
  major: string;
  startYear: number;
  endYear: number;
  cgpa?: string;
  location?: string;
  certificateLink?: string;
}

export interface FunFact {
  icon: string;
  text: string;
  src: string;
}

export interface AboutInfo {
  introduction: string;
  roles: Role[];
  education: Education;
  funFacts?: FunFact[];
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface PlaygroundProject {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  technologies: string[];
  link?: string;
}
