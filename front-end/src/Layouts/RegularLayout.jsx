import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
export default function RegularLayout() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-white/10 fixed top-0 z-100 p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <Link className="inline-block" to="/">
            <h1 className="text-2xl w-fit font-bold text-white p-0.5 items-center">
              FindMyStuff
            </h1>
          </Link>
          {isLogin ? (
            <div className="flex items-center gap-2">
              {/* // user Profile*/}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-white hover:text-gray-300">
                <button className="bg-blue-500/80 text-white px-4 py-2 rounded-2xl">
                  Login
                </button>
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                <button className="bg-blue-500/80 text-white px-4 py-2 rounded-2xl">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-1 w-full pt-23">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
