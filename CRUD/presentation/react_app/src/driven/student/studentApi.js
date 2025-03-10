
export const getStudentsApi = async (query = '') => {
    const response = await fetch(`/api/students/?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    return await response.json();
  };
  
  // Create a new student
  export const createStudentApi = async (studentData) => {
    const response = await fetch(`/api/students/`, {
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
  
  // Update an existing student
  export const updateStudentApi = async (studentId, studentData) => {
    const response = await fetch(`/api/students/${studentId}/`, {
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
  
  // Delete a student
  export const deleteStudentApi = async (studentId) => {
    const response = await fetch(`/api/students/${studentId}/`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete student');
    }
    return true;
  };
  