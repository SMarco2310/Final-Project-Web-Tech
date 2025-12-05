import { Outlet, Link } from "react-router-dom";

export default function AuthLayouts() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-white/10 fixed top-0 z-100 p-6">
        <nav className="container mx-auto">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-white p-0.5">FindMyStuff</h1>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex w-full pt-24">
        <Outlet />
      </main>
    </div>
  );
}
