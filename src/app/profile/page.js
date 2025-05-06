'use client';

import { useEffect, useState } from 'react';
<<<<<<< HEAD

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
  
=======
import './profile.css';

export default function ProfilePage() {
  const [user, setUser] = useState({
    id: 1,
    username: 'oscar2 dejesus2',
    email: 'oscar2@gmail.com',
    comments: [],
    posts: [],
    communities: [],
    notifications: [],
    sent_messages: [],
    recieved_messages: [],
  });

  // useEffect(() => {
  //   // Replace this with fetch('/api/user') if using real backend
  //   const fetchUser = async () => {
  //     const response = await fetch('/api/user'); // OR simulate locally
  //     const data = await response.json();
  //     setUser(data[0]); // Assume first user for now
  //   };

  //   fetchUser();
  // }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{user.username}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Posts:</strong> {user.posts.length}</p>
        <p><strong>Communities:</strong> {user.communities.length}</p>
        <p><strong>Comments:</strong> {user.comments.length}</p>
        <p><strong>Sent Messages:</strong> {user.sent_messages.length}</p>
        <p><strong>Received Messages:</strong> {user.recieved_messages.length}</p>
        <p><strong>Notifications:</strong> {user.notifications.length}</p>
      </div>
    </div>
  );
}
>>>>>>> 4da5991 (Add User profile card)
