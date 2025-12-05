import { Link } from "react-router-dom";
import { useState } from "react";
import { User, Mail, Lock, Phone, Briefcase, GraduationCap, Eye, EyeOff } from "lucide-react";

export default function RegistrationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [studentId, setStudentId] = useState("");

  const inputClasses = "w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl h-12 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all";
  const labelClasses = "block text-sm font-bold mb-2 text-gray-200";
  const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400";

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-[calc(100vh-80px)] items-center justify-center p-4 gap-2">
      <div className="hidden md:flex flex-1 w-full max-w-xl items-center justify-center">
        <img
          src="login_image.png"
          alt="Background Image"
          className="w-full h-auto max-h-[500px] object-contain rounded-3xl drop-shadow-2xl"
        />
      </div>
      <div className="w-full md:flex-1 max-w-xl p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 mx-auto">
        <h2 className="text-3xl font-bold pb-1.5 text-white">
          Create an Account!
        </h2>
        <p className="mb-6 text-sm text-gray-400">
          Find what you've lost, return what you've found
        </p>

        <form className="flex flex-col gap-4">
          <div>
            <label className={labelClasses} htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className={iconClasses} />
              <input
                className={inputClasses}
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
            <label className={labelClasses} htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className={iconClasses} />
              <input
                className={inputClasses}
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
            <label className={labelClasses} htmlFor="studentId">
              Student ID
            </label>
            <div className="relative">
              <GraduationCap className={iconClasses} />
              <input
                className={inputClasses}
                type="text"
                id="studentId"
                name="studentId"
                pattern="^\d{4}\d{4}$"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="XXXX2025"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClasses} htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className={iconClasses} />
              <input
                className={`${inputClasses} pr-12`}
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
            <label className={labelClasses} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className={iconClasses} />
              <input
                className={`${inputClasses} pr-12`}
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
            <label className={labelClasses} htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <Phone className={iconClasses} />
              <input
                className={inputClasses}
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

          <div>
            <label className={labelClasses} htmlFor="role">
              Role
            </label>
            <div className="relative">
              <Briefcase className={iconClasses} />
              <select
                className={`${inputClasses} appearance-none`}
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
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
