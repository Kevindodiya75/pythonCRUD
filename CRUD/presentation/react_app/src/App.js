// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./presentation/auth/login_form";
import RegisterForm from "./presentation/auth/register_form";
import CoursesManagement from "./presentation/pages/courses_management";
import StudentsManagement from "./presentation/pages/student_management";
import TeacherManagement from "./presentation/pages/teacher_management";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/courses" element={<CoursesManagement />} />
        <Route path="/students" element={<StudentsManagement />} />
        <Route path="/teacher" element={<TeacherManagement />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
