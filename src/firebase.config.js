import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'githubber-7a4ad.firebaseapp.com',
  projectId: 'githubber-7a4ad',
  storageBucket: 'githubber-7a4ad.appspot.com',
  messagingSenderId: '165376068704',
  appId: '1:165376068704:web:f81e31ab487856f29ec705',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
