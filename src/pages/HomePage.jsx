import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/frontOffice/PostCard";
import SearchBar from "../components/frontOffice/SearchBar";
import Pagination from "../components/frontOffice/Pagination";
import { getPosts, getComments } from "../services/api";

export default function HomePage() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsCounts, setCommentsCounts] = useState({});
  const postsPerPage = 6;

  useEffect(() => {
    loadPosts();
  }, [location.key]);

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm, posts]);

  const loadPosts = async () => {
    try {
      const [postsData, commentsData] = await Promise.all([
        getPosts(),
        getComments(),
      ]);

      const sorted = postsData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);

      const counts = {};
      commentsData.forEach((comment) => {
        if (comment.isApproved) {
          const postId = Number(comment.postId);
          counts[postId] = (counts[postId] || 0) + 1;
        }
      });
      setCommentsCounts(counts);
    } catch (err) {
      alert("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-center mb-4">Welcome to My Blog</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-muted">
          No posts found. {searchTerm && <>Try a different search.</>}
        </p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
            {currentPosts.map((post) => (
              <div className="col" key={post.id}>
                <PostCard
                  post={post}
                  commentsCount={commentsCounts[post.id] || 0}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
