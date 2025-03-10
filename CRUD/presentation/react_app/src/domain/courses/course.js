import {
    getCoursesApi,
    createCourseApi,
    updateCourseApi,
    deleteCourseApi,
  } from '../../data/courses/course_api';
  
  export const fetchCourses = async () => {
    return await getCoursesApi();
  };
  
  export const addCourse = async (courseName) => {
    return await createCourseApi(courseName);
  };
  
  export const modifyCourse = async (courseId, courseName) => {
    return await updateCourseApi(courseId, courseName);
  };
  
  export const removeCourse = async (courseId) => {
    return await deleteCourseApi(courseId);
  };
  