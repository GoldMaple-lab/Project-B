import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { BookOpen, Star, Trophy, Home, LogOut, Settings } from 'lucide-react';

export default function Navbar({ setPage }) {
  const { auth, userData, user } = useAuth();
  
  // !!! กำหนดอีเมล Admin ที่นี่ !!!
  const ADMIN_EMAIL = "admin@engduo.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = async () => {
    await signOut(auth);
    setPage('login'); 
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => setPage('home')}
          >
            <span className="text-3xl font-bold text-green-500">English Dream</span>
            <BookOpen className="w-8 h-8 text-green-500 ml-2" />
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setPage('home')}
              className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
            >
              <Home className="w-5 h-5 mr-1" />
              <span className="hidden md:inline">Home</span>
            </button>
            <button
              onClick={() => setPage('leaderboard')}
              className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
            >
              <Trophy className="w-5 h-5 mr-1" />
              <span className="hidden md:inline">Ranking</span>
            </button>
            
            {/* แสดงปุ่มนี้เฉพาะถ้าเป็น Admin เท่านั้น */}
            {isAdmin && (
              <button
                onClick={() => setPage('admin')}
                className="flex items-center text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full transition-colors font-semibold"
              >
                <Settings className="w-4 h-4 mr-1" />
                <span>Admin</span>
              </button>
            )}
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium hidden sm:block truncate max-w-[100px]">
                {userData?.name || 'Guest'}
              </span>
              <div className="flex items-center bg-yellow-400 px-3 py-1 rounded-full text-yellow-800 font-bold">
                <Star className="w-4 h-4 mr-1" />
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
          </div>
        </div>
      </div>
    </nav>
  );
}