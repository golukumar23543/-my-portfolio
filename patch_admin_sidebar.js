import fs from 'fs';
let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

// We will inject logic to dynamically render service tabs.
// First, find the Sidebar rendering area.
let sidebarStart = content.indexOf('<div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/10 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0 snap-x">');
if(sidebarStart === -1) console.log('Sidebar start not found');

let beforeSidebar = content.substring(0, sidebarStart);

