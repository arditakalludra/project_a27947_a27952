import React, { useState, useEffect } from "react";
function HeartFilledIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 -1 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{
        marginTop: "0.2rem",
        marginRight: "0.5rem",
        verticalAlign: "text-bottom",
      }}
      fill="currentColor"
    >
      <g fill="currentColor">
        <path
          d="M126,882 C122.667,882 119.982,883.842 117.969,886.235 C116.013,883.76 113.333,882 110,882 C105.306,882 102,886.036 102,890.438 C102,892.799 102.967,894.499 104.026,896.097 L116.459,911.003 C117.854,912.312 118.118,912.312 119.513,911.003 L131.974,896.097 C133.22,894.499 134,892.799 134,890.438 C134,886.036 130.694,882 126,882"
          transform="translate(-102 -882)"
        />
      </g>
    </svg>
  );
}

function HeartOutlineIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 -0.5 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{
        marginTop: "0.2rem",
        marginRight: "0.5rem",
        verticalAlign: "text-bottom",
      }}
      fill="currentColor"
    >
      <g fill="currentColor">
        <path
          d="M128,893.682 L116,908 L104,893.623 C102.565,891.629 102,890.282 102,888.438 C102,884.999 104.455,881.904 108,881.875 C110.916,881.851 114.222,884.829 116,887.074 C117.731,884.908 121.084,881.875 124,881.875 C127.451,881.875 130,884.999 130,888.438 C130,890.282 129.553,891.729 128,893.682 L128,893.682 Z M124,880 C120.667,880 118.145,881.956 116,884 C113.957,881.831 111.333,880 108,880 C103.306,880 100,884.036 100,888.438 C100,890.799 100.967,892.499 102.026,894.097 L114.459,909.003 C115.854,910.48 116.118,910.48 117.513,909.003 L129.974,894.097 C131.22,892.499 132,890.799 132,888.438 C132,884.036 128.694,880 124,880 L124,880 Z"
          transform="translate(-100 -880)"
        />
      </g>
    </svg>
  );
}
import { updatePost } from "../../services/api";

function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (likedPosts.includes(postId)) {
      setLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (liked) return;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);

    localStorage.setItem(
      "likedPosts",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("likedPosts") || "[]"),
        postId,
      ]),
    );

    try {
      await updatePost(postId, { likesCount: newLikes });
    } catch (error) {
      console.error("Failed to update like count:", error);
      setLikes(likes); // revert on error
      setLiked(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className="btn btn-sm"
      title={liked ? "You liked this!" : "Like this post"}
      style={{
        backgroundColor: liked ? "#000000" : "transparent",
        color: liked ? "white" : "#000000",
        border: `2px solid ${liked ? "#000000" : "#CCCCCC"}`,
        borderRadius: "5px",
        padding: "0.4rem 1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
        cursor: liked ? "not-allowed" : "pointer",
      }}
      onMouseOver={(e) => {
        if (!liked) {
          e.target.style.backgroundColor = "#E0E0E0";
          e.target.style.transform = "scale(1.05)";
        }
      }}
      onMouseOut={(e) => {
        if (!liked) {
          e.target.style.backgroundColor = "transparent";
          e.target.style.transform = "scale(1)";
        }
      }}
    >
      {liked ? <HeartFilledIcon /> : <HeartOutlineIcon />} {likes}
    </button>
  );
}

export default LikeButton;
