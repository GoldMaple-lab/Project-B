import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LESSONS } from '../data/lessons';
import { BookOpen, Star, Trophy } from 'lucide-react';

export default function HomePage({ setPage, setSelectedLesson }) {
  const { userData } = useAuth();
  const progress = userData?.progress || {};

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setPage('lesson');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Learning Path
      </h1>
      <div className="relative flex flex-col items-center">
        {/* The path line */}
        <div className="absolute top-12 bottom-12 w-2 bg-gray-200 rounded-full" />
        
        {MOCK_LESSONS.map((lesson, index) => {
          const isCompleted = progress[lesson.id]?.completed;
          // Logic for unlocking (simplified: previous one must be complete)
          const isLocked = index > 0 && !progress[MOCK_LESSONS[index - 1].id]?.completed;
          
          return (
            <div key={lesson.id} className="my-6 z-10">
              <button
                onClick={() => handleLessonSelect(lesson)}
                disabled={isLocked}
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold text-center p-4 shadow-lg transform transition-all hover:scale-105
                  ${isCompleted ? 'bg-yellow-400 hover:bg-yellow-500' : lesson.color} 
                  ${isLocked ? 'bg-gray-400 cursor-not-allowed opacity-70' : `hover:${lesson.color.replace('500', '600')}`}
                `}
              >
                {isCompleted && <Star className="w-8 h-8 mb-1" />}
                {isLocked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                ) : (
                  <BookOpen className="w-8 h-8 mb-1" />
                )}
                <span className="text-sm leading-tight">{lesson.title}</span>
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
    </div>
  );
}