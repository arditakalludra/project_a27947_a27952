import axios from 'axios';

const BASE_URL = 'https://api.sheety.co/a9a3922f064f47011cd1091c07d29c94/blog';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getPosts = () => api.get('/posts').then(res => res.data.posts || []);
export const createPost = (post) => api.post('/posts', { post }).then(res => res.data.post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, { post });
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const getComments = () => api.get('/comments').then(res => res.data.comments || []);
export const createComment = (comment) => api.post('/comments', { comment }).then(res => res.data.comment);
export const updateComment = (id, comment) => api.put(`/comments/${id}`, { comment });

export const getCommentsByPostId = async (post_id) => {
  const comments = await getComments();
  return comments
    .filter(c => c.postId === Number(post_id) && c.isApproved)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getCommentsCountByPostId = async (post_id) => {
  const comments = await getComments();
  return comments.filter(c => c.postId === Number(post_id) && c.isApproved).length;
};