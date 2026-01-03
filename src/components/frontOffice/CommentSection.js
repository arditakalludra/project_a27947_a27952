// src/components/frontoffice/CommentSection.js
import React from 'react';
import CommentForm from './CommentForm';

export default function CommentSection({ postId, comments, onCommentAdded }) {
  return (
    <section>
      <h3>💬 Comments ({comments.length})</h3>

      {comments.length > 0 ? (
        <div className="mt-3">
          {comments.map(comment => (
            <div key={comment.id} className="card mb-2">
              <div className="card-body">
                <h6 className="card-subtitle mb-1 text-muted">
                  {comment.authorName}
                  <small className="ms-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </h6>
                <p className="card-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No comments yet. Be the first!</p>
      )}

      <CommentForm postId={postId} onCommentAdded={onCommentAdded} />
    </section>
  );
}