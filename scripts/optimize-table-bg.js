import sharp from "sharp";

async function optimizeTableBg() {
  try {
    // 1️⃣ Optimize main background
    await sharp("public/table-bg.webp")
      .resize({
        width: 1600,            // perfect for full-width desktop
        withoutEnlargement: true
      })
      .webp({
        quality: 70,            // sweet spot for backgrounds
        effort: 6,              // better compression
        smartSubsample: true
      })
      .toFile("public/table-bg-optimized.webp");

    // 2️⃣ Create blur placeholder
    await sharp("public/table-bg-optimized.webp")
      .resize(20)
      .webp({ quality: 35 })
      .toFile("public/table-bg-blur.webp");

    console.log(" Table background optimized successfully");
  } catch (err) {
    console.error(" Optimization failed:", err);
  }
}

optimizeTableBg();
