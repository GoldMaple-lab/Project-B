export const MOCK_LESSONS = [
  {
    id: "lesson1",
    title: "บทที่ 1: การทักทาย (Greetings)",
    color: "bg-green-500",
    videoUrl: "https://www.youtube.com/watch?v=Fw0rdSHzWFY", // ตัวอย่าง YouTube
    practice: [
      { q: "How do you say 'สวัสดี' in English?", o: ["Hello", "Goodbye", "Thank you"], a: "Hello" },
      { q: "'How are you?' means...", o: ["สบายดีไหม", "ลาก่อน", "ขอบคุณ"], a: "สบายดีไหม" },
      { q: "Respond to 'Nice to meet you.'", o: ["My name is...", "Nice to meet you, too.", "I am fine."], a: "Nice to meet you, too." },
      { q: "Good morning uses in...", o: ["Morning", "Evening", "Night"], a: "Morning" },
      { q: "What is 'Good night'?", o: ["ราตรีสวัสดิ์", "อรุณสวัสดิ์"], a: "ราตรีสวัสดิ์" },
      { q: "See you later means...", o: ["ไว้เจอกันใหม่", "ขอบคุณ"], a: "ไว้เจอกันใหม่" },
      { q: "Excuse me uses for...", o: ["Apologize/Attention", "Greeting"], a: "Apologize/Attention" },
      { q: "I am fine, thank you. And you?", o: ["Asking back", "Saying goodbye"], a: "Asking back" },
      { q: "What is 'name'?", o: ["ชื่อ", "นามสกุล"], a: "ชื่อ" },
      { q: "Bye bye uses for...", o: ["Goodbye", "Greeting"], a: "Goodbye" },
    ],
    quiz: [
      { q: "Quiz 1: 'Good morning' is used...", o: ["In the morning", "At night"], a: "In the morning" },
      { q: "Quiz 2: What is 'ขอบคุณ'?", o: ["Hello", "Thank you"], a: "Thank you" },
      { q: "Quiz 3: Goodbye in Thai is...", o: ["ลาก่อน", "สวัสดี"], a: "ลาก่อน" },
      { q: "Quiz 4: Nice to meet you too.", o: ["ยินดีที่ได้รู้จักเช่นกัน", "เสียใจด้วย"], a: "ยินดีที่ได้รู้จักเช่นกัน" },
      { q: "Quiz 5: How are you?", o: ["คุณสบายดีไหม", "คุณชื่ออะไร"], a: "คุณสบายดีไหม" }
    ]
  },
  {
    id: "lesson2",
    title: "บทที่ 2: ครอบครัว (Family)",
    color: "bg-blue-500",
    videoUrl: "https://www.youtube.com/watch?v=FHaObkHEkHQ",
    practice: [
       { q: "Who is 'father'?", o: ["พ่อ", "แม่"], a: "พ่อ" },
       { q: "Who is 'mother'?", o: ["พ่อ", "แม่"], a: "แม่" },
       { q: "Brother means...", o: ["พี่ชาย/น้องชาย", "พี่สาว"], a: "พี่ชาย/น้องชาย" },
       { q: "Sister means...", o: ["พี่สาว/น้องสาว", "ป้า"], a: "พี่สาว/น้องสาว" },
       { q: "Grandfather is...", o: ["ปู่/ตา", "ย่า/ยาย"], a: "ปู่/ตา" },
       { q: "Grandmother is...", o: ["ย่า/ยาย", "ลุง"], a: "ย่า/ยาย" },
       { q: "Son means...", o: ["ลูกชาย", "ลูกสาว"], a: "ลูกชาย" },
       { q: "Daughter means...", o: ["ลูกสาว", "ลูกชาย"], a: "ลูกสาว" },
       { q: "Uncle is...", o: ["ลุง/น้า/อา(ชาย)", "ป้า"], a: "ลุง/น้า/อา(ชาย)" },
       { q: "Aunt is...", o: ["ป้า/น้า/อา(หญิง)", "ลุง"], a: "ป้า/น้า/อา(หญิง)" },
    ],
    quiz: [
       { q: "Quiz 1: 'Sister' means...", o: ["พี่สาว/น้องสาว", "พี่ชาย/น้องชาย"], a: "พี่สาว/น้องสาว" },
       { q: "Quiz 2: Father's father is...", o: ["Grandfather", "Uncle"], a: "Grandfather" },
       { q: "Quiz 3: Mother's sister is...", o: ["Aunt", "Sister"], a: "Aunt" }
    ]
  },
  {
    id: "lesson3",
    title: "บทที่ 3: อาหาร (Food)",
    color: "bg-yellow-500",
    videoUrl: "https://www.youtube.com/watch?v=kYJl7W0W9yU",
    practice: [
      { q: "What is 'apple'?", o: ["แอปเปิ้ล", "ส้ม"], a: "แอปเปิ้ล" },
      { q: "Rice means...", o: ["ข้าว", "ก๋วยเตี๋ยว"], a: "ข้าว" },
      { q: "Water is...", o: ["น้ำ", "นม"], a: "น้ำ" },
      { q: "Milk is...", o: ["นม", "น้ำผลไม้"], a: "นม" },
      { q: "Bread means...", o: ["ขนมปัง", "ข้าว"], a: "ขนมปัง" },
      { q: "Chicken is...", o: ["ไก่", "หมู"], a: "ไก่" },
      { q: "Egg is...", o: ["ไข่", "ไก่"], a: "ไข่" },
      { q: "Fish is...", o: ["ปลา", "กุ้ง"], a: "ปลา" },
      { q: "Fruit means...", o: ["ผลไม้", "ผัก"], a: "ผลไม้" },
      { q: "Delicious means...", o: ["อร่อย", "เหม็น"], a: "อร่อย" },
    ],
    quiz: [
       { q: "Quiz 1: 'I am hungry' means...", o: ["ฉันหิว", "ฉันอิ่ม"], a: "ฉันหิว" },
       { q: "Quiz 2: Do you like pizza?", o: ["Yes, I do.", "No, I am not."], a: "Yes, I do." }
    ]
  },
  {
    id: "lesson4",
    title: "บทที่ 4: การเดินทาง (Travel)",
    color: "bg-red-500",
    videoUrl: "https://www.youtube.com/watch?v=7y34_T4gJkQ",
    practice: [
      { q: "What is 'bus'?", o: ["รถบัส", "รถไฟ"], a: "รถบัส" },
      { q: "Train is...", o: ["รถไฟ", "เครื่องบิน"], a: "รถไฟ" },
      { q: "Airplane is...", o: ["เครื่องบิน", "เรือ"], a: "เครื่องบิน" },
      { q: "Taxi is...", o: ["แท็กซี่", "รถเมล์"], a: "แท็กซี่" },
      { q: "Ticket means...", o: ["ตั๋ว", "พาสปอร์ต"], a: "ตั๋ว" },
      { q: "Airport is...", o: ["สนามบิน", "สถานีรถไฟ"], a: "สนามบิน" },
      { q: "Hotel is...", o: ["โรงแรม", "บ้าน"], a: "โรงแรม" },
      { q: "Map means...", o: ["แผนที่", "เข็มทิศ"], a: "แผนที่" },
      { q: "Turn left means...", o: ["เลี้ยวซ้าย", "เลี้ยวขวา"], a: "เลี้ยวซ้าย" },
      { q: "Go straight means...", o: ["ตรงไป", "หยุด"], a: "ตรงไป" },
    ],
    quiz: [
       { q: "Quiz 1: 'Where is the...?' means...", o: ["...อยู่ที่ไหน", "...ราคาเท่าไหร่"], a: "...อยู่ที่ไหน" },
       { q: "Quiz 2: I want to go to...", o: ["ฉันอยากไป...", "ฉันมาจาก..."], a: "ฉันอยากไป..." }
    ]
  }
];