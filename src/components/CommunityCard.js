'use client';

import './CommunityCard.css';
import Link from 'next/link';
import { useState } from 'react';

export default function CommunityCard({ name, body, imageUrl, members, isOwner, joined, onJoin }) {

  const handleJoin = (e) => {
    e.stopPropagation(); // Prevent navigation
    e.preventDefault();  // Prevent link click
    if (onJoin) {
      onJoin(name); // Trigger the parent component's join logic
    }
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
      {!joined && !isOwner && (
          <button className="join-button" onClick={onJoin}>
            Join
          </button>
        )}
    </div>
  </div>

  );
}

