import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyCA6cqJHdFlenuHrJG6XE134eoZWPEdpQY",
  authDomain: "engdu-app.firebaseapp.com",
  projectId: "engdu-app",
  storageBucket: "engdu-app.firebasestorage.app",
  messagingSenderId: "350386772941",
  appId: "1:350386772941:web:ac6e699b7dc8a40c884284",
  measurementId: "G-9DZ5NQREVR"
};

// --- App ID (Global Variable) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-english-app';

// --- Initialize Firebase ---
let app, auth, db;

// เราใช้ config จาก global 
const configString = typeof __firebase_config !== 'undefined' 
  ? __firebase_config 
  : JSON.stringify(firebaseConfig);
  
app = initializeApp(JSON.parse(configString));
auth = getAuth(app);
db = getFirestore(app);

// เปิด Debug log (เอาออกเมื่อใช้งานจริง)
setLogLevel('debug'); 

export { app, auth, db, appId };

// Initialize Firebase