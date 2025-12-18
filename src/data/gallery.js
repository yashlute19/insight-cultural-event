export const galleryData = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/${i + 1}.webp`,
  alt: `Gallery image ${i + 1}`,
}));
