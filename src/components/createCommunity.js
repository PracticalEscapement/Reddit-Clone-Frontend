"use client"; // Required for client-side interactivity in Next.js

import "./createCommunity.css";
import { useState } from "react";

export default function CreateCommunityForm({ userId, onCommunityCreated }) {
  const [name, setName] = useState("");     // Stores community name
  const [description, setDescription] = useState("");       // Stores description
  const [imageUrl, setImageUrl] = useState("");     // Stores image URL
  const [message, setMessage] = useState("");       // Stores success/error message

  //This function handles what happens when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();        // Prevent page reload
    console.log(name);
    const token = localStorage.getItem("jwtToken"); // Retrieve token from localStorage
    console.log(token);

    const response = await fetch("http://127.0.0.1:5000/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the request
      },
      body: JSON.stringify({ name: name, 
                            description: description, 
                            imageUrl: imageUrl }),
    });

    if (response.ok) {
      const newCommunity = await response.json(); // Get the newly created community data
      console.log("New community data: ", newCommunity.community);
      setMessage("Community created successfully!");
      setName("");
      setDescription("");
      setImageUrl("");

      // Notify parent component to refresh communities
      if (onCommunityCreated) {
        onCommunityCreated(newCommunity.community);
      }
    } else {
      setMessage("Failed to create community. Please try again.");
    }
  };

  return (
    <div className="create-community-container">
      <h2 className="create-community-title">Create a New Community</h2>
      <form onSubmit={handleSubmit} className="create-community-form"> 
        <div className="form-group">
          <label className="form-label">Community Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Create Community</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}