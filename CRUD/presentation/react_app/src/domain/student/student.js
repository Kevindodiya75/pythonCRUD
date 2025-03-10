import {
    getStudentsApi,
    createStudentApi,
    updateStudentApi,
    deleteStudentApi
  } from '../../driven/student/studentApi';
  
 
  export const fetchStudents = async (query = '') => {
    return await getStudentsApi(query);
  };
  
  export const addStudent = async (studentData) => {
    return await createStudentApi(studentData);
  };
  
  export const modifyStudent = async (studentId, studentData) => {
    return await updateStudentApi(studentId, studentData);
  };
  
  export const removeStudent = async (studentId) => {
    return await deleteStudentApi(studentId);
  };
  