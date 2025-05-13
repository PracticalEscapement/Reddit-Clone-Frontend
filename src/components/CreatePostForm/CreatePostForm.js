'use client';

import { useState } from 'react';
import './style.css';

export default function CreatePostForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      alert('Title and Body are required.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }

    // Clear form after submit
    setFormData({ title: '', body: '', imageUrl: '' });
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="What's on your mind?"
        value={formData.body}
        onChange={handleChange}
        required
      ></textarea>
      {/* <input
        type="text"
        name="imageUrl"
        placeholder="Image URL (optional)"
        value={formData.imageUrl}
        onChange={handleChange}
      /> */}
      <button type="submit">Post</button>
    </form>
  );
}
