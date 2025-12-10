import { Link } from "react-router-dom";

export default function Header({ isRegularLayout, showLoginButtons }) {
    return (
       <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-white/10 fixed top-0 z-100 p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <Link className="inline-block" to="/">
            <h1 className="text-2xl w-fit font-bold text-white p-0.5 items-left">
              FindMyStuff
            </h1>
          </Link>
          {isRegularLayout ? (
            <div className="flex items-center gap-2">
              {/* // user Profile*/}
            </div>
          ) : showLoginButtons ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-white hover:text-gray-300">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl">
                  Login
                </button>
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : null}
        </nav>
      </header>
    );
}