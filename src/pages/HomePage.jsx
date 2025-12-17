import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'; // เพิ่มการดึงข้อมูล
import { BookOpen, Star, Trophy, Lock, Loader2 } from 'lucide-react';

export default function HomePage({ setPage, setSelectedLesson }) {
  const { userData, db, appId } = useAuth();
  const progress = userData?.progress || {};
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลบทเรียนแบบ Real-time จาก Firestore
  useEffect(() => {
    if (!db || !appId) return;

    const q = query(collection(db, `artifacts/${appId}/public/data/lessons`));
    
    // ใช้ onSnapshot เพื่อให้เวลาแก้ในหน้า Admin หน้า Home ก็เปลี่ยนทันทีโดยไม่ต้องรีเฟรช
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedLessons = [];
      snapshot.forEach((doc) => {
        loadedLessons.push({ id: doc.id, ...doc.data() });
      });
      // เรียงลำดับบทเรียน (ในที่นี้เรียงตาม ID หรือคุณจะเพิ่ม field 'order' ก็ได้)
      loadedLessons.sort((a, b) => a.id.localeCompare(b.id)); 
      setLessons(loadedLessons);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, appId]);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setPage('lesson');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-green-500 w-10 h-10"/></div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Learning Path
      </h1>
      
      {lessons.length === 0 ? (
        <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
           <p className="text-yellow-700">ไม่พบข้อมูลบทเรียน</p>
           <p className="text-sm text-yellow-600 mt-2">กรุณาไปที่หน้า Admin Dashboard เพื่อกด "Initialize Data"</p>
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <div className="absolute top-12 bottom-12 w-2 bg-gray-200 rounded-full" />
          
          {lessons.map((lesson, index) => {
            const isCompleted = progress[lesson.id]?.completed;
            const isLocked = index > 0 && !progress[lessons[index - 1].id]?.completed;
            
            return (
              <div key={lesson.id} className="my-6 z-10">
                <button
                  onClick={() => handleLessonSelect(lesson)}
                  disabled={isLocked}
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold text-center p-4 shadow-lg transform transition-all hover:scale-105
                    ${isCompleted ? 'bg-yellow-400 hover:bg-yellow-500' : (lesson.color || 'bg-gray-500')} 
                    ${isLocked ? 'bg-gray-400 cursor-not-allowed opacity-70' : `hover:brightness-110`}
                  `}
                >
                  {isCompleted && <Star className="w-8 h-8 mb-1" />}
                  {isLocked ? (
                    <Lock className="w-8 h-8 mb-1" />
                  ) : (
                    <BookOpen className="w-8 h-8 mb-1" />
                  )}
                  <span className="text-sm leading-tight line-clamp-2">{lesson.title}</span>
                </button>
              </div>
            );
          })}
          
          <div className="my-6 z-10">
             <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center p-4 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
               <Trophy className="w-10 h-10 mb-1" />
               <span className="text-sm font-bold">End of Path</span>
             </div>
          </div>
          
        </div>
      )}
    </div>
  );
}