import React from 'react';
import { PlayCircle } from 'lucide-react';

export default function VideoPlayer({ videoUrl, onVideoEnd }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Placeholder for video */}
        <img src={videoUrl} alt="Lesson Video" className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-center">สื่อวิดีโอการสอน</h3>
      <p className="text-gray-600 text-center mb-6">
        ดูวิดีโอเพื่อเรียนรู้เกี่ยวกับบทเรียนนี้ให้จบก่อนที่จะไปต่อ
      </p>
      <button
        onClick={onVideoEnd}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-300"
      >
        <PlayCircle className="inline-block mr-2" />
        ดูจบแล้ว (ไปต่อ)
      </button>
    </div>
  );
}