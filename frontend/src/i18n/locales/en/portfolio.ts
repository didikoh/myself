import {
  aboutInfo,
  personalInfo,
  playgroundProjects,
  projects,
  workExperiences,
} from "../../../data/mockData";

// Keep the original English data as the single source of truth for portfolio copy.
const portfolio = {
  personalInfo: {
    title: personalInfo.title,
    description: personalInfo.description,
  },
  aboutInfo: {
    introduction: aboutInfo.introduction,
    roles: aboutInfo.roles.map(({ title, description }) => ({ title, description })),
    education: {
      universityName: aboutInfo.education.universityName,
      degree: aboutInfo.education.degree,
      major: aboutInfo.education.major,
      cgpa: aboutInfo.education.cgpa,
      location: aboutInfo.education.location,
    },
    funFacts: aboutInfo.funFacts?.map(({ text }) => ({ text })) ?? [],
  },
  projects: Object.fromEntries(
    projects.map(({ id, title, description }) => [id, { title, description }]),
  ),
  workExperiences: Object.fromEntries(
    workExperiences.map(
      ({ id, position, location, startDate, endDate, responsibilities }) => [
        id,
        { position, location, startDate, endDate, responsibilities },
      ],
    ),
  ),
  playgroundProjects: Object.fromEntries(
    playgroundProjects.map(({ id, title, description }) => [id, { title, description }]),
  ),
};

export default portfolio;
