import { Route, Routes, Navigate } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import HomePage from "../features/Home/v1/HomePage";
import GalleryPage from "../features/Image/Pages/GalleryPage";
import ImagePage from "../features/Image/Pages/ImagePage";
import ViewAllTeamPage from "../features/Member/v1/Pages/ViewAllTeamPage";
import LoginPage from "../features/Auth/v1/Page/LoginPage";
import ForgotPasswordOtp from "../features/Auth/v1/Page/ForgotPasswordOtp";
import MaintenancePage from "../features/Maintenance/MaintenancePage";
import EventDetailPage from "../features/Event/Pages/EventDetailPage";
import LaunchingSoon from "../features/Pages/LaunchingSoon";
import ComingSoon from "../features/Pages/ComingSoon";
import Events from "../features/Event/Pages/Events";

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
import MemberDetails from "../features/Member/v1/Pages/MemberDetails";
import Settings from "../features/Settings/Settings";
import MemberViewEvent from "../features/Event/Pages/MemberViewEvent";
import MemberViewSingleAlbum from "../features/Album/Pages/MemberViewSingleAlbum";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/Gallery" element={<GalleryPage />} />
        <Route path="/events/gallery" element={<GalleryPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/Gallery/:GalleryName" element={<ImagePage />} />
        <Route path="/gallery/:GalleryName" element={<ImagePage />} />
        <Route path="/event/:Slug" element={<EventDetailPage />} />
        <Route path="/teams" element={<ViewAllTeamPage />} />
        <Route path="/team" element={<ViewAllTeamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPasswordOtp />} />
      </Route>
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/launching-soon" element={<LaunchingSoon />} />
      <Route path="/coming-soon" element={<ComingSoon />} />

      <Route path="/member" element={<AuthLayout />}>
        <Route index element={<Navigate to="/member/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="Dashboard" element={<DashboardPage />} />
        <Route path="members" element={<MembersDashboardPage />} />
        <Route path="create" element={<CreateNewMember />} />
        <Route path="profile" element={<MemberDetails />} />
        <Route path="Profile" element={<MemberDetails />} />
        <Route path="profile/:id" element={<MemberDetails />} />
        <Route path="events" element={<ManageEvent />} />
        <Route path="event/view/:Slug" element={<MemberViewEvent />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="event" element={<ManageEvent />} />
        <Route path="albums" element={<ManageAlbumsPage />} />
        <Route path="albums/manage" element={<ManageAlbumsPage />} />
        <Route path="albums/create" element={<CreateAlbumPage />} />
        <Route path="album/view" element={<MemberViewSingleAlbum />} />
        <Route path="album" element={<ManageAlbumsPage />} />
        <Route path="images" element={<ManageImagesPage />} />
        <Route path="images/manage" element={<ManageImagesPage />} />
        <Route path="images/upload" element={<UploadImagesPage />} />
        <Route path="image" element={<ManageImagesPage />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
