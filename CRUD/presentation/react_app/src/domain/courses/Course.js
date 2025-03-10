// src/domain/course.js
import {
    getCoursesApi,
    createCourseApi,
    updateCourseApi,
    deleteCourseApi,
  } from '../../driven/courses/CourseApi';
  
  export const fetchCourses = async (query = '') => {
    // You could add additional filtering or processing here if needed.
    return await getCoursesApi(query);
  };
  
  export const addCourse = async (courseName) => {
    // Here you could validate the course name if needed.
    return await createCourseApi(courseName);
  };
  
  export const modifyCourse = async (courseId, courseName) => {
    return await updateCourseApi(courseId, courseName);
  };
  
  export const removeCourse = async (courseId) => {
    return await deleteCourseApi(courseId);
  };
  