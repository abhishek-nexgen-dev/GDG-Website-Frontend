import React from "react";
import { Outlet } from "react-router";

// for all user it just a template
const PublicLayout = () => {
  return (
    <div>
      {/* Include Nav */}

      <Outlet />

      {/* Include Footer */}
    </div>
  );
};

export default PublicLayout;
