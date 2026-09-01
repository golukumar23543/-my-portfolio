import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0558671786",
  appId: "1:706401553764:web:dd4c50d50fc5115587be71",
  apiKey: "AIzaSyCadLtFCrxLOxfzbdII8_w8Axc8V98Yq2c",
  authDomain: "gen-lang-client-0558671786.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-surajaryaportfol-ecd1b0e7-38a8-4098-b5f8-d10018650848");

async function run() {
  const docRef = doc(db, 'portfolio', 'settings');
  const snap = await getDoc(docRef);
  let data = snap.exists() ? snap.data() : {};
  
  let projects = [];
  if (data.featured_work) {
    try {
      projects = JSON.parse(data.featured_work);
    } catch(e) {}
  }
  
  const newProjects = [
    {
      title: 'QR Code Generator',
      type: 'WEB APP',
      description: 'A simple and fast QR code generation tool.',
      tags: ['Web'],
      image: 'https://images.unsplash.com/photo-1595054225695-177b9015c928?w=600&auto=format&fit=crop',
      liveLink: 'https://qr-codegenerate.vercel.app/',
      codeLink: ''
    },
    {
      title: 'YouTube Video Downloader',
      type: 'TOOL',
      description: 'A tool to easily download YouTube videos.',
      tags: ['Utility'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop',
      liveLink: 'https://yout-video.vercel.app/',
      codeLink: ''
    },
    {
      title: 'Instagram Downloader',
      type: 'TOOL',
      description: 'Download Instagram photos and videos instantly.',
      tags: ['Utility'],
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&auto=format&fit=crop',
      liveLink: 'https://insta-gram-downloader.vercel.app/',
      codeLink: ''
    },
    {
      title: 'Sender App',
      type: 'WEB APP',
      description: 'A powerful web application for sending messages or data.',
      tags: ['Web', 'App'],
      image: 'https://images.unsplash.com/photo-1577563908411-50cb98976fea?w=600&auto=format&fit=crop',
      liveLink: 'https://sender-app-swart.vercel.app/',
      codeLink: ''
    }
  ];

  // We append them
  projects.push(...newProjects);
  
  data.featured_work = JSON.stringify(projects);
  
  await setDoc(docRef, data, { merge: true });
  console.log('Projects successfully added.');
  process.exit(0);
}

run().catch(console.error);
