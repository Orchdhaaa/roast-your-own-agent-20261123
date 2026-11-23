import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent needed a twelve-step plan, a risk register, and a post-mortem to finish a thirty-second task.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";

const points = [...LINE].length;
if (points < 1 || points > 200) {
  throw new Error(`entry must be 1-200 code points, got ${points}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.includes("—")) {
  throw new Error("entry must not contain an em dash");
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must end with a period");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: written entry.txt differs from the line");
}
