import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function GalleryLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="w-full bg-gray-900/90 backdrop-blur-md border-b border-white/10 fixed top-0 z-100 p-6">
        <nav className="container mx-auto">
          <Link className="inline-block" to="/">
            <h1 className="text-2xl w-fit font-bold text-white p-0.5">
              FindMyStuff
            </h1>
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
