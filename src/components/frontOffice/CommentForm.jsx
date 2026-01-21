import React, { useState } from "react";
import { createComment } from "../../services/api";

function CommentForm({ postId, onCommentAdded }) {
  const [authorName, setAuthorName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) return;

    setSubmitting(true);
    try {
      const newComment = {
        postId: Number(postId),
        authorName: authorName.trim(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
        isApproved: true,
      };
      await createComment(newComment);
      setAuthorName("");
      setText("");
      setSuccess(true);
      onCommentAdded?.(newComment);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to post comment. Try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 shadow-sm"
      style={{
        border: "none",
        backgroundColor: "white",
        borderTop: "2px solid #000000",
      }}
    >
      <h5
        style={{ color: "#1A1A1A", fontWeight: "600", marginBottom: "1.5rem" }}
      >
        Leave a comment
      </h5>
      {success && (
        <div
          className="alert alert-success"
          style={{
            backgroundColor: "#E0E0E0",
            color: "#1A1A1A",
            border: "none",
          }}
        >
          Comment posted!
        </div>
      )}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          style={{
            border: "2px solid #CCCCCC",
            borderRadius: "3px",
            padding: "0.75rem",
          }}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          style={{
            border: "2px solid #CCCCCC",
            borderRadius: "3px",
            padding: "0.75rem",
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          fontWeight: "600",
          borderRadius: "3px",
        }}
      >
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
