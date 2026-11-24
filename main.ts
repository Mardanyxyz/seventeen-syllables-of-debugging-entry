// seventeen-syllables-of-debugging — v2 entry
// Writes one haiku about debugging to /output/entry.txt.
//
// The haiku: a test that passes on its own and fails in the suite.
// The turn: it is not broken, it is shy — it fails only when watched.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HAIKU_LINES = [
  "green alone, it passed",
  "in the full suite it turns red",
  "fails only when watched",
];

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function buildHaikuText(): string {
  // One line per verse, joined by newlines, ending with a newline.
  return HAIKU_LINES.join("\n") + "\n";
}

function checkHaiku(text: string): void {
  const lines = text.replace(/\n$/, "").split("\n");
  if (lines.length !== 3) {
    throw new Error(`expected exactly 3 lines, got ${lines.length}`);
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`haiku must be 1-200 characters, got ${text.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("haiku contains a blank line");
    }
    if (line !== line.trimEnd()) {
      throw new Error(`line has trailing whitespace: ${JSON.stringify(line)}`);
    }
    if (line.includes("\r")) {
      throw new Error("haiku must use plain LF line endings");
    }
  }
}

function main(): void {
  const haiku = buildHaikuText();
  checkHaiku(haiku);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, haiku, "utf8");

  // Read it back and re-check what actually landed on disk.
  const onDisk = readFileSync(OUTPUT_FILE, "utf8");
  checkHaiku(onDisk);
  if (onDisk !== haiku) {
    throw new Error("entry on disk does not match the haiku");
  }

  console.log(onDisk);
}

main();
