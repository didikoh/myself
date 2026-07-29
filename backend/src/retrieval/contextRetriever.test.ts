import assert from "node:assert/strict";
import test from "node:test";
import { retrieveRelevantContext } from "./contextRetriever.js";

function retrieve(question: string) {
  return retrieveRelevantContext([{ role: "user", content: question }]);
}

test("retrieves only the relevant skill group for a specific stack question", () => {
  const result = retrieve("Does he know Next.js and PostgreSQL?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["skills-web-application"],
  );
  assert.match(result.context, /Next\.js/);
  assert.match(result.context, /PostgreSQL/);
  assert.doesNotMatch(result.context, /ART WARDENS/);
});

test("retrieves current portfolio work history for a broad experience question", () => {
  const result = retrieve("What is his work experience?");

  assert.equal(result.chunks.length, 5);
  assert.ok(result.chunks.every((chunk) => chunk.category === "experience"));
  assert.equal(result.chunks[0].id, "experience-ck-group");
  assert.match(result.context, /CK Group/);
  assert.doesNotMatch(result.context, /Know Idea/);
});

test("retrieves a named project without sending the whole project catalogue", () => {
  const result = retrieve("Tell me about Anyara Hills");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["project-anyara"],
  );
  assert.match(result.context, /MHUB/);
  assert.doesNotMatch(result.context, /Causewayz/);
});

test("uses recent turns to resolve a short follow-up", () => {
  const result = retrieveRelevantContext([
    { role: "user", content: "Tell me about Anyara Hills" },
    {
      role: "assistant",
      content: "Anyara Hills is an interactive 3D land platform.",
    },
    { role: "user", content: "What technologies did he use there?" },
  ]);

  assert.ok(result.chunks.some((chunk) => chunk.id === "project-anyara"));
});

test("does not retrieve portfolio records for a greeting", () => {
  const result = retrieve("Hello!");

  assert.equal(result.chunks.length, 0);
  assert.match(result.context, /Respond naturally and helpfully/);
  assert.doesNotMatch(result.context, /No relevant portfolio records/);
});

test("keeps a direct contact lookup focused", () => {
  const result = retrieve("What is his email?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["profile-contact"],
  );
});

test("treats a self-introduction request as a profile question", () => {
  for (const question of [
    "Tell me about yourself",
    "Who are you?",
    "Please introduce yourself",
    "Tell me about you",
  ]) {
    const result = retrieve(question);

    assert.deepEqual(
      result.chunks.map((chunk) => chunk.id),
      ["profile-summary"],
    );
    assert.match(result.context, /Koh Wei Zhen/);
  }
});

test("does not pull generic work history for an unlisted technology", () => {
  const result = retrieve("Does he have AWS experience?");

  assert.equal(result.chunks.length, 0);
  assert.match(result.context, /suggest a useful follow-up question/);
});

test("keeps a specific experience lookup to the matching employer", () => {
  const result = retrieve("Does he have blockchain experience?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["experience-art-wardens"],
  );
});

test("returns only the current employer for a current-work question", () => {
  const result = retrieve("Where does he currently work?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["experience-ck-group"],
  );
});

test("returns unscored evidence when asked to rate a skill", () => {
  const result = retrieve("How would you rate his React skill from 1 to 5?");

  assert.ok(result.chunks.some((chunk) => chunk.id === "skills-web-application"));
  assert.doesNotMatch(
    result.context,
    /\b(?:rating|rated|score|level)\b|out of 5/i,
  );
});

test("adds related work experience for a specific skill question", () => {
  const result = retrieve("Does he know React?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["skills-web-application", "experience-ck-group"],
  );
});

test("grounds broad job and collaboration questions in portfolio evidence", () => {
  for (const question of [
    "Would he be a good fit for our developer opening?",
    "Can you help me decide whether to interview him?",
    "Would he be interested in collaborating on a new product?",
    "Could he help with a freelance client project?",
  ]) {
    const result = retrieve(question);

    assert.ok(result.chunks.some((chunk) => chunk.id === "roles-focus"));
    assert.ok(
      result.chunks.some((chunk) => chunk.category === "experience"),
    );
    assert.ok(result.chunks.some((chunk) => chunk.category === "projects"));
    assert.match(result.context, /Professional focus/);
    assert.match(result.context, /work|developer/i);
  }
});
