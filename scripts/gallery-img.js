// scripts/gallery-img.js
const sharp = require("sharp");

sharp("public/gallery/1.webp")
  .resize(20)
  .webp({ quality: 30 })
  .toFile("public/gallery/gallery-blur.webp")
  .then(() => {
    console.log(" gallery-blur.webp generated");
  })
  .catch(err => {
    console.error(" Error generating blur image:", err);
  });
