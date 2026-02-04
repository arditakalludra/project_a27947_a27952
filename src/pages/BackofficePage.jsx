import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { getPosts, deletePost } from "../services/api";
import PostForm from "../components/backOffice/PostForm";
import CommentModeration from "../components/backOffice/CommentModeration";

function AdminDashboard() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      alert("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#000000", fontWeight: "700" }}>Admin Dashboard</h2>
        <Link
          to="/admin/new"
          className="btn btn-success"
          style={{
            backgroundColor: "#000000",
            border: "none",
            borderRadius: "4px",
            padding: "0.6rem 1.5rem",
            fontWeight: "600",
          }}
        >
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <h5 className="text-muted">No posts yet.</h5>
            <Link to="/admin/new" className="btn btn-primary mt-3">
              Create your first post
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="admin-table-view">
            <div
              className="shadow-sm"
              style={{ borderRadius: "5px", overflow: "hidden" }}
            >
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead
                    style={{
                      background: "#000000",
                      color: "white",
                    }}
                  >
                    <tr>
                      <th style={{ border: "none", padding: "1rem" }}>ID</th>
                      <th style={{ border: "none", padding: "1rem" }}>Title</th>
                      <th style={{ border: "none", padding: "1rem" }}>
                        Author
                      </th>
                      <th style={{ border: "none", padding: "1rem" }}>Date</th>
                      <th style={{ border: "none", padding: "1rem" }}>Likes</th>
                      <th style={{ border: "none", padding: "1rem" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td
                          style={{ padding: "1rem", verticalAlign: "middle" }}
                        >
                          {post.id}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            verticalAlign: "middle",
                            fontWeight: "600",
                            color: "#000000",
                          }}
                        >
                          {post.title}
                        </td>
                        <td
                          style={{ padding: "1rem", verticalAlign: "middle" }}
                        >
                          {post.author}
                        </td>
                        <td
                          style={{ padding: "1rem", verticalAlign: "middle" }}
                        >
                          {new Date(post.createdAt).toLocaleDateString("uk-UA")}
                        </td>
                        <td
                          style={{ padding: "1rem", verticalAlign: "middle" }}
                        >
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "transparent",
                              color: "#1A1A1A",
                              padding: "0.4rem 0.8rem",
                              fontSize: "1rem",
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#383838"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="me-1"
                              aria-hidden="true"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>{" "}
                            {post.likesCount || 0}
                          </span>
                        </td>
                        <td
                          style={{ padding: "1rem", verticalAlign: "middle" }}
                        >
                          <Link
                            to={`/admin/edit/${post.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                            style={{ borderRadius: "6px" }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#383838",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="admin-card-view">
            {posts.map((post) => (
              <div key={post.id} className="card shadow-sm mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h5
                        className="mb-1"
                        style={{
                          color: "#000000",
                          fontWeight: "600",
                          fontSize: "1.1rem",
                        }}
                      >
                        {post.title}
                      </h5>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <span className="me-3">ID: {post.id}</span>
                        <span>by {post.author}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-between align-items-center mb-3 pb-3"
                    style={{ borderBottom: "1px solid #E0E0E0" }}
                  >
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {new Date(post.createdAt).toLocaleDateString("uk-UA")}
                    </div>
                    <div>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "transparent",
                          color: "#1A1A1A",
                          padding: "0.3rem 0.6rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#383838"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="me-1"
                          aria-hidden="true"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {post.likesCount || 0}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Link
                      to={`/admin/edit/${post.id}`}
                      className="btn btn-outline-primary flex-grow-1"
                      style={{ borderRadius: "6px" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="btn flex-grow-1"
                      style={{
                        backgroundColor: "#383838",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-5">
        <h4
          style={{ color: "#1A1A1A", fontWeight: "600", marginBottom: "1rem" }}
        >
          Utilities
        </h4>
        <Link
          to="/admin/comments"
          className="btn btn-outline-primary"
          style={{
            borderRadius: "3px",
            padding: "0.6rem 1.5rem",
            fontWeight: "600",
          }}
        >
          💬 Moderate Comments
        </Link>
      </div>
    </div>
  );
}

export default function BackofficePage() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="new" element={<PostForm />} />
      <Route path="edit/:id" element={<PostForm />} />
      <Route path="comments" element={<CommentModeration />} />
    </Routes>
  );
}
