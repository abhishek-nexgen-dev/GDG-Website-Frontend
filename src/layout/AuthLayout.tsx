
import { Outlet } from "react-router";

// for Authenticated User
const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
