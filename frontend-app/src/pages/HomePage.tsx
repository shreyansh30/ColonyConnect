import { useEffect, useState } from "react";
import api from "../api/axios";

export default function HomePage() {
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    api.get("/issues")
      .then((res) => {
        const all = res.data;
        const resolved = all.filter((i: any) => i.status === "Resolved").length;
        const pending = all.filter((i: any) => i.status === "Pending").length;
        setStats({ total: all.length, resolved, pending });
      })
      .catch(() => console.log("Failed to load stats"));
  }, []);

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h1>🌆 Welcome to ColonyConnect</h1>
      <p>
        A civic issue reporting platform empowering citizens to report problems,
        track progress, and build better communities.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <div style={{ background: "#f59e0b", padding: "1rem 2rem", borderRadius: "8px" }}>
          <h2>{stats.total}</h2>
          <p>Total Issues</p>
        </div>
        <div style={{ background: "#10b981", padding: "1rem 2rem", borderRadius: "8px" }}>
          <h2>{stats.resolved}</h2>
          <p>Resolved</p>
        </div>
        <div style={{ background: "#ef4444", padding: "1rem 2rem", borderRadius: "8px" }}>
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h3>🚀 How It Works</h3>
        <ol style={{ textAlign: "left", maxWidth: "600px", margin: "1rem auto" }}>
          <li>Register or log in to your account</li>
          <li>Report issues with photos and GPS location</li>
          <li>Track issue progress and resolution</li>
        </ol>
      </div>
    </div>
  );
}
