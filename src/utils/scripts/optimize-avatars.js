import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Configure your paths
const INPUT_DIR = path.join(process.cwd(), "src/assets/raw-avatars");
const OUTPUT_DIR = path.join(process.cwd(), "src/assets/avatars");
const AVATAR_SIZE = 256; // Standard size for high-res avatars

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeAvatars() {
  try {
    if (!fs.existsSync(INPUT_DIR)) {
      console.error(`Input directory not found: ${INPUT_DIR}`);
      return;
    }

    const files = fs.readdirSync(INPUT_DIR);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file),
    );

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const filenameWithoutExt = path.parse(file).name;
      const outputPath = path.join(OUTPUT_DIR, `${filenameWithoutExt}.webp`);

      await sharp(inputPath)
        .resize(AVATAR_SIZE, AVATAR_SIZE, {
          fit: "cover", // Crops the image to a square without distorting it
          position: "center", // Focuses on the center of the image
        })
        .webp({ quality: 80 }) // WebP format at 80% quality offers a great size-to-quality ratio
        .toFile(outputPath);

      console.log(`✓ Optimized: ${file} -> ${filenameWithoutExt}.webp`);
    }

    console.log("🎉 All avatars optimized successfully!");
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeAvatars();
