import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.js";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // BUG 3: logout handler does nothing — session stays active
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <NavLink to="/dashboard" className="navbar-brand">
        Library
      </NavLink>

      <ul className="navbar-nav">
        <li>
          <NavLink to="/books" data-testid="nav-books">
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-reservations" data-testid="nav-my-reservations">
            My Reservations
          </NavLink>
        </li>
        {true && ( // BUG 10: admin links shown to all users
          <>
            <li>
              <NavLink to="/admin/books" data-testid="nav-admin-books">
                Admin: Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reservations" data-testid="nav-admin-reservations">
                Admin: Reservations
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="navbar-actions">
        <NavLink to="/dashboard">
          <span className={`badge badge-${user.role}`} data-testid="user-role-badge">
            {user.role}
          </span>
        </NavLink>
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleLogout}
          data-testid="logout-button"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
