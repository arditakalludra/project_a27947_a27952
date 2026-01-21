import { Link } from "react-router-dom";

function PostCard({ post, commentsCount = 0 }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card mb-4 h-100 shadow-sm post-card">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          className="card-img-top"
          alt={post.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <small className="text-muted mb-1">
          {post.author} • {date}
        </small>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text flex-grow-1 border-top border-2 my-2">
          {post.content.length > 100
            ? post.content.substring(0, 100) + "…"
            : post.content}
        </p>
        <div className="mt-auto">
          <div
            className="d-flex justify-content-between align-items-center mb-2"
            style={{
              fontSize: "0.95rem",
              color: "#000000",
            }}
          >
            <span className="d-flex align-items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="me-1"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {post.likesCount || 0} like{post.likesCount !== 1 ? "s" : ""}
            </span>

            <span className="d-flex align-items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="me-1"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              {commentsCount} comment{commentsCount !== 1 ? "s" : ""}
            </span>
          </div>

          <Link
            to={`/posts/${post.id}`}
            className="btn btn-sm btn-outline-primary w-100 mt-2rem"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#000000";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--brown-primary)";
            }}
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
