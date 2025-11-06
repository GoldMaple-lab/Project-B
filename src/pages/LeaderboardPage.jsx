import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Trophy, Star } from 'lucide-react';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db, appId } = useAuth();

  useEffect(() => {
    const leaderboardRef = collection(db, `artifacts/${appId}/public/data/userProfiles`);
    // (หมายเหตุ: ใน Firestore จะ sort โดยตรง  fetch แล้ว sort ใน client-side เพื่อความง่าย) อย่าถามเยอะ อธิบายไม่ถูก
    
    const q = query(leaderboardRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort locally by totalScore (descending)
      users.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
      
      setLeaderboard(users.slice(0, 10)); // Top 10
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leaderboard: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, appId]);

  if (loading) {
    return <div className="text-center p-10">Loading Ranking...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-8 flex items-center justify-center">
        <Trophy className="w-10 h-10 mr-3" />
        Leaderboard
      </h1>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {leaderboard.map((user, index) => (
            <li key={user.id} className={`flex items-center p-6 ${index === 0 ? 'bg-yellow-50' : ''}`}>
              <span className={`text-2xl font-bold ${
                index === 0 ? 'text-yellow-500' : 
                index === 1 ? 'text-gray-500' :
                index === 2 ? 'text-yellow-700' : 'text-gray-400'
              } w-10`}>
                {index + 1}
              </span>
              <div className="flex-1 ml-4">
                <span className="text-lg font-medium text-gray-800">{user.name}</span>
              </div>
              <div className="flex items-center bg-yellow-400 px-4 py-1 rounded-full text-yellow-800 font-bold">
                <Star className="w-5 h-5 mr-2" />
                {user.totalScore}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}