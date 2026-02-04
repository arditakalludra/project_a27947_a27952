import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts, createPost, updatePost } from "../../services/api";

export default function PostForm() {
  const { id } = useParams(); // for edit mode
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Admin",
    imageUrl: "",
    createdAt: new Date().toISOString().slice(0, 19) + "Z",
    likesCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (post_id) => {
    try {
      const posts = await getPosts();
      const post = posts.find((p) => p.id == post_id);
      if (post) {
        setFormData(post);
      } else {
        setError("Post not found");
      }
    } catch (err) {
      setError("Failed to load post");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (id) {
        await updatePost(id, formData);
        alert("Post updated!");
      } else {
        // Create
        const newPost = { ...formData, id };
        await createPost(newPost);
        alert("Post created!");
      }
      navigate("/admin");
    } catch (err) {
      setError("Failed to save post. Check image URL format and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div
          className=" shadow-lg"
          style={{
            border: "none",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            className="card-header"
            style={{
              background: "black",
              color: "white",
              padding: "1.5rem",
              border: "none",
            }}
          >
            <h4 className="mb-0" style={{ fontWeight: "600" }}>
              {id ? "Edit Post" : "New Post"}
            </h4>
          </div>
          <div className="card-body" style={{ padding: "2rem" }}>
            {error && (
              <div
                className="alert alert-danger"
                style={{
                  borderRadius: "8px",
                  borderLeft: "4px solid #dc3545",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#1A1A1A",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                    borderColor: "#CCCCCC",
                    borderWidth: "2px",
                    borderRadius: "4px",
                    padding: "0.75rem",
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#1A1A1A",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Content *
                </label>
                <textarea
                  className="form-control"
                  rows="8"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  style={{
                    borderColor: "#CCCCCC",
                    borderWidth: "2px",
                    borderRadius: "4px",
                    padding: "0.75rem",
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#1A1A1A",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Image URL
                </label>
                <input
                  type="url"
                  className="form-control"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://picsum.photos/600/400"
                  style={{
                    borderColor: "#CCCCCC",
                    borderWidth: "2px",
                    borderRadius: "4px",
                    padding: "0.75rem",
                  }}
                />
                {formData.imageUrl && (
                  <div
                    className="mt-3"
                    style={{
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      style={{
                        maxHeight: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{
                        color: "#1A1A1A",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      disabled
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderColor: "#CCCCCC",
                        borderWidth: "2px",
                        borderRadius: "8px",
                        padding: "0.75rem",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{
                        color: "#1A1A1A",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Created At
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="createdAt"
                      value={formData.createdAt.slice(0, 16)}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          createdAt: e.target.value + ":00Z",
                        }))
                      }
                      style={{
                        borderColor: "#CCCCCC",
                        borderWidth: "2px",
                        borderRadius: "8px",
                        padding: "0.75rem",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="d-flex gap-3 pt-3"
                style={{
                  borderTop: "2px solid #CCCCCC",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    borderRadius: "8px",
                  }}
                >
                  {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate("/admin")}
                  style={{
                    backgroundColor: "#333333",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    borderRadius: "8px",
                  }}
                >
                  ← Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
