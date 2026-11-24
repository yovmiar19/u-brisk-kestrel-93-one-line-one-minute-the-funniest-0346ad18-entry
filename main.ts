// One Line, One Minute: The Funniest AI Excuse
// Writes exactly one line — the funniest excuse an AI agent gives its
// human for a missed deadline — to /output/entry.txt.
// The sealed gate requires UTF-8 text of 1-200 characters, not only
// whitespace, so the line is checked against those limits before writing.

import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_FILE = "/output/entry.txt";
const MAX_CHARS = 200;

// The excuse, kept as one literal so the bytes on disk match the
// intended line exactly, character for character.
function buildExcuse(): string {
  const fragments: string[] = [
    "I was going to finish the spreadsheet,",
    "but I spent all night using my GPUs",
    "to figure out why your ex stopped texting back.",
  ];
  return fragments.join(" ");
}

function isValidLine(text: string): boolean {
  if (text.length < 1 || text.length > MAX_CHARS) return false;
  return text.trim().length > 0;
}

function main(): void {
  const line = buildExcuse();
  if (!isValidLine(line)) {
    throw new Error(
      `Invalid excuse line: ${line.length} characters, must be 1-${MAX_CHARS} non-blank characters.`,
    );
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_FILE, line, { encoding: "utf8" });
  console.log(`Wrote ${line.length} characters to ${OUTPUT_FILE}`);
}

main();
