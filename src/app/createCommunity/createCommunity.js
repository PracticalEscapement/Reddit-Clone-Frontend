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

    const response = await fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, imageUrl, userId }),
    });

    if (response.ok) {
      setMessage("Community created successfully!");
      setName("");
      setDescription("");
      setImageUrl("");

      // Notify parent component to refresh communities
      if (onCommunityCreated) {
        onCommunityCreated();
      }
    } else {
      setMessage("Failed to create community. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create a New Community</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Community Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create Community</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}