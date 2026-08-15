import fs from 'fs';

const path = 'src/components/AboutMe.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the default image from /golu.jpg to a working placeholder
content = content.replace(
  "image: '/golu.jpg',",
  "image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Golu', // Updated to a working placeholder avatar"
);

// We should also handle the case where they already saved {image: '/golu.jpg'} in the database
// so let's intercept the parsed JSON
content = content.replace(
  "setAboutData((prev: any) => ({ ...prev, ...parsed }));",
  `
            if (parsed.image === '/golu.jpg' || !parsed.image) {
              parsed.image = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Golu';
            }
            setAboutData((prev: any) => ({ ...prev, ...parsed }));
  `
);

fs.writeFileSync(path, content);
