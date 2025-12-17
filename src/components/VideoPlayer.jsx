import React from 'react';
import { PlayCircle } from 'lucide-react';

export default function VideoPlayer({ videoUrl, onVideoEnd }) {
  
  // ฟังก์ชันแปลงลิงก์ YouTube ปกติ ให้เป็นลิงก์สำหรับ Embed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // รองรับทั้งแบบ youtu.be/ID และ youtube.com/watch?v=ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    // ถ้าไม่ใช่ YouTube (เช่น เป็นลิงก์ไฟล์ mp4 ตรงๆ) ให้คืนค่าเดิม
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative">
        {isYouTube ? (
          // กรณีเป็น YouTube
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="Lesson Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        ) : (
          // กรณีไม่ใช่ YouTube (เช่นไฟล์ mp4 หรือ placeholder)
          <video 
            src={videoUrl} 
            controls 
            className="w-full h-full object-contain"
            // ใส่ fallback เผื่อเป็นรูปภาพ (เช่นตอน mock data)
            onError={(e) => {
               e.target.style.display = 'none';
               // คุณอาจจะอยากแสดง Image tag แทนที่นี่ถ้าลิงก์เป็นรูป
            }}
          >
             Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-center">สื่อวิดีโอการสอน</h3>
      <p className="text-gray-600 text-center mb-6">
        ดูวิดีโอเพื่อเรียนรู้แนวคิดหลักของบทเรียนนี้
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