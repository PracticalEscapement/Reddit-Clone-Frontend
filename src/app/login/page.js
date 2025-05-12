'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize the router

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server you're sending JSON
        },
        body: JSON.stringify(formData), // Convert JS object to JSON
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token); // Store the JWT token
        console.log('Login successful:', data);
        router.push('/'); // Redirect to the home page
      } else {
        const errorData = await response.json(); // Parse the error response
        console.error('Login failed:', errorData);
        setError(errorData.error || 'Invalid email or password'); // Display backend error or fallback message
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
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
        <button type="submit">Login</button>

      <div>
        <p>
          Don&apos;t have an account?{" "}
          <a href="/register" style={{ color: "blue", textDecoration: "underline" }}>
            Register here
          </a>
        </p>
      </div>

      </form> 
    </div>
  );
}
