import { Link } from "react-router-dom";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-[calc(100vh-80px)] items-center justify-center p-4 gap-8">
      <div className="flex-1 w-full max-w-lg flex items-center justify-center">
        <img
          src="login_image.png"
          alt="Illustration of lost and found items"
          className="w-full h-auto max-h-[500px] object-contain rounded-3xl drop-shadow-2xl"
        />
      </div>
      <div className="flex-1 w-full max-w-md p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold pb-2 text-white">
          Welcome Back!
        </h2>
        <p className="mb-8 text-sm text-gray-400">
          Find what you've lost, return what you've found
        </p>

        <form className="flex flex-col gap-4">
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
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$"
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
