import { notFound } from 'next/navigation';
import PostCard from '../../../components/PostCard'; // reuse your component

// Dummy data: map community names to posts
const communityData = {
  programming: [
    { title: 'Best programming languages in 2025', body: 'Let’s discuss...', imageUrl: '' },
    { title: 'Functional vs OOP', body: 'What do you prefer?', imageUrl: '' },
  ],
  javascript: [
    { title: 'JS tricks for devs', body: 'Here are a few...', imageUrl: 'https://via.placeholder.com/600x300' },
  ],
  webdev: [
    { title: 'CSS Grid vs Flexbox', body: 'Which one do you use?', imageUrl: '' },
  ],
};

export default function CommunityPage({ params }) {
  const { name } = params;
  const posts = communityData[name];

  if (!posts) return notFound();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Welcome to r/{name}</h1>
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
}
