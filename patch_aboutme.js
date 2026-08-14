import fs from 'fs';
let code = fs.readFileSync('src/components/AboutMe.tsx', 'utf8');

const targetEffect = `try {
            const parsed = JSON.parse(data.about_me);
            // Optionally, we can merge or override here if the db has custom text, 
            // but we'll stick to the default state unless it's strictly overridden.
            // setAboutData(parsed); 
          } catch(e) {`;
const newEffect = `try {
            const parsed = JSON.parse(data.about_me);
            setAboutData((prev: any) => ({ ...prev, ...parsed }));
          } catch(e) {`;

code = code.replace(targetEffect, newEffect);
fs.writeFileSync('src/components/AboutMe.tsx', code);
