
// src/driven/teacherApi.js

// Fetch teachers; optionally filter using a search query.
export const getTeachersApi = async (query = '') => {
    const response = await fetch(`/api/teachers/?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    return await response.json();
  };
  
  // Create a new teacher.
  export const createTeacherApi = async (teacherData) => {
    const response = await fetch('/api/teachers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    if (!response.ok) {
      throw new Error('Failed to create teacher');
    }
    return await response.json();
  };
  
  // Update an existing teacher.
  export const updateTeacherApi = async (teacherId, teacherData) => {
    const response = await fetch(`/api/teachers/${teacherId}/`, {
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
    const response = await fetch(`/api/teachers/${teacherId}/`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete teacher');
    }
    return true;
  };
  