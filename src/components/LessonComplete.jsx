import React from 'react';
import { Star } from 'lucide-react';

export default function LessonComplete({ practiceScore, quizScore, setPage }) {
  const totalScore = practiceScore + quizScore;
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
      <Star className="w-24 h-24 text-yellow-400 mx-auto animate-bounce" />
      <h2 className="text-4xl font-bold text-green-600 mt-4 mb-2">
        Lesson Complete!
      </h2>
      <p className="text-xl text-gray-700 mb-6">
        ยอดเยี่ยมมาก คุณเรียนจบบทเรียนนี้แล้ว!
      </p>
      <div className="space-y-4 text-left max-w-xs mx-auto mb-8">
        <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
          <span className="text-lg text-green-800">Practice Score:</span>
          <span className="text-lg font-bold text-green-800">{practiceScore}</span>
        </div>
        <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-lg">
          <span className="text-lg text-yellow-800">Quiz Score:</span>
          <span className="text-lg font-bold text-yellow-800">{quizScore}</span>
        </div>
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border-2 border-blue-500">
          <span className="text-xl text-blue-800">Total Points:</span>
          <span className="text-xl font-bold text-blue-800">+{totalScore}</span>
        </div>
      </div>
      
      <button
        onClick={() => setPage('home')}
        className="w-full max-w-xs mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}