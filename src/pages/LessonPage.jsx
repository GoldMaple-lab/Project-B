import React, { useState } from 'react';
import { doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

// Import sub-components
import VideoPlayer from '../components/VideoPlayer';
import InteractiveSection from '../components/InteractiveSection';
import LessonComplete from '../components/LessonComplete';

// Import sound functions
import { playCompleteSound } from '../lib/sounds';

export default function LessonPage({ lesson, setPage }) {
  const [stage, setStage] = useState('video'); // video, practice, quiz, complete
  const [practiceScore, setPracticeScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const { userId, userData, db, appId } = useAuth();

  const handlePracticeComplete = (score) => {
    setPracticeScore(score);
    setStage('quiz');
    playCompleteSound();
  };
  
  const handleQuizComplete = async (score) => {
    setQuizScore(score);
    setStage('complete');
    playCompleteSound();
    
    // --- Update Score in Firestore ---
    const totalPointsEarned = (practiceScore + score); // สมมติให้คะแนนตามนี้
    const currentTotalScore = userData?.totalScore || 0;
    const newTotalScore = currentTotalScore + totalPointsEarned;

    // 1. Update Public Profile (for Leaderboard)
    const userProfileRef = doc(db, `artifacts/${appId}/public/data/userProfiles`, userId);
    await updateDoc(userProfileRef, {
      totalScore: newTotalScore
    });

    // 2. Update Private Progress
    const userProgressRef = doc(db, `artifacts/${appId}/users/${userId}/progress`, lesson.id);
    await setDoc(userProgressRef, {
      completed: true,
      quizScore: score,
      practiceScore: practiceScore,
      completedAt: serverTimestamp()
    }, { merge: true });
    
    console.log("Lesson Complete! Score updated.");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className={`text-3xl font-bold text-center mb-6 ${lesson.color.replace('bg', 'text')}`}>
        {lesson.title}
      </h1>
      
      {/* Stage Indicator */}
      <div className="flex justify-center space-x-4 mb-8">
        <span className={`font-medium p-2 rounded-lg ${stage === 'video' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>1. Video</span>
        <span className={`font-medium p-2 rounded-lg ${stage === 'practice' ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}>2. Practice (10)</span>
        <span className={`font-medium p-2 rounded-lg ${stage === 'quiz' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-500'}`}>3. Quiz</span>
      </div>

      {stage === 'video' && (
        <VideoPlayer 
          videoUrl={lesson.videoUrl} 
          onVideoEnd={() => setStage('practice')} 
        />
      )}
      
      {stage === 'practice' && (
        <InteractiveSection
          key={`practice-${lesson.id}`}
          questions={lesson.practice}
          onComplete={handlePracticeComplete}
          sectionTitle="แบบฝึกหัด (Practice)"
          pointsPerQuestion={10}
        />
      )}
      
      {stage === 'quiz' && (
        <InteractiveSection
          key={`quiz-${lesson.id}`}
          questions={lesson.quiz}
          onComplete={handleQuizComplete}
          sectionTitle="แบบทดสอบหลังเรียน (Quiz)"
          pointsPerQuestion={50}
        />
      )}
      
      {stage === 'complete' && (
        <LessonComplete
          practiceScore={practiceScore}
          quizScore={quizScore}
          setPage={setPage}
        />
      )}
    </div>
  );
}