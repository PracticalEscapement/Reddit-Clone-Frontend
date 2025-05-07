'use client';

import { useState } from 'react';
import './register.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registering user:', formData);
    // TODO: Send to backend
    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server you're sending JSON
        },
        body: JSON.stringify({
          f_name: formData.firstName,
          l_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        }), // Convert JS object to JSON
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token); // Store the JWT token
        console.log('Registration successful', data);
        alert(data.message);   // Notify the user of successful registration

        // Automatically log the user in after registration
        const loginResponse = await fetch('http://127.0.0.1:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          console.log('Login successful:', loginData);
          router.push('/'); // Redirect to the home page 
        } else {
          console.error('Login failed after registration');
          alert('Registration successful, but login failed. Please log in manually.');
        }
      } else {
        const errorData = await response.json();
        console.error(errorData.error)
        alert(errorData.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error registering:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
