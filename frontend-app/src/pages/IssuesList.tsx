import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function IssuesList() {
  const [issues, setIssues] = useState<any[]>([]);
  const userInfo = localStorage.getItem("userInfo");
  const parsedUser = userInfo ? JSON.parse(userInfo) : null;
  const isAdmin = parsedUser?.user?.email === "admin@colonyconnect.com";
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/issues/${id}/status`, { status: newStatus });
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: newStatus } : issue
        )
      );
      console.log("✅ Status updated:", newStatus);
    } catch (err) {
      console.error("❌ Failed to update status");
    }
  };

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch all issues from backend
  useEffect(() => {
    api
      .get("/issues")
      .then((res) => setIssues(res.data))
      .catch(() => alert("Failed to load issues"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Function to get priority badge color
  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ef4444"; // red
      case "Medium":
        return "#f59e0b"; // orange
      case "Low":
        return "#10b981"; // green
      default:
        return "#6b7280"; // gray
    }
  };

  // ✅ Filter issues if user is logged in
  const filteredIssues = user
    ? issues.filter((issue) => issue.createdBy === user._id)
    : issues;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-1">📋 Reported Issues</h2>
        <p className="text-gray-600 mb-6">
          Browse and track issues submitted by citizens around your locality.
        </p>

        {/* Login message */}
        {!user && (
          <div className="bg-blue-100 border border-blue-300 text-blue-800 p-3 rounded-lg mb-6">
            🔒 Please{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              login
            </Link>{" "}
            to see your reported issues. Public issues are shown below.
          </div>
        )}

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <span className="bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            Total: <strong>{issues.length}</strong>
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full shadow-sm">
            In Progress: <strong>{issues.filter(i => i.status === "In Progress").length}</strong>
          </span>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full shadow-sm">
            Resolved: <strong>{issues.filter(i => i.status === "Resolved").length}</strong>
          </span>
        </div>

        {/* Issues List */}
        {loading ? (
          <p className="text-gray-500">Loading issues...</p>
        ) : filteredIssues.length === 0 ? (
          <p className="text-gray-500 text-center">No issues found.</p>
        ) : (
          <div className="space-y-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue._id}
                className="flex flex-col md:flex-row items-start justify-between bg-blue-50 hover:bg-blue-100 transition rounded-xl p-4 border border-blue-200 shadow-sm"
              >
                {/* Image */}
                {issue.imageUrl && (
                  <img
                    src={issue.imageUrl}
                    alt="Issue"
                    className="w-full md:w-40 h-32 object-cover rounded-lg mb-3 md:mb-0"
                  />
                )}

                {/* Info */}
                <div className="flex-1 md:ml-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">{issue.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${issue.status === "Resolved"
                        ? "bg-green-500"
                        : issue.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                        }`}
                    >
                      {issue.status}
                    </span>
                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {issue.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      🕒 {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{issue.description}</p>
                  <p className="text-sm italic text-blue-700 mt-1">
                    🧠 {issue.summary || "No AI summary available"}
                  </p>

                  {/* Map + Link */}
                  {issue.location?.lat && issue.location?.lng && (
                    <a
                      href={`https://www.google.com/maps?q=${issue.location.lat},${issue.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-600 hover:underline mt-2 text-sm"
                    >
                      📍 View on Map
                    </a>
                  )}
                </div>

                {/* Action */}
                {/* Action */}
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  {isAdmin ? (
                    <div className="flex flex-col items-end">
                      <label className="text-xs text-gray-600 mb-1">Change Status</label>
                      <select
                        value={issue.status}
                        onChange={(e) => updateStatus(issue._id, e.target.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border focus:outline-none ${issue.status === "Resolved"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : issue.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : "bg-gray-100 text-gray-700 border-gray-300"
                          }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  ) : (
                    <>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                        Track
                      </button>
                      <span className="text-xs text-gray-500 mt-2">ID: {issue._id.slice(-5)}</span>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

