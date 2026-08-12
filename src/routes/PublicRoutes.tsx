import { Route, Routes } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import HomePage from "../features/Home/v1/HomePage";
import ViewSingleEventPage from "../features/Event/Pages/ViewSingleEventPage";
import GalleryPage from "../features/Image/Pages/GalleryPage";
import ImagePage from "../features/Image/Pages/ImagePage";
import ViewAllTeamPage from "../features/Member/v1/Pages/ViewAllTeamPage";
import LoginPage from "../features/Auth/v1/Page/LoginPage";
import ForgotPasswordOtp from "../features/Auth/v1/Page/ForgotPasswordOtp";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/events/Gallery" element={<GalleryPage />} />
        <Route path="/events/Gallery/:GalleryName" element={<ImagePage />} />
        <Route path="/event/:Slug" element={<ViewSingleEventPage />} />
        <Route path="/teams" element={<ViewAllTeamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPasswordOtp />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
