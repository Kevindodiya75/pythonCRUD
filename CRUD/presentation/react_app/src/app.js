import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginForm from "./presentation/auth/login_form";
import RegisterForm from "./presentation/auth/register_form";
import StudentsManagement from "./presentation/pages/student/student_management";
import StudentForm from "./presentation/pages/student/add-edit_student";
import CoursesManagement from "./presentation/pages/courses/courses_management";
import CoursesForm from "./presentation/pages/courses/add-edit_courses";
import TeacherManagement from "./presentation/pages/teacher_management";
import Layout from "./presentation/componentes/layout";

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
          <Route path="/" element={<Navigate to="/login" />}></Route>
          {/* Routes that require layout with sidebar */}
          <Route
            path="/"
            element={
              <Layout>
                <Navigate to="/courses" />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Navigate to="/courses" />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <CoursesManagement />
              </Layout>
            }
          />
          <Route
            path="/add-courses"
            element={
              <Layout>
                <CoursesForm />
              </Layout>
            }
          />
          <Route
            path="/edit-courses/:id"
            element={
              <Layout>
                <CoursesForm />
              </Layout>
            }
          />

          <Route
            path="/students"
            element={
              <Layout>
                <StudentsManagement />
              </Layout>
            }
          />
          <Route
            path="/add-student"
            element={
              <Layout>
                <StudentForm></StudentForm>
              </Layout>
            }
          />
          <Route
            path="/edit-student/:id"
            element={
              <Layout>
                <StudentForm />
              </Layout>
            }
          />
          <Route
            path="/students/attendance"
            element={
              <Layout>
                <StudentsManagement />
              </Layout>
            }
          />
          <Route
            path="/teachers"
            element={
              <Layout>
                <TeacherManagement />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
