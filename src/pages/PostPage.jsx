import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPosts, getCommentsByPostId } from "../services/api";
import LikeButton from "../components/frontOffice/LikeButton";
import CommentSection from "../components/frontOffice/CommentSection";

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
      const found = posts.find((p) => p.id == id);
      if (!found) {
        alert("Post not found");
        return;
      }
      setPost(found);

      const postComments = await getCommentsByPostId(Number(id));
      setComments(postComments);
    } catch (err) {
      alert("Failed to load post or comments");
    } finally {
      setLoading(false);
    }
  };

  const handleNewComment = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleLikesUpdate = (newLikesCount) => {
    setPost((prev) => (prev ? { ...prev, likesCount: newLikesCount } : null));
  };

  if (loading) return <p className="text-center">Loading post...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  const date = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article>
      <Link
        to="/"
        className="btn mb-3"
        style={{
          backgroundColor: "#000000",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          fontWeight: "500",
          textDecoration: "none",
          display: "inline-block",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2b2a2a")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#000000")}
      >
        ← Back to Blog
      </Link>

      <div className="  mb-4 post-card-page">
        {post.imageUrl && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={post.imageUrl}
              className="img-fluid w-100"
              alt={post.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        )}
        <div className="card-body" style={{ padding: "2.5rem" }}>
          <header className="mb-4">
            <h1
              style={{
                color: "#000000",
                fontWeight: "700",
                marginBottom: "1rem",
                fontSize: "2.5rem",
              }}
            >
              {post.title}
            </h1>
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>
              By <strong style={{ color: "#000000" }}>{post.author}</strong> •{" "}
              {date}
            </p>
          </header>

          <div
            className="mb-4"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#1A1A1A",
            }}
          >
            <p>{post.content}</p>
          </div>

          <div
            className="d-flex align-items-center mb-4 pt-3"
            style={{
              borderTop: "3px solid #000000",
              paddingTop: "1.5rem",
            }}
          >
            <LikeButton
              postId={post.id}
              initialLikes={post.likesCount || 0}
              onLikesChange={handleLikesUpdate}
            />
            <small
              className="mt-3"
              style={{ color: "#000000", fontSize: "1rem" }}
            ></small>
          </div>
        </div>
      </div>

      <CommentSection
        postId={Number(post.id)}
        onCommentAdded={handleNewComment}
        comments={comments}
      />
    </article>
  );
}
