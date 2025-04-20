import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:7080/tasks/signup', {...formData})
      .then((res) => {
        console.log('Data saved', res);
        alert(res.data.message);
        navigate('/login');
      })
      .catch((err) => {
        console.log('Error saving data', err);
        alert(err.response.data.message);
      });
    console.log('Form Data Submitted: ', formData);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff', 
    padding: '20px',
    width: '100vw',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px', 
    maxWidth: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    marginTop: '10px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const secondaryButtonHoverStyle = {
    backgroundColor: '#545b62',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Create Account</h2>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Sign Up
        </button>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/login')}
            style={secondaryButtonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, secondaryButtonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, secondaryButtonStyle)}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;