/**
 * Generates PNG icon variants and the Open Graph cover from SVG sources.
 * Run: node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const MARK = `
  <rect width="32" height="32" rx="8" fill="#141619"/>
  <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7.25" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
  <path d="M6 9.5h14" stroke="rgba(255,255,255,0.28)" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="8.6" cy="9.5" r="1" fill="#FF5F57"/>
  <circle cx="12" cy="9.5" r="1" fill="#FEBC2E"/>
  <circle cx="15.4" cy="9.5" r="1" fill="#28C840"/>
  <path d="M7 21c2.6-4.4 6.2-6.6 9.6-6.6S23.4 16.6 26 21" stroke="#0A84FF" stroke-width="2" stroke-linecap="round"/>
  <circle cx="16.5" cy="19.4" r="2.6" fill="#0A84FF"/>
  <circle cx="16.5" cy="19.4" r="1.1" fill="#0B0C0E"/>
`;

const markSvg = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">${MARK}</svg>`;

const touchSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#141619"/>
  <g transform="translate(18 18) scale(4.5)">${MARK}</g>
</svg>`;

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const ogSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0B0C0E"/>
  <g opacity="0.5">
    ${Array.from({ length: 10 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="630" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>`).join('')}
    ${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${i * 126}" x2="1200" y2="${i * 126}" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>`).join('')}
  </g>
  <rect x="24" y="24" width="1152" height="582" rx="18" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.5"/>

  <g transform="translate(88 92) scale(3)">
    ${MARK}
  </g>
  <text x="200" y="130" fill="#F5F5F7" font-family="${FONT}" font-size="44" font-weight="600" letter-spacing="10">MACMO</text>

  <text x="88" y="300" fill="#F5F5F7" font-family="${FONT}" font-size="72" font-weight="600" letter-spacing="-1.5">AI Agent Command Center</text>
  <text x="88" y="386" fill="#989AA0" font-family="${FONT}" font-size="72" font-weight="600" letter-spacing="-1.5">for macOS.</text>

  <g transform="translate(88 470)">
    <rect width="236" height="44" rx="22" fill="rgba(10,132,255,0.12)" stroke="rgba(10,132,255,0.45)" stroke-width="1.5"/>
    <text x="118" y="28" text-anchor="middle" fill="#0A84FF" font-family="${FONT}" font-size="17" font-weight="600" letter-spacing="2">EARLY DEVELOPMENT</text>
  </g>

  <text x="88" y="556" fill="#6B6E75" font-family="${FONT}" font-size="20" letter-spacing="3">BY ANAK TERUBUK</text>
</svg>`;

const targets = [
  { file: 'favicon-32.png', svg: markSvg(32), size: 32 },
  { file: 'favicon-192.png', svg: markSvg(192), size: 192 },
  { file: 'favicon-512.png', svg: markSvg(512), size: 512 },
  { file: 'apple-touch-icon.png', svg: touchSvg(), size: 180 },
  { file: 'og-cover.png', svg: ogSvg(), size: null },
];

for (const target of targets) {
  const buffer = Buffer.from(target.svg);
  const image = sharp(buffer, { density: 300 });
  const output = target.size
    ? await image.resize(target.size, target.size).png({ compressionLevel: 9 }).toBuffer()
    : await image.png({ compressionLevel: 9 }).toBuffer();
  await writeFile(path.join(publicDir, target.file), output);
  console.log(`✔ ${target.file} (${output.length} bytes)`);
}

// Sanity: favicon.svg must exist.
await readFile(path.join(publicDir, 'favicon.svg'));
console.log('✔ favicon.svg present');
