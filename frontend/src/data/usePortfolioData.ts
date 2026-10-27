import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  aboutInfo,
  personalInfo,
  playgroundProjects,
  projects,
  workExperiences,
} from "./mockData";
import type {
  AboutInfo,
  PersonalInfo,
  PlaygroundProject,
  Project,
  WorkExperience,
} from "../types";

interface PortfolioData {
  personalInfo: PersonalInfo;
  aboutInfo: AboutInfo;
  projects: Project[];
  workExperiences: WorkExperience[];
  playgroundProjects: PlaygroundProject[];
}

export function usePortfolioData(): PortfolioData {
  const { t } = useTranslation();

  return useMemo(() => {
    const translate = (key: string, fallback: string) =>
      t(`portfolio.${key}`, { defaultValue: fallback });

    return {
      personalInfo: {
        ...personalInfo,
        title: translate("personalInfo.title", personalInfo.title),
        description: translate("personalInfo.description", personalInfo.description),
      },
      aboutInfo: {
        ...aboutInfo,
        introduction: translate("aboutInfo.introduction", aboutInfo.introduction),
        roles: aboutInfo.roles.map((role, index) => ({
          ...role,
          title: translate(`aboutInfo.roles.${index}.title`, role.title),
          description: translate(`aboutInfo.roles.${index}.description`, role.description),
        })),
        education: {
          ...aboutInfo.education,
          universityName: translate(
            "aboutInfo.education.universityName",
            aboutInfo.education.universityName,
          ),
          degree: translate("aboutInfo.education.degree", aboutInfo.education.degree),
          major: translate("aboutInfo.education.major", aboutInfo.education.major),
          cgpa: aboutInfo.education.cgpa
            ? translate("aboutInfo.education.cgpa", aboutInfo.education.cgpa)
            : undefined,
          location: aboutInfo.education.location
            ? translate("aboutInfo.education.location", aboutInfo.education.location)
            : undefined,
        },
        funFacts: aboutInfo.funFacts?.map((fact, index) => ({
          ...fact,
          text: translate(`aboutInfo.funFacts.${index}.text`, fact.text),
        })),
      },
      projects: projects.map((project) => ({
        ...project,
        title: translate(`projects.${project.id}.title`, project.title),
        description: translate(`projects.${project.id}.description`, project.description),
      })),
      workExperiences: workExperiences.map((experience) => ({
        ...experience,
        position: translate(`workExperiences.${experience.id}.position`, experience.position),
        location: translate(`workExperiences.${experience.id}.location`, experience.location),
        startDate: translate(`workExperiences.${experience.id}.startDate`, experience.startDate),
        endDate: translate(`workExperiences.${experience.id}.endDate`, experience.endDate),
        responsibilities: experience.responsibilities.map((responsibility, index) =>
          translate(`workExperiences.${experience.id}.responsibilities.${index}`, responsibility),
        ),
      })),
      playgroundProjects: playgroundProjects.map((project) => ({
        ...project,
        title: translate(`playgroundProjects.${project.id}.title`, project.title),
        description: translate(
          `playgroundProjects.${project.id}.description`,
          project.description,
        ),
      })),
    };
  }, [t]);
}
