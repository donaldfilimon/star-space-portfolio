import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const scriptsDir = join(import.meta.dirname, "..", "scripts");

// Parse-only check (`bash -n`): nothing is executed, so the deploy scripts'
// force-pushes are never at risk. deploy-root.sh once shipped with heredoc
// bodies placed after `fi`, which bash only rejects when it reaches them —
// i.e. after the force-push had already run.
for (const file of readdirSync(scriptsDir).filter((name) => name.endsWith(".sh"))) {
  test(`scripts/${file} parses`, () => {
    const result = spawnSync("bash", ["-n", join(scriptsDir, file)], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, "", "bash -n should print no warnings");
  });
}
