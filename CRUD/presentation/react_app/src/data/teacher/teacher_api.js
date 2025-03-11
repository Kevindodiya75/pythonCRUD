const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Get all teachers.
export const getTeachersApi = async () => {
  const response = await fetch(`${API_BASE_URL}/teachers/getall/`);
  if (!response.ok) {
    throw new Error('Failed to fetch teachers');
  }
  return await response.json();
};

// Create a new teacher.
// The payload will include the "created_by" field from localStorage.
export const createTeacherApi = async (teacherData) => {
  const userId = localStorage.getItem("user_id");
  const teacherPayload = { ...teacherData, created_by: userId };
  // Expected payload example:
  // {
  //   "name": "Alice Smith",
  //   "email": "alice.smith@example.com",
  //   "subject": "History",
  //   "created_by": "1"   // user id from localStorage
  // }
  const response = await fetch(`${API_BASE_URL}/teachers/add/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacherPayload)
  });
  if (!response.ok) {
    throw new Error('Failed to create teacher');
  }
  return await response.json();
};

// Update an existing teacher.
export const updateTeacherApi = async (teacherId, teacherData) => {
  const response = await fetch(`${API_BASE_URL}/teachers/update/${teacherId}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacherData)
  });
  if (!response.ok) {
    throw new Error('Failed to update teacher');
  }
  return await response.json();
};

// Delete a teacher.
export const deleteTeacherApi = async (teacherId) => {
  const response = await fetch(`${API_BASE_URL}/teachers/delete/${teacherId}/`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete teacher');
  }
  return true;
};
