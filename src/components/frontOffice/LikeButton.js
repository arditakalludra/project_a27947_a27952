// src/components/frontoffice/LikeButton.js
import React, { useState, useEffect } from 'react';
import { updatePost } from '../../services/api';

function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (likedPosts.includes(postId)) {
      setLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (liked) return;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);

    // Persist like
    localStorage.setItem(
      'likedPosts',
      JSON.stringify([...JSON.parse(localStorage.getItem('likedPosts') || '[]'), postId])
    );

    try {
      await updatePost(postId, { likesCount: newLikes });
    } catch (error) {
      console.error('Failed to update like count:', error);
      setLikes(likes); // revert on error
      setLiked(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`btn ${liked ? 'btn-danger' : 'btn-outline-danger'} btn-sm`}
      title={liked ? 'You liked this!' : 'Like this post'}
    >
      ❤️ {likes}
    </button>
  );
}

export default LikeButton;