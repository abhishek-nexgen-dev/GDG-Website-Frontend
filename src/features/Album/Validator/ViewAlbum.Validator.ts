// src/Validator/ViewAlbum.Validator.ts

import { z } from "zod";

export const ViewAlbum_Validator = z.object({
  title: z.string().min(1, "Album title is required"),

  EventName: z.string().min(1, "Event name is required"),

  albumImageUrl: z.string().min(1, "Album image is required").url("Please enter a valid image URL"),

  description: z.string().min(1, "Description is required"),

  tags: z.array(z.string()).min(1, "At least one tag is required"),

  visibility: z.enum(["public", "private"]),

  status: z.enum(["draft", "published"]),
});

export type AlbumFormInput = z.input<typeof ViewAlbum_Validator>;
export type AlbumFormData = z.output<typeof ViewAlbum_Validator>;
