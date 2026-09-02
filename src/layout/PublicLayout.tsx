import { Navigate, Outlet } from "react-router-dom";

import Nav from "../Components/Nav";
import { Footer } from "../Components/Footer";
import { BackgroundWatermark } from "../Components/BackgroundWatermark";
import { useState } from "react";

const PublicLayout = () => {
  const [isUnderMaintenance] = useState(true);

  if (isUnderMaintenance) {
    return <Navigate to="/launching-soon" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#010101]">
      <Nav />

      <main className="flex-1">
        <Outlet />
      </main>

      <BackgroundWatermark />

      <Footer />
    </div>
  );
};

export default PublicLayout;
