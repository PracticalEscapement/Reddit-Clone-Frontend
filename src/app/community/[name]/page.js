'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostCard from '../../../components/PostCard';
import CreatePostForm from '@/components/CreatePostForm/CreatePostForm';

export default function CommunityPage() {
  const { name } = useParams();            // ← gets the dynamic [name] from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;                    // wait until we have the route param

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/Posts/${encodeURIComponent(name)}`, 
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [name]);

  if (!name) {
    return <p>Loading community…</p>;
  }
  if (loading) {
    return <p>Loading posts for r/{name}…</p>;
  }
  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>r/{decodeURI(name)}</h1>

      {/* show form for creating a post */}
      <CreatePostForm
        comName={decodeURIComponent(name)}            // pass the raw community name
        onSubmit={newPost => setPosts([newPost, ...posts])}
      />

      {/* list of fetched posts or a placeholder */}
      {posts.length > 0
        ? posts.map((post, idx) => <PostCard key={idx} {...post} />)
        : <p>No posts yet—be the first to post!</p>
      }
    </div>
  );
}
