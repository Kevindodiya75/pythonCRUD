// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./design/auth/LoginForm";
import RegisterForm from "./design/auth/RegisterForm";
import CoursesManagement from "./design/pages/CoursesManagement";
import StudentsManagement from "./design/pages/StudentManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/courses" element={<CoursesManagement />} />
        <Route path="/students" element={<StudentsManagement />} />
        {/* Redirect root to login or define a Home component */}
        <Route path="/" element={<Navigate to="/students" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
