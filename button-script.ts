import fs from 'fs';
import path from 'path';

function addActiveScale(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addActiveScale(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/(<button[^>]*className=")([^"]*)(")/g, (match, p1, p2, p3) => {
        if (!p2.includes('active:scale-90') && !p2.includes('active:scale-95')) {
          return p1 + p2 + ' active:scale-95' + p3;
        }
        return match;
      });
      // also replace single quote classNames if any
      content = content.replace(/(<button[^>]*className=\{`)([^`]*)(`\})/g, (match, p1, p2, p3) => {
        if (!p2.includes('active:scale-90') && !p2.includes('active:scale-95')) {
          return p1 + p2 + ' active:scale-95' + p3;
        }
        return match;
      });
      fs.writeFileSync(fullPath, content);
    }
  }
}

addActiveScale('./src/components');
console.log('Done modifying buttons.');
