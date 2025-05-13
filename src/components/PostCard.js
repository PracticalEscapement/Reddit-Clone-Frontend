'use client';

import { useState, useEffect } from 'react';
import './PostCard.css';

export default function PostCard({
  title,
  body,
  imageUrl,
  members,
  isOwner,
  comName,
  onSubmit
}) {
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  // grab token after mount
  useEffect(() => {
    const saved = localStorage.getItem('jwtToken');
    if (saved) setToken(saved);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!postTitle.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    if (!token) {
      setError('You must be logged in to post.');
      return;
    }

    try {
      const res = await fetch(
        'http://127.0.0.1:5000/api/Posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            com_name: comName,
            title: postTitle,
            content,
            comments: []
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Status ${res.status}`);
      }

      const { Post: newPost } = await res.json();
      setPostTitle('');
      setContent('');
      onSubmit(newPost);

    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message);
    }
  };

  return (
    <div className="post-card">
      {isOwner && (
        <form onSubmit={handleSubmit} className="create-post-form">
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Post title"
            value={postTitle}
            onChange={e => setPostTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <button type="submit">Submit Post</button>
        </form>
      )}

      {/* Display existing post content */}
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      {imageUrl && (
        <div className="post-image-wrapper">
          <img src={imageUrl} alt="Post" className="post-image" />
        </div>
      )}
      <p className="post-members">
        {members === 1 ? '1 member' : `${members} members`}
      </p>
    </div>
  );
}
