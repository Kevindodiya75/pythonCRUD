import React, { useState, useEffect } from 'react';
import { fetchTeachers, addTeacher, modifyTeacher, removeTeacher } from '../../domain/teacher/teacher';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [updateTeacherData, setUpdateTeacherData] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [message, setMessage] = useState('');

  const loadTeachers = async () => {
    try {
      const result = await fetchTeachers();
      setTeachers(result.teachers || result);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setMessage("Error loading teachers.");
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await loadTeachers();
  };


  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await addTeacher(newTeacher);
      setMessage("Teacher added successfully.");
      setNewTeacher({ name: '', email: '', subject: '' });
      setModalMode(null);
      loadTeachers(); 
    } catch (error) {
      console.error("Error adding teacher:", error);
      setMessage("Error adding teacher.");
    }
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      await modifyTeacher(updateTeacherData.id, updateTeacherData);
      setMessage("Teacher updated successfully.");
      setUpdateTeacherData(null);
      setModalMode(null);
      loadTeachers(); 
    } catch (error) {
      console.error("Error updating teacher:", error);
      setMessage("Error updating teacher.");
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await removeTeacher(teacherId);
        setMessage("Teacher deleted successfully.");
        loadTeachers();
      } catch (error) {
        console.error("Error deleting teacher:", error);
        setMessage("Error deleting teacher.");
      }
    }
  };

  return (
    <div className="container mt-5 p-5 rounded shadow bg-white">
      <div className="d-flex justify-content-end mb-3">
        <a href="/students" className="btn btn-outline-primary me-2">Students</a>
        <a href="/courses" className="btn btn-outline-secondary me-2">Courses</a>
        <a href="/teacher" className="btn btn-outline-success">Teachers</a>
      </div>

      {message && <div className="alert alert-success text-center mb-3">{message}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={() => setModalMode('add')}>
          Add New Teacher
        </button>
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="search"
            name="query"
            className="form-control"
            placeholder="Search teacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-success ms-2">Search</button>
        </form>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.subject}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => { setUpdateTeacherData(teacher); setModalMode('update'); }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteTeacher(teacher.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalMode === 'add' && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleAddTeacher}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Teacher</h5>
                  <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Teacher</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalMode === 'update' && updateTeacherData && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleUpdateTeacher}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Teacher</h5>
                  <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateTeacherData.name}
                      onChange={(e) => setUpdateTeacherData({ ...updateTeacherData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={updateTeacherData.email}
                      onChange={(e) => setUpdateTeacherData({ ...updateTeacherData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateTeacherData.subject}
                      onChange={(e) => setUpdateTeacherData({ ...updateTeacherData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update Teacher</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
