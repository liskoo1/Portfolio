// Converts public/img PNGs to WebP, generates the OG image and patches
// index.html with .webp references, intrinsic dimensions and lazy loading.
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const IMG_DIR = 'public/img';
const INDEX = 'index.html';

const pngs = readdirSync(IMG_DIR).filter((f) => f.toLowerCase().endsWith('.png'));
let html = readFileSync(INDEX, 'utf8');

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const file of pngs) {
  const name = file.replace(/\.png$/i, '');
  const src = join(IMG_DIR, file);
  const out = join(IMG_DIR, `${name}.webp`);

  const image = sharp(src);
  const meta = await image.metadata();
  await image.webp({ quality: 82 }).toFile(out);

  console.log(
    `${file} -> ${name}.webp  ${meta.width}x${meta.height}  ${kb(statSync(src).size)} -> ${kb(statSync(out).size)}`
  );

  html = html.split(`./public/img/${file}`).join(`./public/img/${name}.webp`);

  const tagRe = new RegExp(`<img\\b[^>]*src="\\./public/img/${name}\\.webp"[^>]*>`, 'g');
  html = html.replace(tagRe, (tag) => {
    let next = tag;
    if (!/\swidth=/.test(next))
      next = next.replace(/>$/, ` width="${meta.width}" height="${meta.height}">`);
    if (!/\sdecoding=/.test(next)) next = next.replace(/>$/, ' decoding="async">');
    if (!/\sloading=/.test(next)) {
      const isHero = /hero__photo/.test(next);
      const isLogo = /logo_luis/.test(next);
      if (isHero) {
        next = next.replace(/>$/, ' fetchpriority="high">');
      } else if (!isLogo) {
        next = next.replace(/>$/, ' loading="lazy">');
      }
    }
    return next;
  });

  unlinkSync(src);
}

// Favicon: modern browsers accept WebP favicons.
html = html.replace(
  '<link rel="icon" type="image/png" href="./public/img/logo_luis.webp" />',
  '<link rel="icon" type="image/webp" href="./public/img/logo_luis.webp" />'
);

// OG image 1200x630 for social scrapers (absolute URL in meta tags).
await sharp(join(IMG_DIR, 'desktop.webp'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80 })
  .toFile(join(IMG_DIR, 'og-image.jpg'));
console.log('og-image.jpg generated (1200x630)');

writeFileSync(INDEX, html, 'utf8');
console.log('index.html patched');
