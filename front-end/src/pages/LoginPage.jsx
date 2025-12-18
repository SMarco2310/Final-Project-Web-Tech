import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      console.log("Logged in successfully");
      navigate(`/dashboard/${data.user.id}`);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-row md:flex-row w-full h-full min-h-[calc(100vh-80px)] items-center justify-center p-4 gap-2">
      <div className="hidden md:flex flex-1 w-full max-w-xl items-center mx-10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrl_kYSuxFORtYxh4dZMVlAvzm0gnPlGqQQKbFNdR1dn0Td53rewM4D2ufSf1mUldF7S1JBsxacq5t7nVkHYg1sdy6KQur9XYC_xTg_TknPNs7bGyQKSfdiK96G0rPADB7jpvdBnAFS-XYFHzYWL0-XdqdX1QjMjJvW7LYe0xfNAvsSvhNYelg96sc7tSF_VJSPyQ0fkJ6cE5BIY9Y8hqyYdY46bzBm1G0M-V6sPK9dyLTbdQ-IxSK1ng-HxgDQmrr-mX6KJJByQI"
          alt="Illustration of lost and found items"
          className="w-full h-auto object-cover rounded-3xl drop-shadow-2xl"
        />
      </div>
      <div className="w-full max-w-md p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-3xl shadow-2xl mx-10">


        {error && (
          <div className=" text-red-400 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label
              className="block text-sm font-bold mb-2 text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                type="email"
                id="email"
                name="email"
                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-autocomplete="true"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-bold mb-2 text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                type={isVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                title="Must contain at least 8 characters, including uppercase, lowercase, and numbers"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={handleToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link className="text-blue-400 hover:text-blue-300 font-bold transition-colors" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
