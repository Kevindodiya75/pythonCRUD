import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginForm from "./presentation/auth/login_form";
import RegisterForm from "./presentation/auth/register_form";
import CoursesManagement from "./presentation/pages/courses_management";
import StudentsManagement from "./presentation/pages/student_management";
import TeacherManagement from "./presentation/pages/teacher_management";
import Layout from "./presentation/componentes/layout";

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Routes that require layout with sidebar */}
          <Route path="/" element={<Layout><Navigate to="/courses" /></Layout>} />
          <Route path="/dashboard" element={<Layout><Navigate to="/courses" /></Layout>} />
          <Route path="/courses" element={<Layout><CoursesManagement /></Layout>} />
          <Route path="/courses/new" element={<Layout><CoursesManagement /></Layout>} />
          <Route path="/courses/categories" element={<Layout><CoursesManagement /></Layout>} />
          <Route path="/students" element={<Layout><StudentsManagement /></Layout>} />
          <Route path="/students/new" element={<Layout><StudentsManagement /></Layout>} />
          <Route path="/students/attendance" element={<Layout><StudentsManagement /></Layout>} />
          <Route path="/teachers" element={<Layout><TeacherManagement /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;