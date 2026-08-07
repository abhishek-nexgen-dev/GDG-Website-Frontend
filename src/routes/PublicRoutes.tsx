import { Route, Routes } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import HomePage from "../features/Home/v1/HomePage";
import ViewSingleEventPage from "../features/Event/Pages/ViewSingleEventPage";
import GalleryPage from "../features/Image/Pages/GalleryPage";
import ImagePage from "../features/Image/Pages/ImagePage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/events/Gallery" element={<GalleryPage />} />
        <Route path="/events/Gallery/:GalleryName" element={<ImagePage />} />
        <Route path="/event/:Slug" element={<ViewSingleEventPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
