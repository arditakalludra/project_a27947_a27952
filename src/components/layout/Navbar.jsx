import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container">
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
            style={{
              fontSize: "1.5rem",
              letterSpacing: "1px",
              color: "black",
              border: "none",
            }}
          >
            My Blog
          </Link>

          <button
            className="burger-menu"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>

          <div className="desktop-menu">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold d-flex align-items-center p-0 ms-4"
                  to="/"
                  style={{ color: "black" }}
                >
                  Home
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-semibold d-flex align-items-center ms-4 p-0"
                      to="/admin"
                      style={{ color: "black" }}
                    >
                      Admin
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link fw-semibold d-flex align-items-center ms-4 p-0"
                      onClick={handleLogout}
                      style={{ cursor: "pointer", color: "black" }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.opacity = "0.75")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold d-flex align-items-center ms-4 "
                    to="/login"
                    style={{ color: "black" }}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Бокова панель для мобільних */}
      <div className={`sidebar-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>

            {isLoggedIn && (
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  to="/admin"
                  onClick={handleLinkClick}
                >
                  Admin
                </Link>
              </li>
            )}

            <li className="sidebar-item">
              {isLoggedIn ? (
                <button
                  className="sidebar-link"
                  onClick={handleLogout}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="sidebar-link"
                  to="/login"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sidebar-overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
}
