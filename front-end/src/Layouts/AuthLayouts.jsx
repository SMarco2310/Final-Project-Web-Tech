import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
export default function AuthLayouts() {
  const [showLoginButtons, setShowLoginButtons] = useState(false);
  const [isRegularLayout, setIsRegularLayout] = useState(false);
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header isRegularLayout={false} showLoginButtons={false} />
      <main className="flex-1 flex w-full pt-24">
        <Outlet />
      </main>
    </div>
  );
}
