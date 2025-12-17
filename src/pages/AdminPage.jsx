import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  query 
} from 'firebase/firestore';
import { MOCK_LESSONS } from '../data/mockLessons';
import { Plus, Trash2, Save, UploadCloud, Edit, Video, BookOpen, CheckSquare, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const { db, appId, user } = useAuth();
  
  // !!! ----------------------------------------- !!!
  // !!! สำคัญ: กำหนดอีเมล Admin ที่นี่ (ต้องตรงกับ Navbar) !!!
  const ADMIN_EMAIL = "admin@engduo.com";
  // !!! ----------------------------------------- !!!

  const isAdmin = user?.email === ADMIN_EMAIL;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      fetchLessons();
    }
  }, [isAdmin, db, appId]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      if (!appId) {
          console.error("App ID is missing");
          return;
      }
      const q = query(collection(db, `artifacts/${appId}/public/data/lessons`));
      const querySnapshot = await getDocs(q);
      const loadedLessons = [];
      querySnapshot.forEach((doc) => {
        loadedLessons.push({ id: doc.id, ...doc.data() });
      });
      loadedLessons.sort((a, b) => a.id.localeCompare(b.id)); 
      setLessons(loadedLessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      alert(`โหลดข้อมูลไม่สำเร็จ: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    if (!MOCK_LESSONS || MOCK_LESSONS.length === 0) {
        alert("ไม่พบข้อมูลในไฟล์ mockLessons.js");
        return;
    }

    // แจ้งเตือนให้ชัดเจนว่าข้อมูลจะถูกทับ
    if (!window.confirm(`⚠️ คำเตือน: การกระทำนี้จะ "เขียนทับ" หรือ "เพิ่ม" ข้อมูลทั้งหมดจากไฟล์ mockLessons.js (${MOCK_LESSONS.length} บทเรียน) ลงใน Database \n\nยืนยันหรือไม่?`)) return;
    
    setLoading(true);
    try {
      for (const lesson of MOCK_LESSONS) {
        await setDoc(doc(db, `artifacts/${appId}/public/data/lessons`, lesson.id), lesson);
      }
      alert(`Import ข้อมูลสำเร็จ! (${MOCK_LESSONS.length} บทเรียน)`);
      fetchLessons(); 
    } catch (error) {
      console.error("Error seeding DB:", error);
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLesson = async (e) => {
    e.preventDefault();
    if (!editingLesson.id) return alert("Lesson ID ห้ามว่าง");
    if (!editingLesson.title) return alert("Title ห้ามว่าง");

    try {
      const cleanData = JSON.parse(JSON.stringify(editingLesson));
      const lessonRef = doc(db, `artifacts/${appId}/public/data/lessons`, editingLesson.id);
      await setDoc(lessonRef, cleanData);
      
      alert("บันทึกข้อมูลสำเร็จ!");
      setEditingLesson(null);
      fetchLessons();
    } catch (error) {
      console.error("Error saving:", error);
      alert(`บันทึกไม่สำเร็จ: ${error.message}`);
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ที่จะลบบทเรียนนี้ถาวร?")) return;
    try {
      await deleteDoc(doc(db, `artifacts/${appId}/public/data/lessons`, id));
      fetchLessons();
    } catch (error) {
      console.error("Error deleting:", error);
      alert(`ลบไม่สำเร็จ: ${error.message}`);
    }
  };

  const handleAddNewLesson = () => {
    const newId = `lesson${Date.now()}`;
    setEditingLesson({
      id: newId,
      title: "บทเรียนใหม่",
      color: "bg-gray-500",
      videoUrl: "",
      practice: [],
      quiz: []
    });
  };

  // --- Helper Functions ---
  const updateQuestion = (type, index, field, value) => {
    const updatedLesson = JSON.parse(JSON.stringify(editingLesson));
    updatedLesson[type][index][field] = value;
    setEditingLesson(updatedLesson);
  };

  const addQuestion = (type) => {
    const updatedLesson = JSON.parse(JSON.stringify(editingLesson));
    updatedLesson[type].push({ 
      q: "คำถามใหม่", 
      o: ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C", "ตัวเลือก D"], 
      a: "ตัวเลือก A" 
    });
    setEditingLesson(updatedLesson);
  };

  const removeQuestion = (type, index) => {
    const updatedLesson = JSON.parse(JSON.stringify(editingLesson));
    updatedLesson[type].splice(index, 1);
    setEditingLesson(updatedLesson);
  };

  const updateOption = (type, qIndex, oIndex, value) => {
    const updatedLesson = JSON.parse(JSON.stringify(editingLesson));
    const oldAnswer = updatedLesson[type][qIndex].a;
    const oldOptionValue = updatedLesson[type][qIndex].o[oIndex];

    updatedLesson[type][qIndex].o[oIndex] = value;
    if (oldAnswer === oldOptionValue) {
        updatedLesson[type][qIndex].a = value;
    }
    setEditingLesson(updatedLesson);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 text-lg mb-6">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้ <br/>
          (อนุญาตเฉพาะ: <span className="font-mono font-bold text-gray-800">{ADMIN_EMAIL}</span> เท่านั้น)
        </p>
        <p className="text-sm text-gray-400">อีเมลปัจจุบันของคุณ: {user?.email || 'Guest'}</p>
        <a href="/" className="mt-8 text-blue-600 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1"/> กลับหน้าหลัก
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <span className="bg-red-100 text-red-600 p-2 rounded-lg mr-3 shadow-sm">
                <ShieldAlert className="w-6 h-6" /> 
            </span>
            Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1 ml-14">จัดการเนื้อหาบทเรียนและแบบทดสอบ</p>
        </div>
        
        <div className="flex space-x-3">
           {/* แก้ไข: ลบเงื่อนไข lessons.length === 0 ออก เพื่อให้ปุ่มแสดงตลอดเวลา */}
           <button 
              onClick={seedDatabase}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center shadow transition-transform transform hover:scale-105"
            >
              <UploadCloud className="w-5 h-5 mr-2" /> 
              Reset / Import Data
            </button>
           
           <button 
            onClick={handleAddNewLesson}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center shadow transition-transform transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" /> เพิ่มบทเรียนใหม่
          </button>
        </div>
      </div>

      {editingLesson ? (
        // --- Edit Form ---
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700 flex items-center">
              <Edit className="w-6 h-6 mr-2"/> 
              {lessons.find(l => l.id === editingLesson.id) ? 'แก้ไขบทเรียน' : 'สร้างบทเรียนใหม่'}
            </h2>
            <button 
                onClick={() => setEditingLesson(null)} 
                className="text-gray-500 hover:text-red-500 font-medium px-3 py-1 rounded hover:bg-red-50 transition"
            >
                ยกเลิก
            </button>
          </div>

          <form onSubmit={handleSaveLesson} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Lesson ID</label>
                <input 
                  type="text" 
                  value={editingLesson.id} 
                  onChange={e => setEditingLesson({...editingLesson, id: e.target.value})}
                  className={`mt-1 block w-full border rounded-lg p-3 ${lessons.find(l => l.id === editingLesson.id) ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                  readOnly={!!lessons.find(l => l.id === editingLesson.id)}
                  placeholder="เช่น lesson5"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อบทเรียน</label>
                <input 
                  type="text" 
                  value={editingLesson.title} 
                  onChange={e => setEditingLesson({...editingLesson, title: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Video URL (YouTube)</label>
                <div className="flex mt-1">
                   <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500">
                     <Video className="h-5 w-5" />
                   </span>
                   <input 
                    type="text" 
                    value={editingLesson.videoUrl} 
                    onChange={e => setEditingLesson({...editingLesson, videoUrl: e.target.value})}
                    className="block w-full border border-gray-300 rounded-r-lg p-3 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">สีธีม</label>
                <select 
                   value={editingLesson.color}
                   onChange={e => setEditingLesson({...editingLesson, color: e.target.value})}
                   className="mt-1 block w-full border border-gray-300 rounded-lg p-3 bg-white"
                >
                  <option value="bg-green-500">Green</option>
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-yellow-500">Yellow</option>
                  <option value="bg-red-500">Red</option>
                  <option value="bg-purple-500">Purple</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {['practice', 'quiz'].map((type) => (
                <div key={type} className="border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
                        <h3 className="text-lg font-bold capitalize flex items-center text-gray-700">
                            {type === 'practice' ? <BookOpen className="w-5 h-5 mr-2 text-green-600"/> : <CheckSquare className="w-5 h-5 mr-2 text-yellow-600"/>}
                            {type} Questions
                            <span className="ml-2 bg-white text-gray-600 text-xs px-2 py-1 rounded-full border">
                                {editingLesson[type]?.length || 0} ข้อ
                            </span>
                        </h3>
                        <button 
                            type="button" 
                            onClick={() => addQuestion(type)} 
                            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 shadow transition"
                        >
                            + เพิ่มคำถาม
                        </button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {editingLesson[type]?.map((q, qIndex) => (
                        <div key={qIndex} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative group">
                            <button 
                                type="button" 
                                onClick={() => removeQuestion(type, qIndex)} 
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition p-1"
                                title="ลบข้อนี้"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                            
                            <div className="mb-3 pr-6">
                                <label className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 block">ข้อที่ {qIndex + 1}</label>
                                <textarea 
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-blue-500 resize-none text-gray-800 font-medium"
                                    rows="2"
                                    value={q.q}
                                    onChange={(e) => updateQuestion(type, qIndex, 'q', e.target.value)}
                                    placeholder="โจทย์..."
                                />
                            </div>

                            <div className="space-y-2 mb-3">
                                {q.o.map((opt, oIndex) => (
                                <div key={oIndex} className="flex items-center">
                                    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-2 border ${opt === q.a ? 'bg-green-500 text-white border-green-500' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>
                                        {String.fromCharCode(65 + oIndex)}
                                    </div>
                                    <input 
                                        className={`w-full text-sm border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${opt === q.a ? 'bg-green-50 border-green-200' : 'bg-white border-gray-300'}`}
                                        value={opt}
                                        onChange={(e) => updateOption(type, qIndex, oIndex, e.target.value)}
                                        placeholder={`ตัวเลือก ${oIndex + 1}`}
                                    />
                                </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-end bg-gray-50 p-2 rounded border border-dashed border-gray-300">
                                <span className="mr-2 text-xs font-bold text-gray-500 uppercase">เฉลย:</span>
                                <select 
                                    value={q.a} 
                                    onChange={(e) => updateQuestion(type, qIndex, 'a', e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-green-500 text-gray-700 max-w-[200px]"
                                >
                                {q.o.map((opt, i) => <option key={i} value={opt}>{opt || `(ว่าง) ตัวเลือก ${i+1}`}</option>)}
                                </select>
                            </div>
                        </div>
                    ))}
                    {(!editingLesson[type] || editingLesson[type].length === 0) && (
                        <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                            ยังไม่มีคำถาม
                        </div>
                    )}
                    </div>
                </div>
                ))}
            </div>

            <div className="flex justify-end pt-6 border-t mt-8 sticky bottom-0 bg-white pb-4 z-10">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center transform transition hover:-translate-y-1"
              >
                <Save className="w-5 h-5 mr-2" /> บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </form>
        </div>
      ) : (
        // --- List View ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
             <div className="col-span-full flex justify-center py-20">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
             </div>
          ) : lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border-t-4 border-t-transparent hover:border-t-blue-500 flex flex-col h-full group">
               <div className="flex justify-between items-start mb-3">
                 <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">{lesson.title}</h3>
                 <span className={`w-4 h-4 rounded-full ${lesson.color} flex-shrink-0 ml-2 shadow-sm border border-white ring-1 ring-gray-100`}></span>
               </div>
               
               <p className="text-xs text-gray-400 font-mono mb-4 bg-gray-50 p-1 rounded inline-block self-start">ID: {lesson.id}</p>
               
               <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4 border border-gray-100">
                    <span className="flex items-center" title="แบบฝึกหัด"><BookOpen className="w-4 h-4 mr-1.5 text-green-500"/> {lesson.practice?.length || 0}</span>
                    <span className="flex items-center" title="แบบทดสอบ"><CheckSquare className="w-4 h-4 mr-1.5 text-yellow-500"/> {lesson.quiz?.length || 0}</span>
                </div>
                
                <div className="flex space-x-2">
                    <button 
                    onClick={() => setEditingLesson(lesson)}
                    className="flex-1 bg-white border border-blue-200 text-blue-600 py-2 rounded-lg hover:bg-blue-50 flex justify-center items-center transition font-medium"
                    >
                    <Edit className="w-4 h-4 mr-1.5" /> แก้ไข
                    </button>
                    <button 
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="bg-white border border-red-200 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                    title="ลบบทเรียน"
                    >
                    <Trash2 className="w-4 h-4" />
                    </button>
                </div>
               </div>
            </div>
          ))}
          
          <button 
            onClick={handleAddNewLesson}
            className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-400 hover:text-green-600 hover:border-green-400 hover:bg-green-50 transition cursor-pointer min-h-[250px]"
          >
            <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:bg-white transition">
                <Plus className="w-8 h-8" />
            </div>
            <span className="font-medium">เพิ่มบทเรียนใหม่</span>
          </button>
        </div>
      )}
    </div>
  );
}


// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {

//     match /userProfiles/{userId} {
//       allow read, write: if request.auth.uid == userId;
//     }

//     match /users/{userId}/progress/{progressId} {
//       allow read, write: if request.auth.uid == userId;
//     }

//     match /artifacts/default-english-app/public/data/userProfiles/{userId} {
//        allow read, write: if request.auth.uid == userId;
//     }
//     match /artifacts/default-english-app/users/{userId}/progress/{progressId} {
//        allow read, write: if request.auth.uid == userId;
//     }
//     match /artifacts/default-english-app/public/data/lessons/{lessonId} {
//        allow read: if request.auth != null;
//        allow write: if false;
//     }
    

//   }
// }