// src/pages/PostPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts, getCommentsByPostId } from '../services/api';
import LikeButton from '../components/frontOffice/LikeButton';
import CommentSection from '../components/frontOffice/CommentForm';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPostAndComments();
  }, [id]);

  const loadPostAndComments = async () => {
    setLoading(true);
    try {
      const posts = await getPosts();
      const found = posts.find(p => p.id == id);
      if (!found) {
        alert('Post not found');
        return;
      }
      setPost(found);

      const postComments = await getCommentsByPostId(Number(id));
      setComments(postComments);
    } catch (err) {
      alert('Failed to load post or comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewComment = (comment) => {
    setComments(prev => [comment, ...prev]);
  };

  if (loading) return <p className="text-center">Loading post...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article>
      <button className="btn btn-outline-secondary mb-3">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          ← Back to Blog
        </Link>
      </button>

      <header className="mb-4">
        <h1>{post.title}</h1>
        <p className="text-muted">
          By <strong>{post.author}</strong> on {date}
        </p>
      </header>

      {post.imageUrl && (
        <div className="mb-4">
          <img
            src={post.imageUrl}
            className="img-fluid rounded"
            alt={post.title}
          />
        </div>
      )}

      <div className="mb-4 fs-5">
        <p>{post.content}</p>
      </div>

      <div className="d-flex align-items-center mb-4">
        <LikeButton postId={post.id} initialLikes={post.likesCount || 0} />
        <small className="ms-3 text-muted">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </small>
      </div>

      <CommentSection postId={Number(post.id)} onCommentAdded={handleNewComment} comments={comments} />
    </article>
  );
}