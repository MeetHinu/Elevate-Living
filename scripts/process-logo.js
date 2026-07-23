import sharp from "sharp";
import path from "node:path";

const SOURCE = path.resolve("images-original/logo/logo.jpg");
const OUTPUT = path.resolve("public/images/logo/logo.png");

// The background is a near-white cream (~#FBF8F1). Any pixel within this
// distance of that color becomes fully transparent; everything else (the
// dark ink marks/text) stays opaque. This turns the flat JPG into a proper
// logo asset that reads correctly on both light and dark surfaces.
const BG = { r: 0xfb, g: 0xf8, b: 0xf1 };
const THRESHOLD = 40;

async function main() {
  const trimmed = await sharp(SOURCE)
    .trim({ background: "#FBF8F1", threshold: 10 })
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: "#FBF8F1" })
    .toBuffer();

  const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - BG.r;
    const dg = data[i + 1] - BG.g;
    const db = data[i + 2] - BG.b;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    if (distance < THRESHOLD) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(OUTPUT);

  console.log(`Wrote ${OUTPUT} (${info.width}x${info.height}, transparent background)`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
