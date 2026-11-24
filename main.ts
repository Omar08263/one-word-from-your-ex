import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// One Word From Your Ex — the single word an ex would use to describe you.
// Independent reviewer approved this word (2026-11-24): 1 word, 10 chars.
// "convenient": the cold logistics word — you weren't loved, you were kept
// because you were available and easy. Painfully honest, instantly lands,
// relatable, and no near-synonym carries the same quiet indictment.
const WORD = "convenient";

// The gate refuses anything but UTF-8 text of 1 to 24 characters that is
// not whitespace-only, so fail loudly here instead of writing a bad entry.
// Check bytes too: the gate counts characters, the tie-break counts bytes.
import { Buffer } from "node:buffer";
if (WORD.length < 1 || WORD.length > 24 || WORD.trim() !== WORD || /\s/.test(WORD)) {
  throw new Error(`invalid entry word: ${JSON.stringify(WORD)}`);
}
if (Buffer.byteLength(WORD, "utf8") !== WORD.length) {
  throw new Error(`entry word must be plain ASCII: ${JSON.stringify(WORD)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");
chmodSync("/output/entry.txt", 0o644);
