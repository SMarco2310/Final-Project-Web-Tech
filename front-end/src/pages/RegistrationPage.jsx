import { Link } from "react-router-dom";
import { useState } from "react";
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
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  // const [mobileView, setMobileView] = useState(false);

  return (
    <div className="flex flex-1/2">
      <div className="flex-1 w-lg h-full m-3 p-6 mt-80 items-center flex flex-col justify-center">
        <img
          src="login_image.png"
          alt="Background Image"
          className="w- h-full rounded-4xl "
        />
      </div>
      <div className=" flex-1 max-w-xl h-full m-3 p-6 mt-50">
        <h2 className="text-3xl font-bold pb-1.5 text-neutral-50">
          Create an Account!
        </h2>
        <p className="mb-6 text-xs text-neutral-50">
          Find what you've lost, return what you've found
        </p>

        <form className="flex flex-col">
          <label
            className="text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="name"
          >
            Full Name
          </label>
          <div className="relative w-full mb-5">
            <img
              src="person_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 max-w-md"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-autocomplete="true"
              placeholder="Enter your name"
              required
            />
          </div>
          <label
            className="text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative w-full mb-5">
            <img
              src="person_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 max-w-md"
              type="email"
              id="email"
              name="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-autocomplete="true"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <label
            className="text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="studentId"
          >
            Student ID
          </label>
          <div className="relative w-full mb-5">
            <img
              src="person_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 max-w-md"
              type="text"
              id="studentId"
              name="studentId"
              pattern="^\d{4}\d{4}$"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              aria-autocomplete="true"
              placeholder="XXXX2025"
              required
            />
          </div>
          <label
            className=" text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative max-w-md mb-3">
            <img
              src="lock_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-12 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              type={isVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // work on the pattern
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$"
              placeholder="Enter your password"
              required
            />
            <button
              onClick={handleToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <img
                src={isVisible ? "eye_closed_icon.png" : "eye_open_icon.png"}
                className="w-5 h-5 opacity-70"
              />
            </button>
          </div>
          <label
            className="text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="email"
          >
            Confirm Password
          </label>
          <div className="relative max-w-md mb-5">
            <img
              src="lock_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              type="email"
              id="email"
              name="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-autocomplete="true"
              placeholder="Confirm Password"
              required
            />
            <button
              onClick={handleToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <img
                src={isVisible ? "eye_closed_icon.png" : "eye_open_icon.png"}
                className="w-5 h-5 opacity-70"
              />
            </button>
          </div>
          <label
            className="text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <div className="relative w-full mb-5">
            <img
              src="phone_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 max-w-md"
              type="phone"
              id="phone"
              name="phone"
              pattern="^[0-9]{10}$"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-autocomplete="true"
              placeholder="1234567890"
              required
            />
          </div>
          <label
            className="text-neutral-50 text-xs font-bold ml-1 mb-1 w-fit"
            htmlFor="role"
          >
            Role
          </label>
          <div className="relative w-full mb-5">
            <img
              src="person_icon.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <select
              className="w-full bg-gray-800 border border-gray-500 text-gray-300 rounded-2xl h-12 pl-12 pr-4 focus:outline-none focus:border-gray-500 max-w-md "
              type="text"
              id="role"
              name="role"
              pattern=""
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-autocomplete="true"
              required
            >
              <option className="text-gray-300" value="student">
                Student
              </option>
              <option className="text-gray-300" value="teacher">
                Teacher
              </option>
              <option className="text-gray-300" value="admin">
                Admin
              </option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl h-12 text-xs mb-3 max-w-md"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-xs mt-3 text-neutral-50">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
