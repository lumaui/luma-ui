/**
 * Copia tokens buildados para docs app public assets
 * Garante que theme generator sempre carrega os tokens mais recentes
 *
 * Executado automaticamente via postbuild hook
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
const FILES_TO_COPY = ['luma.css', 'luma-dark.css'];

function copyTokens() {
  // Criar diretório target se não existir
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(`✓ Criado: ${TARGET_DIR}`);
  }

  // Copiar cada arquivo
  FILES_TO_COPY.forEach((file) => {
    const sourcePath = path.join(SOURCE_DIR, file);
    const targetPath = path.join(TARGET_DIR, file);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠ Source não encontrado: ${sourcePath}`);
      return;
    }

    fs.copyFileSync(sourcePath, targetPath);

    const stats = fs.statSync(targetPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✓ ${file} (${sizeKB} KB) → public/assets/tokens/`);
  });

  console.log('✓ Token sync completo');
}

copyTokens();
