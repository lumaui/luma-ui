/**
 * Watch mode: copia tokens automaticamente quando mudam
 * Roda junto com Style Dictionary watch
 *
 * Executado via npm run watch:copy (em paralelo com Style Dictionary)
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../build');
const TARGET_DIR = path.join(
  __dirname,
  '../../../apps/docs/public/assets/tokens',
);
const FILES_TO_WATCH = ['luma.css', 'luma-dark.css'];

console.log('👀 Watching tokens...');
console.log(`   Source: ${SOURCE_DIR}`);
console.log(`   Target: ${TARGET_DIR}\n`);

function copyFile(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const targetPath = path.join(TARGET_DIR, filename);

  if (!fs.existsSync(sourcePath)) return;

  // Garantir que target existe
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  fs.copyFileSync(sourcePath, targetPath);

  const timestamp = new Date().toLocaleTimeString();
  const stats = fs.statSync(targetPath);
  const sizeKB = (stats.size / 1024).toFixed(2);

  console.log(`[${timestamp}] ✓ ${filename} (${sizeKB} KB)`);
}

// Cópia inicial
console.log('Cópia inicial...');
FILES_TO_WATCH.forEach(copyFile);
console.log();

// Watch changes
FILES_TO_WATCH.forEach((filename) => {
  const filePath = path.join(SOURCE_DIR, filename);

  fs.watch(filePath, (eventType) => {
    if (eventType === 'change') {
      // Delay para garantir que escrita terminou
      setTimeout(() => copyFile(filename), 100);
    }
  });
});

console.log('Watching... (Ctrl+C para parar)\n');
