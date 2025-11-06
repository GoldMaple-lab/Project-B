// ไม่ใช้แล้ว แต่เก็บไว้เป็นตัวอย่างข้อมูลบทเรียน เพราะของจริงจะดึงจาก Firestore นะจ้ะ
export const MOCK_LESSONS = [
  {
    id: "lesson1",
    title: "บทที่ 1: การทักทาย (Greetings)",
    color: "bg-green-500",
    videoUrl: "https://placehold.co/600x400/34d399/ffffff?text=Lesson+1:+Greetings+Video",
    practice: [
      { q: "How do you say 'สวัสดี' in English?", o: ["Hello", "Goodbye", "Thank you"], a: "Hello" },
      { q: "'How are you?' means...", o: ["สบายดีไหม", "ลาก่อน", "ขอบคุณ"], a: "สบายดีไหม" },
      { q: "Respond to 'Nice to meet you.'", o: ["My name is...", "Nice to meet you, too.", "I am fine."], a: "Nice to meet you, too." },
      { q: "Q4", o: ["A", "B", "C"], a: "A" },
      { q: "Q5", o: ["A", "B", "C"], a: "A" },
      { q: "Q6", o: ["A", "B", "C"], a: "A" },
      { q: "Q7", o: ["A", "B", "C"], a: "A" },
      { q: "Q8", o: ["A", "B", "C"], a: "A" },
      { q: "Q9", o: ["A", "B", "C"], a: "A" },
      { q: "Q10", o: ["A", "B", "C"], a: "A" },
    ],
    quiz: [
      { q: "Quiz 1: 'Good morning' is used...", o: ["In the morning", "At night"], a: "In the morning" },
      { q: "Quiz 2: What is 'ขอบคุณ'?", o: ["Hello", "Thank you"], a: "Thank you" },
    ]
  },
  {
    id: "lesson2",
    title: "บทที่ 2: ครอบครัว (Family)",
    color: "bg-blue-500",
    videoUrl: "https://placehold.co/600x400/60a5fa/ffffff?text=Lesson+2:+Family+Video",
    practice: [
      { q: "Who is 'father'?", o: ["พ่อ", "แม่"], a: "พ่อ" },
    ],
    quiz: [
       { q: "Quiz 1: 'Sister' means...", o: ["พี่สาว/น้องสาว", "พี่ชาย/น้องชาย"], a: "พี่สาว/น้องสาว" },
    ]
  },
  {
    id: "lesson3",
    title: "บทที่ 3: อาหาร (Food)",
    color: "bg-yellow-500",
    videoUrl: "https://placehold.co/600x400/facc15/ffffff?text=Lesson+3:+Food+Video",
    practice: [
      { q: "What is 'apple'?", o: ["แอปเปิ้ล", "ส้ม"], a: "แอปเปิ้ล" },
    ],
    quiz: [
       { q: "Quiz 1: 'I am hungry' means...", o: ["ฉันหิว", "ฉันอิ่ม"], a: "ฉันหิว" },
    ]
  },
  {
    id: "lesson4",
    title: "บทที่ 4: การเดินทาง (Travel)",
    color: "bg-red-500",
    videoUrl: "https://placehold.co/600x400/f87171/ffffff?text=Lesson+4:+Travel+Video",
    practice: [
      { q: "What is 'bus'?", o: ["รถบัส", "รถไฟ"], a: "รถบัส" },
    ],
    quiz: [
       { q: "Quiz 1: 'Where is the...?' means...", o: ["...อยู่ที่ไหน", "...ราคาเท่าไหร่"], a: "...อยู่ที่ไหน" },
    ]
  }
];