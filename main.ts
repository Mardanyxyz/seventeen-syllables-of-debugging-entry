// Seventeen Syllables of Debugging — make.fun bounty
// u-irvan-motion-seventeen-syllables-of-debugging-d194b605
//
// Writes one haiku about debugging (three lines, 5-7-5 syllables)
// to /output/entry.txt. Deterministic: the same haiku every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const haiku = [
  "The stack trace stops short",
  "at a line I never wrote",
  "the test lied, not me",
].join("\n") + "\n";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku, "utf8");

// Guard the gate: exactly three lines, 1-200 characters, not only whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
const lines = written.replace(/\n$/, "").split("\n");
if (lines.length !== 3 || written.length < 1 || written.length > 200 || written.trim().length === 0) {
  throw new Error("haiku failed the entry gate");
}
