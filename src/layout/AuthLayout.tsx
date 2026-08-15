import { Outlet } from "react-router";
import InternalNav from "./InternalNav";
import InternalSideBar from "./Components/InternalSideBar";

// for Authenticated User
const AuthLayout = () => {
  return (
    <div className="w-screen flex flex-col">
      <InternalNav />
      <div className="flex gap-4">
        <InternalSideBar isOpenMenu={false} />

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
