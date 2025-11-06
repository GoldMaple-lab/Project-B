import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  signInAnonymously, // เรียกใช้ที่ LoginPage แทน
  signInWithCustomToken, 
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs,
  onSnapshot
} from 'firebase/firestore';

// Import จากไฟล์ที่สร้าง
import { auth, db, appId } from '../config/firebase';
import { initializeSounds } from '../lib/sounds';

// --- Auth Context ---
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// --- AuthProvider Component ---
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    initializeSounds(); 

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // (ถ้ามี user ให้ดึงข้อมูล profile)
        setUser(firebaseUser);
        setUserId(firebaseUser.uid);
        
        const userProfileRef = doc(db, `artifacts/${appId}/public/data/userProfiles`, firebaseUser.uid);
        const userProgressColRef = collection(db, `artifacts/${appId}/users/${firebaseUser.uid}/progress`);

        const unsubProfile = onSnapshot(userProfileRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(prev => ({ ...prev, ...docSnap.data() }));
          }
        });

        const progressSnap = await getDocs(userProgressColRef);
        const progress = {};
        progressSnap.forEach(doc => {
          progress[doc.id] = doc.data();
        });
        setUserData(prev => ({ ...prev, progress: progress }));

        setLoading(false);
        
        return () => {
          unsubProfile(); 
        };

      } else {
        // ถ้าไม่มี user (และไม่มี token) ให้ตั้งค่าเป็น null และหยุด loading
        // ลบ signInAnonymously() อัตโนมัติออกจากตรงนี้
        // เพื่อให้ผู้ใช้ "ค้าง" อยู่ที่หน้า Login
        const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        if (token) {
          try {
            await signInWithCustomToken(auth, token);
            // onAuthStateChanged จะถูกเรียกอีกครั้ง
          } catch (e) {
            console.error("Custom token sign-in failed:", e);
            // Token พัง, ตั้งค่าเป็น null
            setUser(null);
            setUserId(null);
            setUserData(null);
            setLoading(false);
          }
        } else {
          // ไม่มี Token และไม่มี User, ตั้งค่าเป็น null และหยุด loading
          setUser(null);
          setUserId(null);
          setUserData(null);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userId,
    userData,
    loading,
    db,
    auth,
    appId
  };

  return (
    <AuthContext.Provider value={value}>
      {children} 
      {/* 
                หมายเหตุ: `!loading &&` จากตรงนี้ ย้ายไปไว้ใน App.jsx เพื่อให้ AuthProvider ครอบคลุม App ทั้งหมดได้ แม้ในขณะ loading 
      */}
    </AuthContext.Provider>
  );
};