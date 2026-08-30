


import api from "../../../utils/axios.utils";
import type { AlbumFormData } from "../Validator/ViewAlbum.Validator";

export const createAlbum = async (data: AlbumFormData) => {
  const response = await api.post(
    "/api/v1/create/newGallery",
    {
      ...data,
      imageCount: 0,
      isDeleted: false,
    }
  );

  return response.data;
};