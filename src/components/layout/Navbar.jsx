import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
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
  );
}
