import React from "react";
import CommentForm from "./CommentForm";

export default function CommentSection({ postId, comments, onCommentAdded }) {
  return (
    <section style={{ marginTop: "3rem" }}>
      <h3
        style={{
          color: "#000000",
          fontWeight: "600",
          marginBottom: "1.5rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid #000000",
        }}
      >
        💬 Comments ({comments.length})
      </h3>

      {comments.length > 0 ? (
        <div className="mt-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className=" mb-3 shadow-sm"
              style={{
                border: "none",
                borderLeft: "4px solid #1d1d1d",
                borderRadius: "8px",
                backgroundColor: "#FFF8E7",
              }}
            >
              <div
                className="card-body"
                style={{ padding: "1.25rem", backgroundColor: "white" }}
              >
                <h6
                  className="mb-2"
                  style={{ color: "#000000", fontWeight: "600" }}
                >
                  <svg
                    fill="#000000"
                    width="18px"
                    height="18px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
                  </svg>{" "}
                  {comment.authorName}
                  <small
                    className="ms-2"
                    style={{ color: "#050505", fontWeight: "normal" }}
                  >
                    • {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </h6>
                <p
                  className="card-text mb-0"
                  style={{ color: "#020202", lineHeight: "1.6" }}
                >
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            color: "#8f8f8f",
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "#ffffff",
            borderRadius: "3px",
            fontStyle: "italic",
          }}
        >
          No comments yet. Be the first!
        </p>
      )}

      <CommentForm postId={postId} onCommentAdded={onCommentAdded} />
    </section>
  );
}
