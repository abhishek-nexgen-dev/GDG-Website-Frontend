import { Navigate, Outlet } from "react-router-dom";
import { useState, Suspense } from "react";

import Nav from "../Components/Nav";
import { Footer } from "../Components/Footer";
import { BackgroundWatermark } from "../Components/BackgroundWatermark";

const PublicLayout = () => {
  const [isUnderMaintenance] = useState(false);

  if (isUnderMaintenance) {
    return <Navigate to="/launching-soon" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#010101]">
      <Nav />

      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-[#010101]" />}>
          <Outlet />
        </Suspense>
      </main>

      <BackgroundWatermark />

      <Footer />
    </div>
  );
};

export default PublicLayout;
