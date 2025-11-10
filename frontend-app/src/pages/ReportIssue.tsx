import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ReportIssue() {
  const navigate = useNavigate();

  // Redirect if user not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to report an issue.");
      navigate("/login");
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          alert("📍 Location captured!");
        },
        () => alert("Failed to get location.")
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (location) {
      formData.append("lat", location.lat.toString());
      formData.append("lng", location.lng.toString());
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/issues", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Issue reported successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setLocation(null);
    } catch (err) {
      alert("❌ Error reporting issue");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Report an Issue</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Road</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Garbage</option>
          <option>Other</option>
        </select>
        <br />

        <button type="button" onClick={handleLocation}>
          📍 Capture Location
        </button>
        {location && (
          <p>
            ✅ Location: {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
          </p>
        )}
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
