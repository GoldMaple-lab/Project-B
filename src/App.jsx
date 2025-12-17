import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminPage from './pages/AdminPage'; // Import AdminPage

function App() {
  const [page, setPage] = useState('login'); // 'login', 'home', 'lesson', 'leaderboard', 'admin'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && (page === 'login' || page === '')) {
        setPage('home');
      } else if (!user && page !== 'login') {
        setPage('login');
      }
    }
  }, [user, page, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading App...</h1>
      </div>
    );
  }

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
      case 'admin':
        return <AdminPage />;
      default:
        setPage('login');
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {page !== 'login' && <Navbar setPage={setPage} />}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;