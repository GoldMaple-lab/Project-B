import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';

// Import Pages and Components
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Navbar from './components/Navbar';

export default function App() {
  const [page, setPage] = useState('login'); 
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { user, loading } = useAuth(); // ดึง loading 

  useEffect(() => {
    // กฎข้อที่ 1: (เด้งคนไม่ล็อกอินออกจากหน้าอื่น)ถ้า userไม่มีและถ้าผู้ใช้ไม่ได้อยู่ที่หน้า 'login')บังคับเด้งไปหน้า 'login'
    if (!loading) {
      
      if (!user && page !== 'login') { 
        setPage('login');
      } 
      // กฎข้อที่ 2: (เด้งคนล็อกอินแล้ว ออกจากหน้า login)
      // ถ้า: (user มี และ user ไม่ใช่ Guest)
      // และ: (เราอยู่ที่หน้า 'login')
      // ให้: เด้งไปหน้า 'home' (เพราะล็อกอินค้างไว้)
      else if (user && !user.isAnonymous && page === 'login') { 
        setPage('home'); 
      }
      
    }
  }, [user, page, loading, setPage]); // 3. เพิ่ม loading ใน dependency
  
  if (loading) {
    // 4. แสดงหน้า Loading ขณะที่ AuthContext กำลังตรวจสอบ user
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading App...</h1>
      </div>
    );
  }

  // Render Page Content
  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage setPage={setPage} />;
      case 'home':
        return <HomePage setPage={setPage} setSelectedLesson={setSelectedLesson} />;
      case 'lesson':
        if (selectedLesson) {
          return <LessonPage lesson={selectedLesson} setPage={setPage} />;
        }
        setPage('home'); 
        return null;
      case 'leaderboard':
        return <LeaderboardPage />;
      default:
        return <LoginPage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar setPage={setPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}
