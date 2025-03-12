import React, { useState, useEffect } from 'react';
import { fetchStudents, removeStudent } from '../../../domain/student/student';
import { fetchCourses } from '../../../domain/courses/course'
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loadStudents = async (query = '') => {
    try {
      const data = await fetchStudents(query);
      console.log("Loaded students:", data);
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      console.log("Loaded courses:", data);
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    loadStudents(searchQuery);
  };

  const handleEditStudent = (student) => {
    navigate(`/edit-student/${student.id}`, { state: { student } });
  };

  const handleAddNewStudent = () => {
    navigate('/add-student');
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await removeStudent(studentId);
        setMessage("Student deleted successfully.");
        loadStudents();
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.coursename : "No course";
  };

  return (
    <div className="container mt-5 p-5 rounded shadow bg-white">
      <div className="d-flex justify-content-end mb-3">
        <a href="/students" className="btn btn-outline-primary me-2">Students</a>
        <a href="/courses" className="btn btn-outline-secondary me-2">Courses</a>
        <a href="/teacher" className="btn btn-outline-success me-2">Teachers</a>
        <button className="btn btn-danger" onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}>Logout</button>
      </div>

      {message && <div className="mb-3 alert alert-info text-center">{message}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-primary px-3 btn-sm"
          onClick={handleAddNewStudent}
        >
          Add new student
        </button>
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="search"
            name="query"
            className="form-control"
            placeholder="search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-success btn-sm px-3 mx-2">
            Search
          </button>
        </form>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No student data available</td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  {typeof student.course === 'string'
                    ? student.course
                    : getCourseName(student.course)}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleEditStudent(student)}
                  >Update
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteStudent(student.id)}
                  >Delete
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;