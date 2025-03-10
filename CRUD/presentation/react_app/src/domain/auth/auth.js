import { loginApi,registerApi } from '../../driven/auth/authApi';

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

