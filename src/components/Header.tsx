import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import "../style/ui.css";

interface HeaderProps {
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName = "Utilisateur" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      navigate("/login");
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* LOGO */}
        <div className="header-logo" onClick={() => navigate("/products")}>
          <div className="logo-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="url(#gradient)" />
              <path
                d="M16 8L22 14L16 20L10 14L16 8Z"
                fill="white"
                opacity="0.9"
              />
              <path d="M16 12L20 16L16 20L12 16L16 12Z" fill="white" />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#667eea" />
                  <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="logo-text">ProductApp</h1>
        </div>

        {/* NAVIGATION */}
        <nav className="header-nav">
          <button className="nav-link" onClick={() => navigate("/products")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Produits</span>
          </button>

          <button className="nav-link" onClick={() => navigate("/dashboard")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span>Tableau de bord</span>
          </button>

          <button className="nav-link" onClick={() => navigate("/stats")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            <span>Statistiques</span>
          </button>

          <button className="nav-link" onClick={() => navigate("/settings")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
              <path d="M19.071 19.071l-4.243-4.242M9.172 9.172 4.929 4.93m14.142 0l-4.242 4.242M9.172 14.828 4.929 19.07" />
            </svg>
            <span>Paramètres</span>
          </button>
        </nav>

        {/* USER SECTION */}
        <div className="header-user">
          <div className="user-info">
            <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
            <span className="user-name">{userName}</span>
          </div>
          <Button
            label="Déconnexion"
            variant="secondary"
            type="button"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};export default Header;