import React from "react";
import { Route, Routes } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import HomePage from "../features/Home/v1/HomePage";
import ViewSingleEventPage from "../features/Event/Pages/ViewSingleEventPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/event/:Slug" element={<ViewSingleEventPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
