import { Outlet } from "react-router";
import InternalNav from "./InternalNav";
import InternalSideBar from "./Components/InternalSideBar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#0b0c0e]">
      <InternalNav />

      <div className="relative flex min-h-[calc(100vh-56px)] w-full">
        <InternalSideBar />

        <main className="min-w-0 flex-1 lg:ml-[274px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
