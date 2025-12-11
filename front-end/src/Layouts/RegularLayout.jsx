import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Header from "../components/Header";
export default function RegularLayout() {
  const [isRegularLayout, setIsRegularLayout] = useState(false);
  const [showLoginButtons, setShowLoginButtons] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header isRegularLayout={true} showLoginButtons={showLoginButtons} />
      <main className="flex-1 w-full pt-23">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
