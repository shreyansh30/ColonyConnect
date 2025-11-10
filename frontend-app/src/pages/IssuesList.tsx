import { useEffect, useState } from "react";
import api from "../api/axios";

export default function IssuesList() {
    const [issues, setIssues] = useState<any[]>([]);

    useEffect(() => {
        api
            .get("/issues")
            .then((res) => setIssues(res.data))
            .catch(() => alert("Failed to load issues"));
    }, []);

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

    return (
        <div style={{ padding: "2rem" }}>
            <h2>📋 Reported Issues</h2>

            {issues.length === 0 ? (
                <p>No issues reported yet.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gap: "1rem",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    }}
                >
                    {issues.map((issue) => (
                        <div
                            key={issue._id}
                            style={{
                                border: "1px solid #374151",
                                borderRadius: "12px",
                                padding: "1rem",
                                background: "#1e293b",   // ← dark navy gray
                                color: "#f8fafc",         // ← light text for readability
                                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.02)";
                                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1.0)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3 style={{ margin: 0, color: "#1e293b" }}>{issue.title}</h3>
                                <span
                                    style={{
                                        background: getBadgeColor(issue.priority),
                                        color: "#fff",
                                        padding: "4px 10px",
                                        borderRadius: "8px",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    {issue.priority || "Medium"}
                                </span>
                            </div>

                            <p style={{ fontStyle: "italic", marginTop: "6px" }}>
                                🧠 {issue.summary || "No AI summary available"}
                            </p>

                            <p>{issue.description}</p>
                            <p>
                                <strong>Category:</strong> {issue.category}
                            </p>

                            {issue.imageUrl && (
                                <img
                                    src={issue.imageUrl}
                                    alt="Issue"
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        marginTop: "10px",
                                    }}
                                />
                            )}

                            {issue.location?.lat && issue.location?.lng && (
                                <a
                                    href={`https://www.google.com/maps?q=${issue.location.lat},${issue.location.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📍 View on Map
                                </a>
                            )}

                            <p>
                                <strong>Status:</strong> {issue.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
