import { test } from "node:test";
import assert from "node:assert/strict";
import { formatOrdinal } from "../src/lib/format.ts";
import { projects } from "../src/data/projects.ts";
import { resumeEntries } from "../src/data/resume.ts";
import { capabilities, site } from "../src/data/site.ts";

const assertUnique = (values: readonly string[], what: string) => {
  const duplicates = values.filter((value, i) => values.indexOf(value) !== i);
  assert.deepEqual(duplicates, [], `duplicate ${what} (used as React keys)`);
};

const assertHttps = (url: string | undefined, what: string) => {
  if (url === undefined) return;
  assert.equal(new URL(url).protocol, "https:", `${what} should be https: ${url}`);
};

test("formatOrdinal zero-pads without breaking past nine", () => {
  assert.equal(formatOrdinal(0), "01");
  assert.equal(formatOrdinal(8), "09");
  assert.equal(formatOrdinal(9), "10");
  assert.equal(formatOrdinal(99), "100");
});

test("projects have unique names and https destinations", () => {
  assertUnique(projects.map((p) => p.name), "project names");
  for (const project of projects) {
    assertHttps(project.href, `${project.name} href`);
    assertHttps(project.repoUrl, `${project.name} repoUrl`);
    assertUnique(project.tags, `${project.name} tags`);
  }
});

test("resume entries and capabilities have unique keys", () => {
  assertUnique(resumeEntries.map((e) => e.title), "resume titles");
  for (const entry of resumeEntries) assertUnique(entry.bullets, `${entry.title} bullets`);
  assertUnique(capabilities.map((c) => c.code), "capability codes");
});

test("site links are https and the email is well-formed", () => {
  for (const key of ["githubUrl", "linkedInUrl", "twitterUrl", "portfolioUrl", "websiteUrl"] as const) {
    assertHttps(site[key], key);
  }
  assertHttps(site.resumePdfUrl, "resumePdfUrl");
  assert.match(site.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
