// src/components/Navbar.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Star, 
  Trophy, 
  Home, 
  LogOut, 
  LogIn // 1. Import ไอคอน LogIn 
} from 'lucide-react';

export default function Navbar({ setPage }) {
  // 2. ดึง 'user' มาจาก useAuth() เพื่อเช็คสถานะ
  const { auth, userData, user } = useAuth(); 
  
  const handleLogout = async () => {
    await signOut(auth);
    setPage('login'); // Redirect to login
  };

  // 3. เช็คว่า user ล็อกอิน (ไม่ใช่ anonymous) หรือไม่
  const isLoggedIn = user && !user.isAnonymous;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (คลิกแล้วไปหน้า Home ถ้าล็อกอินแล้ว, ไปหน้า Login ถ้ายัง) */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            // 4. อัปเดต onClick ของ Logo
            onClick={() => setPage(isLoggedIn ? 'home' : 'login')}
          >
            <span className="text-3xl font-bold text-green-500">EngDu</span>
            <BookOpen className="w-8 h-8 text-green-500 ml-2" />
          </div>
          
          {/* Nav Links (เปลี่ยนตามสถานะล็อกอิน) */}
          <div className="flex items-center space-x-6">

            {/* 5. ใช้ Conditional Rendering */}
            {isLoggedIn ? (
              <>
                {/* --- เมนูเมื่อล็อกอินแล้ว --- */}
                <button
                  onClick={() => setPage('home')}
                  className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Home className="w-5 h-5 mr-1" />
                  Home
                </button>
                <button
                  onClick={() => setPage('leaderboard')}
                  className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Trophy className="w-5 h-5 mr-1" />
                  Ranking
                </button>
                
                {/* User Info & Logout */}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium hidden sm:block">
                    {userData?.name || 'Guest'}
                  </span>
                  <div className="flex items-center bg-yellow-400 px-3 py-1 rounded-full text-yellow-800 font-bold">
                    <Star className="w-5 h-5 mr-1" />
                    {userData?.totalScore || 0}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 focus:outline-none"
                    title="Log Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* --- เมนูเมื่อยังไม่ล็อกอิน --- */}
                <button
                  onClick={() => setPage('login')}
                  className="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <LogIn className="w-5 h-5 mr-1" />
                  Log In / Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}