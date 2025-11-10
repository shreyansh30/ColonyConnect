import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", loginData);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch {
      alert("❌ Invalid credentials");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", registerData);
      alert("✅ Registration successful! Please login.");
      setIsFlipped(false);
    } catch {
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-2">Access your account</h2>
      

      {/* Flip Card Container */}
      <div className="relative w-[360px] h-[420px] perspective">
        <div
          className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Login Card */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-lg backface-hidden flex flex-col items-center justify-center p-8">
            <div className="flex justify-between items-center w-full mb-6">
              <button
                className="text-blue-700 font-semibold border-b-2 border-blue-600 pb-1"
              >
                Login
              </button>
              <button
                className="text-gray-500 hover:text-blue-600 transition"
                onClick={() => setIsFlipped(true)}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">Forgot password?</p>
          </div>

          {/* Register Card */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-lg backface-hidden [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8">
            <div className="flex justify-between items-center w-full mb-6">
              <button
                className="text-gray-500 hover:text-blue-600 transition"
                onClick={() => setIsFlipped(false)}
              >
                Login
              </button>
              <button
                className="text-blue-700 font-semibold border-b-2 border-blue-600 pb-1"
              >
                Register
              </button>
            </div>

            <form onSubmit={handleRegister} className="w-full space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="text-gray-400 text-sm mt-8">
        © 2025 ColonyConnect
      </footer>
    </div>
  );
}
