import { loginApi,registerApi } from '../../data/auth/auth_api';

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  return await loginApi(email, password);
};


export const register = async (username, email, role, password1, password2) => {
  if (password1 !== password2) {
    throw new Error("Passwords do not match");
  }
  
  return await registerApi(username, email, role, password1);
};

