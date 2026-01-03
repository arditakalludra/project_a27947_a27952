// src/components/frontoffice/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css'; // optional CSS

function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="card mb-4 h-100 shadow-sm">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          className="card-img-top"
          alt={post.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <small className="text-muted mb-1">{post.author} • {date}</small>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text flex-grow-1">
          {post.content.length > 100
            ? post.content.substring(0, 100) + '…'
            : post.content}
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span>❤️ {post.likesCount || 0}</span>
          <Link to={`/posts/${post.id}`} className="btn btn-sm btn-outline-primary">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;