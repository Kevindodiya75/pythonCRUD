// src/domain/auth.js
import { loginApi,registerApi } from '../../driven/auth/authApi';

export const login = async (email, password) => {
  // Here you can add any business validations or transformations if needed.
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  // Call the API adapter to perform login
  return await loginApi(email, password);
};


export const register = async (username, email, role, password1, password2) => {
  // Business validation: Check that passwords match.
  if (password1 !== password2) {
    throw new Error("Passwords do not match");
  }
  // Additional validations can be added here if needed.
  
  // Call the API adapter and return the result.
  return await registerApi(username, email, role, password1);
};

