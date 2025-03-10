import React, { useState } from 'react';
import { register } from '../../domain/auth/auth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      await register(username, email, role, password1, password2);
      setMessage("Registration successfully.");
      navigate("/login");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mt-5 p-5 rounded shadow bg-white">
      <h2 className="card-title text-center mb-4">Create an Account</h2>
      {message && (
        <div className="mb-3 alert alert-info text-center">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id_username" className="form-label">Username</label>
          <input 
            type="text" 
            name="username" 
            className="form-control" 
            id="id_username" 
            placeholder="Enter username" 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="id_email" className="form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            id="id_email" 
            placeholder="Enter email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="id_role" className="form-label">Role</label>
          <select 
            name="role" 
            className="form-control" 
            id="id_role" 
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="id_password1" className="form-label">Password</label>
          <input 
            type="password" 
            name="password1" 
            className="form-control" 
            id="id_password1" 
            placeholder="Enter password" 
            required
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="id_password2" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            name="password2" 
            className="form-control" 
            id="id_password2" 
            placeholder="Confirm password" 
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default RegisterForm;
