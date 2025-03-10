const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const getCoursesApi = async () => {
  const userId = localStorage.getItem("user_id");
  const url = `${API_BASE_URL}/courses/${userId}/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  const data = await response.json();
  console.log(data)
 
  // if (data && data.courses && Array.isArray(data.courses)) {
  //   return data.courses;
  // } else if (Array.isArray(data)) {
    return data;
  // } else {
  //   return []; 
  // }
};

export const createCourseApi = async (courseName) => {
  const response = await fetch(`${API_BASE_URL}/courses/add/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coursename: courseName })
  });
  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  return await response.json();
};

export const updateCourseApi = async (courseId, courseName) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coursename: courseName })
  });
  if (!response.ok) {
    throw new Error('Failed to update course');
  }
  return await response.json();
};

export const deleteCourseApi = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
  return true;
};
