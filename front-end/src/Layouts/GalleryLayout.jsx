import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function GalleryLayout() {
  return (
    <div>
      <header className="w-screen bg-[#101922] p-6">
        <nav className="w-fit">
          <Link className="" to="/">
            <h1 className="text-2xl w-fit font-bold text-white p-0.5">
              FindMyStuff
            </h1>
          </Link>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
