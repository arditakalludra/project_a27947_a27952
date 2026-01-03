// src/components/frontoffice/Commentsection.js
import React, { useState } from 'react';
import { createComment } from '../../services/api';

function CommentForm({ postId, onCommentAdded }) {
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) return;

    setSubmitting(true);
    try {
      const newComment = {
        postId,
        authorName: authorName.trim(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
        isApproved: true, // or false for moderation
      };
      await createComment(newComment);
      setAuthorName('');
      setText('');
      setSuccess(true);
      onCommentAdded?.(newComment);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Failed to post comment. Try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-3 border rounded">
      <h5>Leave a comment</h5>
      {success && (
        <div className="alert alert-success">✅ Comment posted!</div>
      )}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
      >
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;