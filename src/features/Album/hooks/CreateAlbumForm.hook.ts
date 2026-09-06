import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ViewAlbum_Validator,
  type AlbumFormData,
  type AlbumFormInput,
} from "../Validator/ViewAlbum.Validator";

function useCreateAlbum() {
  return useForm<AlbumFormInput, any, AlbumFormData>({
    resolver: zodResolver(ViewAlbum_Validator),

    mode: "onTouched",

    defaultValues: {
      title: "",
      EventName: "",
      albumImageUrl: "",
      description: "",
      tags: [],
      visibility: "public",
      status: "draft",
    },
  });
}

export default useCreateAlbum;
