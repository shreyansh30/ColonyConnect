import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  // ✅ Load user info from localStorage when route changes
  useEffect(() => {
  const loadUser = () => {
    const stored = localStorage.getItem("userInfo");
    if (!stored) {
      setUser(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      // If backend saved { user: { name, email }, token } use parsed.user
      // Otherwise if saved { name, email, token } use parsed directly
      const normalized = parsed.user ? parsed.user : parsed;
      setUser(normalized);
    } catch (err) {
      console.error("Failed to parse userInfo:", err);
      setUser(null);
    }
  };

  loadUser();

  const onStorage = () => loadUser();
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, [location]);


  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm rounded-b-2xl sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-700"><Link to="/" className="text-2xl font-bold text-blue-700">ColonyConnect</Link></h1>

      <nav className="flex-1 flex justify-center items-center gap-8">
        <Link
          to="/"
          className={`px-3 py-2 rounded-lg font-medium transition ${location.pathname === "/"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-800 hover:text-blue-600"
            }`}
        >
          Home
        </Link>

        <Link
          to="/issues"
          className={`px-3 py-2 rounded-lg font-medium transition ${location.pathname === "/issues"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-800 hover:text-blue-600"
            }`}
        >
          Issues
        </Link>
      </nav>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              Welcome, {user.name?.split(" ")[0] || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}

        {/* Report button visible only when logged in */}
        {user && (
          <Link
            to="/report"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            + Report Issue
          </Link>
        )}
      </div>
    </header>
  );
}

