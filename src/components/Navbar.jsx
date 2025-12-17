import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { BookOpen, Star, Trophy, Home, LogOut, Settings } from 'lucide-react';

export default function Navbar({ setPage }) {
  const { auth, userData, user } = useAuth();
  
  // !!! ตรวจสอบอีเมล Admin !!!
  const ADMIN_EMAIL = "admin@engduo.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = async () => {
    await signOut(auth);
    setPage('login'); 
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* ปรับ px-4 เป็น px-2 ในมือถือเพื่อให้มีที่ว่างเนื้อหามากขึ้น */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - ปรับลดขนาดตัวอักษรและไอคอนในมือถือ */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer active:opacity-70 transition"
            onClick={() => setPage('home')}
          >
            <span className="text-xl sm:text-3xl font-extrabold text-green-500 tracking-tight">English Dream</span>
            <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-green-500 ml-1 sm:ml-2" />
          </div>
          
          {/* Menu Items - ปรับลดระยะห่างระหว่างปุ่ม (space-x) */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            
            {/* ปุ่มต่างๆ ปรับลด Padding (p-1.5) และขนาดไอคอน (w-5 h-5) ในมือถือ */}
            <button
              onClick={() => setPage('home')}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-green-500 transition-colors rounded-xl hover:bg-green-50"
              title="Home"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => setPage('leaderboard')}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-yellow-500 transition-colors rounded-xl hover:bg-yellow-50"
              title="Leaderboard"
            >
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {isAdmin && (
              <button
                onClick={() => setPage('admin')}
                className="p-1.5 sm:p-2 text-red-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                title="Admin"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
            
            {/* เส้นแบ่ง */}
            <div className="h-4 sm:h-6 w-px bg-gray-200 mx-1 sm:mx-2"></div>

            {/* Score Display - ปรับตัวอักษรให้เล็กลง */}
            <div className="flex items-center bg-yellow-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-yellow-200">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 mr-1 fill-yellow-600" />
                <span className="text-xs sm:text-sm font-bold text-yellow-700">{userData?.totalScore || 0}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}