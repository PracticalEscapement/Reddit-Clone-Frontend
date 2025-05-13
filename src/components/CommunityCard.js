'use client';

import './CommunityCard.css';
import Link from 'next/link';
import { useState } from 'react';

export default function CommunityCard({ name, body, imageUrl, members, isOwner, onJoin }) {
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.stopPropagation(); // Prevent navigation
    e.preventDefault();  // Prevent link click
    if (onJoin) {
      onJoin(name); // Trigger the parent component's join logic
    }
    setJoined(!joined); // Toggle the local joined state
  };

  return (
    <div className="subreddit-card">
    <Link href={`/community/${name.replace('r/', '')}`} className="card-link">
      <div className="subreddit-info">
        <h2 className="community-title">{name}</h2>
        {body && <p className="community-description">{body}</p>}
      </div>

      {imageUrl && (
        <div className="community-image-wrapper">
          <img
            src={imageUrl}
            alt={`${name} logo`}
            className="community-image"
          />
        </div>
      )}

      {isOwner && <p className="owner-badge">You are the owner</p>}
    </Link>

    <div className="card-actions">
      <p className="post-members">{members === 1 ? `${members} member` : `${members} members`}</p> {/* Add members info */}
      <button
        className={`join-button ${joined ? 'joined' : ''}`}
        onClick={handleJoin}
      >
        {joined ? 'Joined' : 'Join'}
      </button>
    </div>
  </div>

  );
}



// <div className="post-card">
// <h2 className="post-title">{title}</h2>
// <p className="post-body">{body}</p>
// {imageUrl && (
//   <div className="post-image-wrapper">
//     <img src={imageUrl} alt="Post" className="post-image" />
//   </div>
// )}
// <p className="post-members">{members === 1 ? `${members} member` : `${members} members`}</p> {/* Add members info */}
// {!isOwner && (
//   <button className="join-button" onClick={onJoin}>
//     Join
//   </button>
// )}
// </div>