import React from "react";
import { Route, Routes } from "react-router";
import DashboardPage from "../features/Dashboard/DashboardPage";
import AuthLayout from "../layout/AuthLayout";

const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/gdgranchi" element={<AuthLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default InternalRoutes;
