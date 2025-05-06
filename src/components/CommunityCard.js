'use client';

import './CommunityCard.css';
import Link from 'next/link';
import { useState } from 'react';

export default function CommunityCard({ name, members }) {
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.stopPropagation(); // Prevent navigation
    e.preventDefault();  // Prevent link click
    setJoined(!joined);
  };

  return (
    <Link href={`/community/${name.replace('r/', '')}`} className="card-link">
      <div className="subreddit-card">
        <div className="subreddit-info">
          <div>
            <h3>{name}</h3>
            <p>{members} members</p>
          </div>
          <button
            className={`join-button ${joined ? 'joined' : ''}`}
            onClick={handleJoin}
          >
            {joined ? 'Joined' : 'Join'}
          </button>
        </div>
      </div>
    </Link>
  );
}
