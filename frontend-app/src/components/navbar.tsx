import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  // 🔄 Load user whenever the route changes (updates after login/logout)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 🧭 Determine user role
  const isAdmin = user?.email === "admin@colonyconnect.com";

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#1e293b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* 🏠 Home always visible */}
        <Link
          to="/"
          style={{ marginRight: "1rem", color: "#fff", textDecoration: "none" }}
        >
          🏠 Home
        </Link>

        {/* 👤 Normal user sees Issues + Report */}
        {user && !isAdmin && (
          <>
            <Link
              to="/issues"
              style={{
                marginRight: "1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              📋 Issues
            </Link>

            <Link
              to="/report"
              style={{
                marginRight: "1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              📝 Report
            </Link>
          </>
        )}

        {/* 🧰 Admin sees Open Issues (dashboard) */}
        {isAdmin && (
          <Link
            to="/admin"
            style={{
              marginRight: "1rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            🧰 Open Issues
          </Link>
        )}
      </div>

      <div>
        {/* 🔐 Auth controls */}
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>👋 Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
