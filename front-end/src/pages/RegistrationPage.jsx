import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Mail, Lock, Phone, GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData = {
        name,
        email,
        student_id,
        password,
        phone,
        role: "student",
      };
      await register(userData);
      console.log("Sign up successful");
      navigate("/Login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Failed to create account");
    }
  };


  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-[calc(100vh-80px)] items-center justify-center p-4 gap-2">
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
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-200" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-200" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                type="email"
                id="email"
                name="email"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-200" htmlFor="studentId">
              Student ID
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                type="text"
                id="studentId"
                name="studentId"
                pattern="^\d{4}\d{4}$"
                value={student_id}
                onChange={(e) => setStudent_id(e.target.value)}
                placeholder="XXXX2025"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-200" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
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

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-200" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all pr-12"
                type={isVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
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

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-200" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                type="tel"
                id="phone"
                name="phone"
                pattern="^[0-9]{10}$"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="1234567890"
                required
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-2"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-400">
          Already have an account?{" "}
          <Link className="text-blue-400 hover:text-blue-300 font-bold transition-colors" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
