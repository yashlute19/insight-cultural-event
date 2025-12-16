// scripts/optimize-table-bg.js
const sharp = require("sharp");

async function optimizeTableBg() {
  try {
    await sharp("public/table-bg-new.webp")
      .resize({
        width: 1600,
        withoutEnlargement: true,
      })
      .webp({
        quality: 70,
        effort: 6,
        smartSubsample: true,
      })
      .toFile("public/table-bg-optimized-new.webp");

    await sharp("public/table-bg-optimized-new.webp")
      .resize(20)
      .webp({ quality: 35 })
      .toFile("public/table-bg-blur-new.webp");

    console.log(" Table background optimized successfully");
  } catch (err) {
    console.error(" Optimization failed:", err);
  }
}

optimizeTableBg();
