import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/issues")
      .then((res) => setIssues(res.data))
      .catch(() => alert("Failed to load issues"));
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.put(`/issues/${id}/status`, { status: newStatus });
      setIssues((prev) =>
        prev.map((i) => (i._id === id ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧰 Admin Dashboard</h2>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <table
          border={1}
          cellPadding={10}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#1e293b", color: "#fff" }}>
              <th>Title</th>
              <th>Category</th>
              <th>AI Summary</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td style={{ color: "#1e293b", fontWeight: "500" }}>{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.summary || "—"}</td>
                <td>
                  <span
                    style={{
                      background: getBadgeColor(issue.priority),
                      color: "#fff",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td>{issue.status}</td>
                <td>
                  <select
                    value={issue.status}
                    onChange={(e) =>
                      handleStatusChange(issue._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
