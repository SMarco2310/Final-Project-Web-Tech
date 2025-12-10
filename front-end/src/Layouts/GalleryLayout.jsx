import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
export default function GalleryLayout() {
  const [showLoginButtons, setShowLoginButtons] = useState(false);
  const [isRegularLayout, setIsRegularLayout] = useState(false);
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header isRegularLayout={false} showLoginButtons={false} />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
