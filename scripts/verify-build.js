import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist', 'index.html');

if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: dist/index.html not found!');
  console.error('Please run "npm run build" first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(distPath, 'utf-8');

// Check if it contains source file references (which is wrong)
if (indexHtml.includes('/src/main.tsx')) {
  console.error('❌ ERROR: dist/index.html still references /src/main.tsx');
  console.error('This means the build did not complete correctly.');
  process.exit(1);
}

// Check if it contains built asset references (which is correct)
if (!indexHtml.includes('/assets/') && !indexHtml.includes('<script')) {
  console.error('❌ ERROR: dist/index.html does not contain built asset references');
  process.exit(1);
}

console.log('✅ Build verification passed!');
console.log('✅ dist/index.html contains built assets');
process.exit(0);

