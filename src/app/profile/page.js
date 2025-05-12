'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = '/login'; // Redirect to login if not logged in
      return;
    }

    // Fetch user details from the backend
    fetch('http://127.0.0.1:5000/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        console.error('Error fetching profile:', err);
        localStorage.removeItem("jwtToken"); // Clear token if invalid
        window.location.href = '/login'; // Redirect to login
      });
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove the JWT token
    window.location.href = '/login'; // Redirect to the login page
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  }
  
