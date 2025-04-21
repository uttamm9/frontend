import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-eplc.onrender.com/tasks/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      alert(res.data.message);
      navigate('/createTask');
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#e0f7fa', // A light cyan background
    padding: '20px',
    width: '100vw',
  };

  const formContainerStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    width: "90%",
    maxWidth: "360px",
    textAlign: "center",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    color: "#263238", // Dark grayish blue
    marginBottom: "25px",
    fontWeight: "500",
    fontSize: "2.2rem",
  };

  const formGroupStyle = {
    marginBottom: "20px",
    textAlign: "left",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#37474f", // Dark blue gray
    display: "block",
    marginBottom: "8px",
    fontSize: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #b0bec5", // Light blue gray
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const inputFocusStyle = {
    borderColor: "#0277bd", // A more vibrant blue on focus
    outline: "none",
    boxShadow: "0 0 5px rgba(2, 119, 189, 0.5)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    background: "#0277bd", // Vibrant blue
    color: "white",
    marginTop: "25px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    background: "#01579b", // Darker blue on hover
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => (e.target.style.borderColor = "#b0bec5")}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => (e.target.style.borderColor = "#b0bec5")}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;