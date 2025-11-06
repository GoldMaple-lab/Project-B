import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously // 1. Import signInAnonymously
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { UserPlus, LogIn, User } from 'lucide-react'; // 2. Import ไอคอน User
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ setPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [error, setError] = useState('');
  const { auth, db, appId } = useAuth();

  const handleSubmit = async (e) => {
    // ... (ฟังก์ชัน handleSubmit) ...
    e.preventDefault();
    setError('');

    if (isLogin) {
      // --- Handle Login ---
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setPage('home'); 
      } catch (err) {
        setError(err.message);
      }
    } else {
      // --- Handle Sign Up ---
      if (username.trim().length < 3) {
        setError("Username must be at least 3 characters.");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userProfileRef = doc(db, `artifacts/${appId}/public/data/userProfiles`, user.uid);
        await setDoc(userProfileRef, {
          name: username,
          totalScore: 0,
          createdAt: serverTimestamp()
        });
        
        const userPrivateRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "data");
        await setDoc(userPrivateRef, {
          email: user.email,
          name: username
        });
        
        setPage('home');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // 3. ฟังก์ชันสำหรับล็อกอิน Guest
  const handleGuestLogin = async () => {
    setError('');
    try {
      await signInAnonymously(auth);
      // App.jsx จะตรวจจับการเปลี่ยนแปลง และ redirect ไปหน้า 'home'
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        
        {/* ... (ฟอร์ม login/signup) ... */}
        <form onSubmit={handleSubmit}>
          {/* ... (input fields ทั้งหมด) ... */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="username">Username</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-300 transform hover:-translate-y-1">
            {isLogin ? <LogIn className="inline-block mr-2" /> : <UserPlus className="inline-block mr-2" />}
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        {/* --- 4. ปุ่ม GUEST --- */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-300 transform hover:-translate-y-1"
        >
          <User className="inline-block mr-2" />
          Continue as Guest
        </button>
        {/* --- สิ้นสุดส่วนปุ่ม GUEST --- */}

        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700 font-medium ml-2 focus:outline-none"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}