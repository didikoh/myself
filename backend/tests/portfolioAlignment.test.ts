import assert from "node:assert/strict";
import test from "node:test";
import {
  projects,
  playgroundProjects,
  timelineSkills,
  workExperiences,
} from "../../frontend/src/data/mockData.ts";
import { portfolioKnowledge } from "../src/data/portfolioKnowledge.js";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchableText(chunkId: string): string {
  const chunk = portfolioKnowledge.find((candidate) => candidate.id === chunkId);
  assert.ok(chunk, `Missing backend knowledge chunk: ${chunkId}`);
  return normalize([chunk.title, chunk.content, ...chunk.keywords].join(" "));
}

test("backend knowledge includes every skill in the current frontend timeline", () => {
  const knowledge = normalize(
    portfolioKnowledge
      .filter((chunk) => chunk.category === "skills")
      .map((chunk) => [chunk.title, chunk.content, ...chunk.keywords].join(" "))
      .join(" "),
  );

  for (const timelineSkill of timelineSkills) {
    assert.ok(
      knowledge.includes(normalize(timelineSkill.skill)),
      `Backend knowledge is missing frontend skill: ${timelineSkill.skill}`,
    );
  }
});

test("backend work records match current frontend roles, dates, and technologies", () => {
  const chunkByExperienceId: Record<string, string> = {
    "1": "experience-ck-group",
    "2": "experience-art-wardens",
    "3": "experience-fusionex",
    "4": "experience-gamecode",
    "5": "experience-ministry-xr",
  };

  for (const experience of workExperiences) {
    const knowledge = searchableText(chunkByExperienceId[experience.id]);
    const expectedValues = [
      experience.position,
      experience.company,
      experience.startDate,
      experience.endDate,
      ...(experience.technologies ?? []),
    ];

    for (const expected of expectedValues) {
      assert.ok(
        knowledge.includes(normalize(expected)),
        `${experience.company} backend record is missing: ${expected}`,
      );
    }
  }
});

test("backend project records cover all frontend project technologies and links", () => {
  const chunkByProjectId: Record<string, string> = {
    "1": "project-guocoland-masterplan",
    "2": "project-guocoland-web",
    "3": "project-causewayz",
    "4": "project-anyara",
    "5": "project-bhp-unreal",
    "6": "project-bhp-web",
    "7": "project-celora-3d",
    "8": "project-celora-branding",
    "9": "project-goprop-platform",
    "10": "project-goprop-landing",
    "11": "project-iskandar-wawari",
    "12": "project-pearlmont",
    "13": "project-bestudio",
  };

  for (const project of projects) {
    const knowledge = searchableText(chunkByProjectId[project.id]);
    const publicUrls = project.links
      .filter((link) => link.type !== "video")
      .map((link) => link.url);

    for (const expected of [...project.technologies, ...publicUrls]) {
      assert.ok(
        knowledge.includes(normalize(expected)),
        `${project.title} backend record is missing: ${expected}`,
      );
    }
  }

  assert.equal(playgroundProjects.length, 1);
  const playgroundKnowledge = searchableText("project-mekk");
  for (const expected of [
    ...playgroundProjects[0].technologies,
    playgroundProjects[0].link,
  ]) {
    assert.ok(
      playgroundKnowledge.includes(normalize(expected)),
      `Mekk backend record is missing: ${expected}`,
    );
  }
});
