import './PostCard.css';

export default function PostCard({ title, body }) {

  // Need to add comments to posts

  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
    </div>
  );
}
