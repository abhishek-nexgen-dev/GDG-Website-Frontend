import { Route, Routes } from "react-router";
import DashboardPage from "../features/Dashboard/DashboardPage";
import AuthLayout from "../layout/AuthLayout";
import CreateNewMember from "../features/Member/v1/Pages/CreateNewMember";

const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/member" element={<AuthLayout />}>
        <Route index path="dashboard" element={<DashboardPage />} />
        <Route path="create/new/Member" element={<CreateNewMember />} />
      </Route>
    </Routes>
  );
};

export default InternalRoutes;
