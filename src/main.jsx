import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css'; // Import Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ระบบทั้งหมดจะอยู่ในส่วนของ authProvider ห้ามลบ แก้ไข หรือทำไฟล์เสียหาย */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)