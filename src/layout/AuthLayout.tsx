import { Outlet } from "react-router";
import InternalNav from "./InternalNav";
import InternalSideBar from "./Components/InternalSideBar";

// for Authenticated User
const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0b0c0e]">
      <InternalNav />
      <div className="flex flex-1 w-full relative">
        <InternalSideBar />
        <main className="flex-1 min-w-0 w-full lg:ml-[274px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;



