// src/domain/teacher/teacher.js
import {
  getTeachersApi,
  getTeacherByIdApi,
  createTeacherApi,
  updateTeacherApi,
  deleteTeacherApi,
} from "../../data/teacher/teacher_api";

// Retrieve teachers; you can add business-specific filtering here.
export const fetchTeachers = async (query = "") => {
  return await getTeachersApi(query);
};

// Retrieve a single teacher by ID
export const fetchTeacherById = async (teacherId) => {
  return await getTeacherByIdApi(teacherId);
};

// Add a new teacher (you can validate the teacherData here if needed).
export const addTeacher = async (teacherData) => {
  return await createTeacherApi(teacherData);
};

// Modify an existing teacher.
export const modifyTeacher = async (teacherId, teacherData) => {
  return await updateTeacherApi(teacherId, teacherData);
};

// Remove a teacher.
export const removeTeacher = async (teacherId) => {
  return await deleteTeacherApi(teacherId);
};
