// src/domain/student.js
import {
    getStudentsApi,
    createStudentApi,
    updateStudentApi,
    deleteStudentApi
  } from '../../driven/student/studentApi';
  
  // Retrieve students, optionally filtered by query
  export const fetchStudents = async (query = '') => {
    // You can add additional business logic here if needed.
    return await getStudentsApi(query);
  };
  
  // Add a new student after performing any validations
  export const addStudent = async (studentData) => {
    // You might add validations here before sending the data.
    return await createStudentApi(studentData);
  };
  
  // Update a student's information
  export const modifyStudent = async (studentId, studentData) => {
    return await updateStudentApi(studentId, studentData);
  };
  
  // Remove a student
  export const removeStudent = async (studentId) => {
    return await deleteStudentApi(studentId);
  };
  