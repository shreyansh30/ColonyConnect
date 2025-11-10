import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  createdBy?: string;
}

export default function HomePage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [city, setCity] = useState("Detecting...");
  const [user, setUser] = useState<{ _id?: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
  };

  // ✅ Auto-detect city (only asks once)
  useEffect(() => {
    const savedCity = localStorage.getItem("cityName");
    if (savedCity) {
      setCity(savedCity);
      return;
    }

    const fetchCity = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        const cityName =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.state_district ||
          "Unknown";
        setCity(cityName);
        localStorage.setItem("cityName", cityName); // ✅ store it so no repeat prompt
        console.log("📍 City set to:", cityName);
      } catch {
        setCity("Unavailable");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchCity(pos.coords.latitude, pos.coords.longitude),
        () => setCity("Unavailable"),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else setCity("Not supported");
  }, []);


  // ✅ Fetch issues
  useEffect(() => {
    fetch("http://localhost:8080/api/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("❌ Error fetching issues:", err))
      .finally(() => setLoading(false));
  }, []);

  const totalIssues = issues.length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* ✅ Main Content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-100 rounded-r-2xl shadow-md p-6 space-y-6 hidden md:block m-4">
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
            <h2 className="text-gray-600 uppercase text-sm font-semibold mb-2">Overview</h2>
            <ul className="space-y-2">
              <li className="text-gray-800 font-medium">✅ Platform Status: OK</li>
              <li className="text-gray-800 font-medium">🌆 City: {city}</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
            <h2 className="text-gray-600 uppercase text-sm font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/report" className="text-blue-600 hover:underline">📢 Submit Issue</Link></li>
              <li className="relative group">
                <span className="text-blue-700 hover:text-blue-800 font-medium cursor-pointer">
                  ℹ️ How it Works
                </span>

                {/* Tooltip box */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 w-64 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-700 border border-blue-200 z-10">
                  <h3 className="font-semibold text-blue-700 mb-2">How ColonyConnect Works</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>📍 Auto-captures your issue location.</li>
                    <li>📸 Upload images for better visibility.</li>
                    <li>🚀 Submitted issues reach authorities instantly.</li>
                    <li>📊 Track progress live.</li>
                  </ul>
                </div>
              </li>

            </ul>
          </div>
        </aside>

        {/* Dashboard */}
        <section className="flex-1 p-8">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-2xl shadow-sm mb-6">
            <h2 className="text-2xl font-semibold text-blue-700">
              ColonyConnect empowers civic action
            </h2>
            <p className="text-gray-700 mt-2">
              Report local problems, track progress, and help your city respond faster.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 mt-10">Loading statistics...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
                <h3 className="text-gray-500 font-semibold text-sm mb-2">Total Issues</h3>
                <p className="text-4xl font-bold text-gray-800">{totalIssues}</p>
                <div className="flex gap-3 mt-3 text-sm">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    In Progress: {inProgress}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Resolved: {resolved}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
                <h3 className="text-gray-500 font-semibold text-sm mb-2">In Progress</h3>
                <p className="text-4xl font-bold text-yellow-600">{inProgress}</p>
                <p className="text-sm text-gray-500 mt-1">⏱️ Active reports being worked on</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
                <h3 className="text-gray-500 font-semibold text-sm mb-2">Resolved</h3>
                <p className="text-4xl font-bold text-green-600">{resolved}</p>
                <p className="text-sm text-gray-500 mt-1">📈 Successfully fixed issues</p>
              </div>
            </div>
          )}
        </section>
      </main>
      {/* ✅ Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-200">
        © 2025 ColonyConnect | About | Privacy | Terms
      </footer>
    </div>
  );
}
