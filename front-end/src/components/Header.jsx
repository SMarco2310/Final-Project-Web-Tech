import { Link } from "react-router-dom";
import { Menu, User, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Header({ isRegularLayout, showLoginButtons, toggleSidebar, showMenu = true }) {
  const { user } = useAuth();

  return (
    <header className="w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 fixed top-0 z-50 p-6">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {!isRegularLayout && showMenu && (
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
            {user ? (
              <>
                <Link to="/Report" className="text-white w-10 h-10  border-2 border-white rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-blue-900/20 mr-2" title="Report Item">
                  <Plus size={24} />
                </Link>
                <Link to={`/dashboard/${user.id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  {user.image ? (
                    <img src={user.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBOtobM1j3ECr0pN0ZWg8LNDdi7YBTXWO8infmDL937kAZZXI4rQ8Mg2JiZrKVYjL81ci5lGrHICuH7AIXNU1t7kqae8eM1CKPdRee_38kFEA0WuPK5QXgN2WCb7H4kUG_r2Episs7h0D98YdIkSW1Z6wzZlPPGgSPIqSd5sS4SVBoPoG0dq-ngpzHBAf3PLciKAIREqR4pMXCCEIzFmNdEpgHVN9EGMhyRyqTBj4Sa8uYhXfK5JH_u49IFeR-0Q6Q6HZFu6vl5eAk"} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-600" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                      <User className="text-slate-300" size={20} />
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/Login" className="text-white hover:text-gray-300">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/Register" className="text-white hover:text-gray-300">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : showLoginButtons ? (
          <div className="flex items-center gap-2">
            <Link to="/Login" className="text-white hover:text-gray-300">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl">
                Login
              </button>
            </Link>
            <Link to="/Register" className="text-white hover:text-gray-300">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl">
                Sign Up
              </button>
            </Link>
          </div>
        ) : null}
      </nav>
    </header >
  );
}