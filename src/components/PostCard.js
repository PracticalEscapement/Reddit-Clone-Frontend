import './PostCard.css';

export default function PostCard({ title, body, imageUrl, members, isOwner, onJoin }) {
  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      {imageUrl && (
        <div className="post-image-wrapper">
          <img src={imageUrl} alt="Post" className="post-image" />
        </div>
      )}
      <p className="post-members">{members === 1 ? `${members} member` : `${members} members`}</p> {/* Add members info */}
      {!isOwner && (
        <button className="join-button" onClick={onJoin}>
          Join
        </button>
      )}
    </div>
  );
}
