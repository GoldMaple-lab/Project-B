import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { playCorrectSound, playIncorrectSound } from '../lib/sounds';

export default function InteractiveSection({ questions, onComplete, sectionTitle, pointsPerQuestion }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState('pending'); // pending, correct, incorrect
  const [score, setScore] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);

  const question = questions[currentQ];

  const handleAnswerSelect = (option) => {
    if (status !== 'pending') return; // Answer already submitted
    setSelectedAnswer(option);
    
    if (option === question.a) {
      setStatus('correct');
      setScore(s => s + pointsPerQuestion);
      playCorrectSound();
      setShowScorePopup(true);
      setTimeout(() => setShowScorePopup(false), 1000); // Popup effect
    } else {
      setStatus('incorrect');
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    setStatus('pending');
    setSelectedAnswer(null);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      // Finished!
      onComplete(score);
    }
  };

  const getButtonClass = (option) => {
    if (status === 'pending') {
      return 'bg-white hover:bg-gray-50';
    }
    if (option === question.a) {
      return 'bg-green-100 border-green-500 ring-2 ring-green-500'; // Correct answer
    }
    if (option === selectedAnswer) {
      return 'bg-red-100 border-red-500 ring-2 ring-red-500'; // Wrong selected answer
    }
    return 'bg-gray-100 text-gray-500'; // Disabled
  };

  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl min-h-[400px] flex flex-col relative">
      {/* Score Popup Effect */}
      {showScorePopup && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <span className="text-5xl font-bold text-green-500 animate-ping opacity-75">
            +{pointsPerQuestion}
          </span>
          <span className="absolute top-0 left-0 text-5xl font-bold text-green-500 animate-pulse">
            +{pointsPerQuestion}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div 
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-700 mb-1">{sectionTitle}</h2>
      <p className="text-2xl font-medium text-gray-900 mb-6">
        {question.q}
      </p>
      
      <div className="space-y-4 flex-grow">
        {question.o.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={status !== 'pending'}
            className={`w-full text-left p-4 rounded-lg border-2 font-medium text-gray-800 transition-all duration-200
              ${getButtonClass(option)}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* Bottom Feedback Bar */}
      <div className="mt-8">
        {status === 'correct' && (
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
              <span className="text-xl font-bold text-green-600">Correct!</span>
            </div>
            <button onClick={handleNext} className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg">
              Next
            </button>
          </div>
        )}
        {status === 'incorrect' && (
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500 mr-3" />
              <span className="text-xl font-bold text-red-600">Incorrect. Correct answer is: {question.a}</span>
            </div>
            <button onClick={handleNext} className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}