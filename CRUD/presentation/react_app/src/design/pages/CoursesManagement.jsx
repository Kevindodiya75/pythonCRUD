// src/design/CoursesManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchCourses, addCourse, modifyCourse, removeCourse } from '../../domain/courses/Course';

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [updateData, setUpdateData] = useState(null); // holds the course to update
  const [modalMode, setModalMode] = useState(null); // 'add' or 'update'
  const [message, setMessage] = useState('');

  // Load courses on mount or when searching
  const loadCourses = async (query = '') => {
    try {
      const data = await fetchCourses(query);
      setCourses(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    loadCourses(searchQuery);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await addCourse(newCourseName);
      setMessage('Course added successfully.');
      loadCourses();
      setNewCourseName('');
      setModalMode(null);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await modifyCourse(updateData.id, updateData.coursename);
      setMessage('Course updated successfully.');
      loadCourses();
      setUpdateData(null);
      setModalMode(null);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await removeCourse(courseId);
        setMessage('Course deleted successfully.');
        loadCourses();
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="container mt-5 p-5 rounded shadow bg-white">
      {/* Navigation (You may want to extract this to its own component) */}
      <div className="d-flex justify-content-end mb-3">
        <a href="/students" className="btn btn-outline-primary me-2">Students</a>
        <a href="/courses" className="btn btn-outline-secondary me-2">Courses</a>
        <a href="/teacher" className="btn btn-outline-success me-2">Teachers</a>
      </div>

      {message && <div className="mb-3 alert alert-success text-center">{message}</div>}

      <div className="d-flex mb-3 justify-content-between align-items-center">
        <button
          className="btn btn-primary px-3 btn-sm"
          onClick={() => setModalMode('add')}
        >
          Add new course
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
            <th scope="col">ID</th>
            <th scope="col">Course Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.coursename}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => { setUpdateData(course); setModalMode('update'); }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Course Modal */}
      {modalMode === 'add' && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleAddCourse}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add new course</h5>
                  <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label>Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add new course</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Course Modal */}
      {modalMode === 'update' && updateData && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleUpdateCourse}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update course</h5>
                  <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label>Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateData.coursename}
                      onChange={(e) => setUpdateData({ ...updateData, coursename: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update course</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;
