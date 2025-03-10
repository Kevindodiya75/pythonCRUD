// src/design/StudentManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchStudents,
  addStudent,
  modifyStudent,
  removeStudent
} from '../../domain/student/student';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [updateData, setUpdateData] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'add' or 'update'
  const [message, setMessage] = useState('');

  // Load students from backend
  const loadStudents = async (query = '') => {
    try {
      const data = await fetchStudents(query);
      setStudents(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    loadStudents(searchQuery);
  };

  // Handle adding a student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      setMessage("Student added successfully.");
      loadStudents();
      setFormData({ name: '', email: '', course: '' });
      setModalMode(null);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Handle updating a student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await modifyStudent(updateData.id, updateData);
      setMessage("Student updated successfully.");
      loadStudents();
      setUpdateData(null);
      setModalMode(null);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Handle student deletion
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

  return (
    <div className="container mt-5 p-5 rounded shadow bg-white">
      {/* Navigation and Logout */}
      <div className="d-flex justify-content-end mb-3">
        <a href="/index" className="btn btn-outline-primary me-2">Students</a>
        <a href="/courses" className="btn btn-outline-secondary me-2">Courses</a>
        <a href="/teacher" className="btn btn-outline-success me-2">Teachers</a>
        <button className="btn btn-danger" onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}>Logout</button>
      </div>

      {message && <div className="mb-3 alert alert-info text-center">{message}</div>}

      {/* Search Bar and Add Button */}
      <div className="d-flex mb-3 justify-content-between align-items-center">
        <button
          className="btn btn-primary px-3 btn-sm"
          onClick={() => setModalMode('add')}
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

      {/* Students Table */}
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
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course ? student.course.coursename : "No course"}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => { setModalMode('update'); setUpdateData(student); }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Student Modal */}
      {modalMode === 'add' && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleAddStudent}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add new student</h5>
                  <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label>Student Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label>Student Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label>Select Course</label>
                    <select
                      name="course"
                      className="form-control"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    >
                      <option value="">Select a course</option>
                      {/* Map over courses (if loaded) to display options */}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add new student</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Student Modal */}
      {modalMode === 'update' && updateData && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleUpdateStudent}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update student</h5>
                  <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
                </div>
                <div className="modal-body">
                  <input type="hidden" name="id" value={updateData.id} />
                  <div>
                    <label>Student Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={updateData.name}
                      onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label>Student Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={updateData.email}
                      onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label>Select Course</label>
                    <select
                      name="course"
                      className="form-control"
                      value={updateData.course ? updateData.course.id : ""}
                      onChange={(e) => setUpdateData({ ...updateData, course: { id: e.target.value } })}
                    >
                      <option value="">Select a course</option>
                      {/* Map over courses to render options */}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update student</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentManagement;
