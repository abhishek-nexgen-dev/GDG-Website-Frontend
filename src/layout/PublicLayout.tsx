
import { Outlet } from "react-router";
import Nav from "../Components/Nav";

// for all user it just a template
const PublicLayout = () => {
  return (
    <div className="bg-[#010101] w-full flex flex-col overflow-x-hidden">
      {/* Include Nav */}
      <Nav />

      <Outlet />

      {/* Include Footer */}
    </div>
  );
};

export default PublicLayout;
