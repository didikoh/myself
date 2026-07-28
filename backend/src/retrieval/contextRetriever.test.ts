import assert from "node:assert/strict";
import test from "node:test";
import { retrieveRelevantContext } from "./contextRetriever.js";

function retrieve(question: string) {
  return retrieveRelevantContext([{ role: "user", content: question }]);
}

test("retrieves only the latest skill chunk for a specific 2026 stack question", () => {
  const result = retrieve("Does he know Next.js and PostgreSQL?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["skills-2026"],
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
  assert.match(result.context, /No relevant portfolio records/);
});

test("keeps a direct contact lookup focused", () => {
  const result = retrieve("What is his email?");

  assert.deepEqual(
    result.chunks.map((chunk) => chunk.id),
    ["profile-contact"],
  );
});

test("does not pull generic work history for an unlisted technology", () => {
  const result = retrieve("Does he have AWS experience?");

  assert.equal(result.chunks.length, 0);
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
