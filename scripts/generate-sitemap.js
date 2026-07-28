import { writeFile } from "node:fs/promises";
import path from "node:path";
import { portfolioItems } from "../src/data/portfolio.js";

const SITE_URL = "https://elevatelivingstudio.com.au";
const OUTPUT = path.resolve("public/sitemap.xml");

const staticRoutes = ["/", "/services", "/portfolio", "/about", "/contact"];
const projectRoutes = portfolioItems.map((item) => `/portfolio/${item.id}`);

const urls = [...staticRoutes, ...projectRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`).join("\n")}
</urlset>
`;

await writeFile(OUTPUT, xml);
console.log(`Wrote ${urls.length} URLs to ${OUTPUT}`);
