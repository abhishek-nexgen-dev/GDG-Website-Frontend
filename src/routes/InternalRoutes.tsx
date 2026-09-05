import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../features/Dashboard/DashboardPage";
import AuthLayout from "../layout/AuthLayout";
import MembersDashboardPage from "../features/Member/v1/Pages/MembersDashboardPage";
import CreateNewMember from "../features/Member/v1/Pages/CreateNewMember";
import ManageEvent from "../features/Event/Pages/ManageEvent";
import CreateEvent from "../features/Event/Pages/CreateEvent";
import ManageAlbumsPage from "../features/Album/Pages/ManageAlbumsPage";
import CreateAlbumPage from "../features/Album/Pages/CreateAlbumPage";
import ManageImagesPage from "../features/Image/Pages/ManageImagesPage";
import UploadImagesPage from "../features/Image/Pages/UploadImagesPage";
import SendBulkEmailPage from "../features/Email/Pages/SendEmailPage";
import MemberDetails from "../features/Member/v1/Pages/MemberDetails";
import Settings from "../features/Settings/Settings";
import MemberViewEvent from "../features/Event/Pages/MemberViewEvent";

const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/member" element={<AuthLayout />}>
        <Route index element={<Navigate to="/member/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="members" element={<MembersDashboardPage />} />
        <Route path="create" element={<CreateNewMember />} />
        <Route path="profile/:id" element={<MemberDetails />} />
        <Route path="events" element={<ManageEvent />} />
        <Route path="event/view/:Slug" element={<MemberViewEvent />} />
        <Route path="events/create" element={<CreateEvent />} />

        <Route path="event" element={<ManageEvent />} />
        <Route path="albums" element={<ManageAlbumsPage />} />
        <Route path="albums/manage" element={<ManageAlbumsPage />} />
        <Route path="albums/create" element={<CreateAlbumPage />} />
        <Route path="album" element={<ManageAlbumsPage />} />
        <Route path="images" element={<ManageImagesPage />} />
        <Route path="images/manage" element={<ManageImagesPage />} />
        <Route path="images/upload" element={<UploadImagesPage />} />
        <Route path="image" element={<ManageImagesPage />} />
        <Route path="emails/send" element={<SendBulkEmailPage />} />
        <Route path="Settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default InternalRoutes;
