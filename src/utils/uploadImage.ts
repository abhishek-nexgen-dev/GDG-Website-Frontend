import axios from "axios";

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

const uploadImage = async (file: File): Promise<CloudinaryUploadResponse> => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const { data } = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Cloudinary Error:", error.response?.data);
      console.error("Status:", error.response?.status);
    }

    throw error;
  }
};

export default uploadImage;
