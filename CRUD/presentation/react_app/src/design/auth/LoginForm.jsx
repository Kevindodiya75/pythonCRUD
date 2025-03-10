// src/design/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../../domain/auth/auth';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      // For example, store the returned token or user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Login successful!");
      // You might redirect or update app state here
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mt-5 p-5 rounded shadow bg-white">
      <h2 className="card-title text-center mb-4">Welcome Back</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id_email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="id_email" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="id_password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="id_password" 
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default LoginForm;
