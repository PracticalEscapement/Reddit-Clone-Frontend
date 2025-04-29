import './CommunityCard.css';

export default function CommunityCard({ name, members }) {
  return (
    <div className="subreddit-card">
      <h3>{name}</h3>
      <p>{members} members</p>
    </div>
  );
}