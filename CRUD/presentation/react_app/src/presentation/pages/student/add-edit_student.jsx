import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { addStudent, modifyStudent } from '../../../domain/student/student';
import { fetchCourses } from '../../../domain/courses/course';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = !!id;

    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(Array.isArray(data) ? data : []);
            } catch (error) {
                setMessage(error.message);
            }
        };

        // If we're in edit mode and have student data from location state, use it
        if (isEditMode && location.state && location.state.student) {
            const studentData = location.state.student;
            setFormData({
                name: studentData.name || '',
                email: studentData.email || '',
                course: studentData.course || ''
            });
        }

        loadCourses();
    }, [id, isEditMode, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                course: Number(formData.course),
                created_by: 1 // This should ideally come from user context/auth
            };

            if (isEditMode) {
                await modifyStudent(id, payload);
                setMessage("Student updated successfully.");
            } else {
                await addStudent(payload);
                setMessage("Student added successfully.");
            }

            // Redirect back to students list after short delay
            setTimeout(() => {
                navigate('/students');
            }, 1500);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCancel = () => {
        navigate('/students');
    };

    return (
        <div className="container mt-5 p-5 rounded shadow bg-white">
            <h2 className="mb-4">{isEditMode ? 'Update Student' : 'Add New Student'}</h2>

            {message && <div className="mb-3 alert alert-info text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Student Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Student Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="course" className="form-label">Select Course</label>
                    <select
                        id="course"
                        name="course"
                        className="form-control"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.coursename}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isEditMode ? 'Update Student' : 'Add Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;