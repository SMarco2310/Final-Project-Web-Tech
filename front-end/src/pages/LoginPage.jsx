import { Link } from "react-router-dom";
import { useState } from "react";
export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [mobileView, setMobileView] = useState(false);

  return (
    <div className="flex flex-1/2">
      <div className="flex-1 w-lg h-full m-2 ml-6 mr-6 mt-50">
        <img
          src="login_image.png"
          alt="Background Image"
          height="200px"
          className="w- h-full rounded-4xl "
        />
      </div>
      <div className=" flex-1 max-w-xl h-full m-11 p-6 mt-50">
        <h2 className="text-3xl font-bold pb-1.5 text-neutral-50">
          Welcome Back!
        </h2>
        <p className="mb-6 text-xs text-neutral-50">
          Find what you've lost, return what you've found
        </p>

        <form className="flex flex-col">
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
              placeholder="Enter your email"
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
          <p className="text-blue-500 hover:text-blue-700 text-right mb-3 text-xs mr-3 max-w-md">
            Forgot Password?
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl h-12 text-xs mb-3 max-w-md"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-xs mt-3 text-neutral-50">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
