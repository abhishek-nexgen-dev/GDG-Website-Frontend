import { Outlet } from "react-router";

import Nav from "../Components/Nav";
import { Footer } from "../Components/Footer";
import { BackgroundWatermark } from "../Components/BackgroundWatermark";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#010101] overflow-x-hidden">
      {/* Navigation */}
      <Nav />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <BackgroundWatermark />
      <Footer />
    </div>
  );
};

export default PublicLayout;
