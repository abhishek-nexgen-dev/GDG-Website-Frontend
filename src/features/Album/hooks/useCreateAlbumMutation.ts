import { useMutation } from "@tanstack/react-query";

import type { AlbumFormData } from "../Validator/ViewAlbum.Validator";
import { createAlbum } from "../service/Album.service";

function useCreateAlbumMutation() {
  return useMutation({
    mutationFn: (data: AlbumFormData) => createAlbum(data),

    onSuccess: (data) => {
      console.log("Album created successfully:", data);
    },

    onError: (error) => {
      console.error("Failed to create album:", error);
    },
  });
}

export default useCreateAlbumMutation;
