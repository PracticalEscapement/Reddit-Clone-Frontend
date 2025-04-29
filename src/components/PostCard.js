import './PostCard.css';

export default function PostCard({ title, body, imageUrl }) {
  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      {imageUrl && (
        <div className="post-image-wrapper">
          <img src={imageUrl} alt="Post" className="post-image" />
        </div>
      )}
    </div>
  );
}
