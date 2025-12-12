import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Header({ isRegularLayout, showLoginButtons, toggleSidebar }) {
  return (
    <header className="w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 fixed top-0 z-50 p-6">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {!isRegularLayout && (
            <button
              onClick={toggleSidebar}
              className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          )}
          <Link className="inline-block" to="/">
            <h1 className="text-2xl w-fit font-bold text-white p-0.5 items-left">
              FindMyStuff
            </h1>
          </Link>
        </div>
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