const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const getStudentsApi = async (query = '') => {
  const userId = localStorage.getItem("user_id");
  const url = `${API_BASE_URL}/students/getall/?query=${encodeURIComponent(query)}&user_id=${userId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  const data = await response.json();
  if (data && data.students && Array.isArray(data.students)) {
    return data.students;
  } else if (Array.isArray(data)) {
    return data;
  } else {
    return [];
  }
};

export const createStudentApi = async (studentData) => {
  const response = await fetch(`${API_BASE_URL}/students/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  });
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  return await response.json();
};

export const updateStudentApi = async (studentId, studentData) => {
  const response = await fetch(`${API_BASE_URL}/students/update/${studentId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return await response.json();
};

export const deleteStudentApi = async (studentId) => {
  const response = await fetch(`${API_BASE_URL}/students/delete/${studentId}/`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
  return true;
};
