// src/driven/courseApi.js

// Fetch courses (optionally with a search query)
export const getCoursesApi = async (query = '') => {
    const response = await fetch(`/api/courses/?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  };
  
  // Create a new course
  export const createCourseApi = async (courseName) => {
    const response = await fetch(`/api/courses/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coursename: courseName })
    });
    if (!response.ok) {
      throw new Error('Failed to create course');
    }
    return await response.json();
  };
  
  // Update an existing course
  export const updateCourseApi = async (courseId, courseName) => {
    const response = await fetch(`/api/courses/${courseId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coursename: courseName })
    });
    if (!response.ok) {
      throw new Error('Failed to update course');
    }
    return await response.json();
  };
  
  // Delete a course
  export const deleteCourseApi = async (courseId) => {
    const response = await fetch(`/api/courses/${courseId}/`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
    return true;
  };
  