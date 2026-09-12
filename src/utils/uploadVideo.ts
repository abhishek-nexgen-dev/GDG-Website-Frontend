import axios from "axios";

export interface CloudinaryVideoResponse {
  secure_url: string;
  public_id: string;
  duration?: number;
  width?: number;
  height?: number;
  format?: string;
}

const uploadVideo = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<CloudinaryVideoResponse> => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_VIDEO_UPLOAD_PRESET ||
      import.meta.env.CLOUDINARY_VIDEO_UPLOAD_PRESET ||
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
      "";
    formData.append("upload_preset", uploadPreset);

    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
      import.meta.env.CLOUDINARY_CLOUD_NAME ||
      "";

    const { data } = await axios.post<CloudinaryVideoResponse>(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          if (!event.total) return;

          const progress = Math.round((event.loaded * 100) / event.total);

          onProgress?.(progress);
        },
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Cloudinary Video Error:", error.response?.data);
    }

    throw error;
  }
};

export default uploadVideo;
