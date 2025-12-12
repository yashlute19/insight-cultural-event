// scripts/resize-events.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INPUT_DIR = path.join(__dirname, "..", "public", "events", "originals");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "events");
const SIZES = [400, 800, 1200]; // adjust per your design breakpoints
const QUALITY = 78; // tune for quality/file-size tradeoff

async function processFile(file) {
  const name = path.parse(file).name; // slug1 (without ext)
  const input = path.join(INPUT_DIR, file);
  for (const w of SIZES) {
    const outName = `${name}-${w}.webp`;
    const outPath = path.join(OUTPUT_DIR, outName);
    await sharp(input)
      .resize({ width: w })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    console.log("wrote", outPath);
  }
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error("Input dir not found:", INPUT_DIR);
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const f of files) {
    try {
      await processFile(f);
    } catch (err) {
      console.error("Failed:", f, err);
    }
  }
}

main();
