import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getComments, getPosts, updateComment } from "../../services/api";

export default function CommentModeration() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'approved', 'pending'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [commentsData, postsData] = await Promise.all([
        getComments(),
        getPosts(),
      ]);
      setComments(commentsData);
      setPosts(postsData);
    } catch (err) {
      alert("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPostTitle = (postId) => {
    const post = posts.find((p) => p.id === Number(postId));
    return post ? post.title : `Post #${postId}`;
  };

  const toggleApproval = async (comment) => {
    try {
      const updated = { ...comment, isApproved: !comment.isApproved };
      await updateComment(comment.id, updated);
      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? updated : c)),
      );
    } catch (err) {
      alert("Failed to update comment");
      console.error(err);
    }
  };

  const filteredComments = comments
    .filter((c) => {
      if (filter === "approved") return c.isApproved;
      if (filter === "pending") return !c.isApproved;
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const stats = {
    total: comments.length,
    approved: comments.filter((c) => c.isApproved).length,
    pending: comments.filter((c) => !c.isApproved).length,
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#1A1A1A", fontWeight: "700" }}>
          💬 Comment Moderation
        </h2>
        <Link to="/admin" className="btn btn-outline-primary">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div
            className=" text-center shadow-sm"
            style={{
              borderTop: "4px solid #000000",
              borderRadius: "4px",
            }}
          >
            <div className="p-3">
              <h3
                className="mb-0"
                style={{ color: "#000000", fontWeight: "700" }}
              >
                {stats.total}
              </h3>
              <p className="text-muted mb-0">Total Comments</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className=" text-center shadow-sm"
            style={{
              borderTop: "4px solid #597c54",
              borderRadius: "3px",
            }}
          >
            <div className="p-3">
              <h3
                className="mb-0"
                style={{ color: "#597c54", fontWeight: "700" }}
              >
                {stats.approved}
              </h3>
              <p className="text-muted mb-0">Approved</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className=" text-center shadow-sm"
            style={{
              borderTop: "4px solid #774242",
              borderRadius: "4px",
            }}
          >
            <div className="p-3">
              <h3
                className="mb-0"
                style={{ color: "#774242", fontWeight: "700" }}
              >
                {stats.pending}
              </h3>
              <p className="text-muted mb-0">Pending</p>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-group mb-4" role="group">
        <button
          className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={`btn ${filter === "approved" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("approved")}
        >
          Approved ({stats.approved})
        </button>
        <button
          className={`btn ${filter === "pending" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({stats.pending})
        </button>
      </div>

      {filteredComments.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <h5 className="text-muted">No comments to show</h5>
            <p className="text-muted">
              {filter === "pending" && "All comments are approved!"}
              {filter === "approved" && "No approved comments yet."}
              {filter === "all" && "No comments have been posted yet."}
            </p>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="col-12 mb-3">
              <div
                className="card shadow-sm"
                style={{
                  borderLeft: `5px solid ${comment.isApproved ? "#597c54" : "#774242"}`,
                  borderRadius: "8px",
                  backgroundColor: comment.isApproved ? "white" : "#FFF8E7",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h6
                        className="mb-1 d-flex align-items-center"
                        style={{
                          color: "#000000",
                          fontWeight: "600",
                          gap: "8px",
                        }}
                      >
                        <svg
                          fill="#000000"
                          width="18px"
                          height="18px"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
                        </svg>

                        {comment.authorName}

                        {comment.isApproved ? (
                          <span
                            className="badge ms-2"
                            style={{
                              backgroundColor: "#a7bd9d",
                              color: "white",
                            }}
                          >
                            Approved
                          </span>
                        ) : (
                          <span
                            className="badge ms-2"
                            style={{
                              backgroundColor: "#e4b0b0",
                              color: "#000000",
                            }}
                          >
                            Pending
                          </span>
                        )}
                      </h6>

                      <small className="text-muted">
                        {new Date(comment.createdAt).toLocaleString("uk-UA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>

                    <button
                      onClick={() => toggleApproval(comment)}
                      className={`btn btn-sm ${comment.isApproved ? "btn-warning" : "btn-success"}`}
                      style={{
                        backgroundColor: comment.isApproved
                          ? "#5c7560"
                          : "#996363",
                        border: "none",
                        color: "white",
                        borderRadius: "6px",
                        padding: "0.4rem 1rem",
                        fontWeight: "600",
                      }}
                    >
                      {comment.isApproved ? "Reject" : "Approve"}
                    </button>
                  </div>

                  <p
                    className="mb-2"
                    style={{
                      color: "#000000",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {comment.text}
                  </p>

                  <div
                    className="mt-3 pt-3"
                    style={{
                      borderTop: "1px solid #3a3a3a",
                    }}
                  >
                    <small style={{ color: "#3f3f3f" }}>
                      On post: <strong>{getPostTitle(comment.postId)}</strong>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
