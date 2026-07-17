import React from "react";
import { Route, Routes } from "react-router";
import DashboardPage from "../features/Dashboard/DashboardPage";
import AuthLayout from "../layout/AuthLayout";
import CreateNewMember from "../features/Member/v1/Pages/CreateNewMember";

const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/gdgranchi" element={<AuthLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="create/new/Member" element={<CreateNewMember />} />
      </Route>
    </Routes>
  );
};

export default InternalRoutes;
