import axios from "axios";

const BASE_URL = "https://api.sheety.co/d4f01202612fa0dc1c10f95812deb78c/blog";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getPosts = () =>
  api.get("/posts").then((res) => res.data.posts || []);
export const createPost = (post) =>
  api.post("/posts", { post }).then((res) => res.data.post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, { post });
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const getComments = () =>
  api.get("/comments").then((res) => res.data.comments || []);
export const createComment = (comment) =>
  api.post("/comments", { comment }).then((res) => res.data.comment);
export const updateComment = (id, comment) =>
  api.put(`/comments/${id}`, { comment });

export const getCommentsByPostId = async (post_id) => {
  const comments = await getComments();
  return comments
    .filter((c) => c.postId === Number(post_id) && c.isApproved)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getCommentsCountByPostId = async (post_id) => {
  const comments = await getComments();
  return comments.filter((c) => c.postId === Number(post_id) && c.isApproved)
    .length;
};

export const updatePostLikes = async (postId, newLikesCount) => {
  try {
    const posts = await getPosts();
    const post = posts.find((p) => p.id === Number(postId));

    if (!post) {
      throw new Error("Post not found");
    }

    const updatedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      imageUrl: post.imageUrl || "",
      createdAt: post.createdAt,
      likesCount: newLikesCount,
    };

    const result = await api.put(`/posts/${postId}`, {
      post: updatedPost,
    });

    return result;
  } catch (error) {
    throw error;
  }
};
