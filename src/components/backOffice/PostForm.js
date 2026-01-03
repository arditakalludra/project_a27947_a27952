// src/components/backoffice/PostForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPosts, createPost, updatePost } from '../../services/api';

export default function PostForm() {
  const { id } = useParams(); // for edit mode
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Admin',
    imageUrl: '',
    createdAt: new Date().toISOString().slice(0, 19) + 'Z', // ISO 8601
    likesCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load post if editing
  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId) => {
    try {
      const posts = await getPosts();
      const post = posts.find(p => p.id == postId);
      if (post) {
        setFormData(post);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to load post');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        // Update
        await updatePost(id, formData);
        alert('Post updated!');
      } else {
        // Create
        const newPost = { ...formData, id: Date.now() % 10000 }; // simple unique ID
        await createPost(newPost);
        alert('Post created!');
      }
      navigate('/admin');
    } catch (err) {
      setError('Failed to save post. Check image URL format and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow">
          <div className="card-header">
            <h4>{id ? '✏️ Edit Post' : '➕ New Post'}</h4>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Content *</label>
                <textarea
                  className="form-control"
                  rows="6"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://picsum.photos/600/400"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Created At</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="createdAt"
                      value={formData.createdAt.slice(0, 16)}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          createdAt: e.target.value + ':00Z',
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}