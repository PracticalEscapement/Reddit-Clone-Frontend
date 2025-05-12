import './PostCard.css';

export default function PostCard({ title, body, imageUrl, members }) {
  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <p className="post-members">{members} members</p> {/* Add members info */}
      {imageUrl && (
        <div className="post-image-wrapper">
          <img src={imageUrl} alt="Post" className="post-image" />
        </div>
      )}
    </div>
  );
}
