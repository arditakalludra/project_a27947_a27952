// src/pages/BackofficePage.js
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getPosts, deletePost } from '../services/api';
import { Link } from 'react-router-dom';

export default function BackofficePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      alert('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  // If on `/admin`, show dashboard
  if (location.pathname === '/admin') {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📝 Admin Dashboard</h2>
          <Link to="/admin/new" className="btn btn-success">+ New Post</Link>
        </div>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. <Link to="/admin/new">Create one</Link>.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Likes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>{post.likesCount || 0}</td>
                    <td>
                      <Link to={`/admin/edit/${post.id}`} className="btn btn-sm btn-outline-primary me-1">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-5">
          <h4>🛠️ Utilities</h4>
          <Link to="/admin/comments" className="btn btn-outline-secondary">
            Moderate Comments
          </Link>
        </div>
      </div>
    );
  }

  // Otherwise, render child routes (e.g., /admin/new, /admin/edit/:id)
  return <Outlet />;
}


// At the bottom of src/pages/BackofficePage.js
import { Routes, Route } from 'react-router-dom';
import PostForm from '../components/backOffice/PostForm';

// Replace the final `return <Outlet />` with:
return (
  <Routes>
    <Route index element={<BackofficePage />} /> {/* Dashboard */}
    <Route path="new" element={<PostForm />} />
    <Route path="edit/:id" element={<PostForm />} />
    {/* Add later: <Route path="comments" element={<CommentModeration />} /> */}
  </Routes>
);