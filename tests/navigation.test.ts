import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MOBILE_NAV_QUERY, navItems } from "../src/lib/navigation.ts";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("the mobile-nav media query matches the stylesheet breakpoint", () => {
  // SiteHeader closes the menu when this query stops matching; if it drifts
  // from the CSS the menu can be open-but-hidden with the page scroll-locked.
  const css = read("src/styles.css");
  const block = css.indexOf(`@media ${MOBILE_NAV_QUERY}`);
  assert.notEqual(block, -1, `styles.css has no "@media ${MOBILE_NAV_QUERY}" block`);
  const nextBlock = css.indexOf("@media", block + 1);
  const body = css.slice(block, nextBlock === -1 ? undefined : nextBlock);
  assert.match(body, /\.menu-button\s*\{\s*display:\s*grid/);
});

test("every nav item points at a section rendered with that id", () => {
  const components = ["HeroSection", "AboutSection", "ProjectGrid", "ResumeSection", "ContactSection"]
    .map((name) => read(`src/components/${name}.tsx`))
    .join("\n");
  for (const item of navItems) {
    assert.match(item.href, /^#[a-z-]+$/);
    assert.ok(components.includes(`id="${item.href.slice(1)}"`), `no section with id ${item.href}`);
  }
});
