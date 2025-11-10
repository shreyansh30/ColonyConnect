import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.user ? parsed.user : parsed); // normalize
    }
  }, []);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => alert("❌ Failed to get location.")
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    }
  };

  // 🧱 If not logged in → show friendly message
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-10 border border-gray-200 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🔒 Please log in</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to report an issue.  
            Log in now to help your community!
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main form
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 border-b pb-3">
          📝 Create a new report
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Issue Title</label>
            <input
              type="text"
              placeholder="Pothole near Elm & 4th"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Describe the issue, severity, and safety concerns..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Road</option>
              <option>Water</option>
              <option>Electricity</option>
              <option>Garbage</option>
              <option>Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Upload Image</label>
            <label className="flex items-center justify-center w-full px-4 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-md cursor-pointer hover:bg-blue-200 transition">
              <span>📁 Choose File</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            {image && (
              <p className="text-sm text-green-600 mt-2">
                ✅ {image.name} selected
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Location</label>
            <button
              type="button"
              onClick={handleLocation}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition"
            >
              📍 Get My Location
            </button>
            {location && (
              <p className="text-sm text-green-600 mt-2">
                ✅ Location captured ({location.lat.toFixed(2)}, {location.lng.toFixed(2)})
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
