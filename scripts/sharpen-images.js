import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const BACKUP_DIR = path.resolve("images-original");
const CATEGORIES = ["bathroom", "kitchen", "laundry", "living", "logo", "team"];

async function listJpgs(dir) {
  const entries = await readdir(dir);
  return entries.filter((name) => name.toLowerCase().endsWith(".jpg"));
}

async function processCategory(category) {
  const sourceDir = path.join(IMAGES_DIR, category);
  const backupDir = path.join(BACKUP_DIR, category);
  await mkdir(backupDir, { recursive: true });

  const files = await listJpgs(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const backupPath = path.join(backupDir, file);

    if (!existsSync(backupPath)) {
      await copyFile(sourcePath, backupPath);
    }

    const before = await stat(sourcePath);
    await sharp(backupPath)
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .linear(1.05, -8)
      .jpeg({ quality: 90 })
      .toFile(sourcePath + ".tmp");

    const { rename } = await import("node:fs/promises");
    await rename(sourcePath + ".tmp", sourcePath);
    const after = await stat(sourcePath);
    console.log(`${category}/${file}: ${before.size}b -> ${after.size}b`);
  }
}

async function main() {
  for (const category of CATEGORIES) {
    await processCategory(category);
  }
  console.log("Done. Originals preserved under images-original/.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
