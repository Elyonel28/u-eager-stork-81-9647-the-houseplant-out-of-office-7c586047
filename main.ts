// The Houseplant Out-of-Office — make.fun bounty entry (program/v1).
// Writes one out-of-office auto-reply, as if sent by a houseplant,
// to /output/entry.txt. The line is the whole entry: at most 120
// characters, one line, UTF-8 text.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The fern, ignored since March, returns the favour: the neglect the
// plant suffered becomes the fate of the sender's email. 101 chars.
const LINE =
  "Auto-reply: I'm the fern. Unwatered since March. Your email will be ignored with the same dedication.";

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${out}`);
