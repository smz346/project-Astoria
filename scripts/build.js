const fs = require('fs');
const requiredFiles = ['index.html', 'src/styles.css', 'src/main.js'];
const missing = requiredFiles.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error(`Missing required files: ${missing.join(', ')}`);
  process.exit(1);
}

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/src', { recursive: true });
fs.copyFileSync('index.html', 'dist/index.html');
fs.copyFileSync('src/styles.css', 'dist/src/styles.css');
fs.copyFileSync('src/main.js', 'dist/src/main.js');
console.log('Built static app in dist/');
