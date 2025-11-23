import { Outlet, Link } from "react-router-dom";

export default function AuthLayouts() {
  return (
    <div>
      <header className="w-screen bg-[#101922] p-6">
        <nav className="">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white p-0.5">FindMyStuff</h1>
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
