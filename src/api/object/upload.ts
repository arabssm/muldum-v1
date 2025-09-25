import axiosInstance from "../../lib/axiosInatance";

export interface ImageUploadResponse {
  url: string;
  path: string;
}

export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axiosInstance.post<ImageUploadResponse>(
      '/std/upload/image', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Image upload error:", err);
    throw err;
  }
};