// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/frontOffice/PostCard';
import SearchBar from '../components/frontOffice/SearchBar';
import Pagination from '../components/frontOffice/Pagination';
import { getPosts } from '../services/api';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    // Filter when search term or posts change
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, posts]);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      // Sort newest first
      const sorted = data.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);
    } catch (err) {
      alert('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-center mb-4">📖 Welcome to My Blog</h1>
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
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {currentPosts.map(post => (
              <div className="col" key={post.id}>
                <PostCard post={post} />
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