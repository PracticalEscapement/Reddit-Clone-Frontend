'use client';

//import './CommunityCard.css';
import Link from 'next/link';
import { useState } from 'react';

export default function CommunityCard({ title, body, imageUrl, members, onJoin }) {
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.stopPropagation(); // Prevent navigation
    e.preventDefault();  // Prevent link click
    setJoined(!joined);
  };

  return (
    <Link href={`/community/${title.replace('r/', '')}`} className="card-link">
      <div className="post-card">
        <h2 className="post-title">{title}</h2>
        <p className="post-body">{body}</p>
        {imageUrl && (
          <div className="post-image-wrapper">
            <img src={imageUrl} alt="Post" className="post-image" />
          </div>
        )}
        <p className="post-members">{members === 1 ? `${members} member` : `${members} members`}</p> {/* Add members info */}
        <button className="join-button" onClick={onJoin}>Join</button>
      </div>
    </Link>
  );
}
