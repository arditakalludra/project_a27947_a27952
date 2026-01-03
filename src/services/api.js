// axios instance + helpers

// src/services/api.js
import axios from 'axios';

// Replace with your Sheety URL
const BASE_URL = 'https://dashboard.sheety.co/projects/69592101e0fa9a0546f3dbed';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Posts
export const getPosts = () => api.get('/posts').then(res => res.data.posts || []);
export const createPost = (post) => api.post('/posts', { post }).then(res => res.data.post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, { post });
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Comments
export const getComments = () => api.get('/comments').then(res => res.data.comments || []);
export const createComment = (comment) => api.post('/comments', { comment }).then(res => res.data.comment);
export const updateComment = (id, comment) => api.put(`/comments/${id}`, { comment });

// Helper: Get comments for a specific post (client-side filter)
export const getCommentsByPostId = async (postId) => {
  const comments = await getComments();
  return comments
    .filter(c => c.postId === postId && c.isApproved)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};