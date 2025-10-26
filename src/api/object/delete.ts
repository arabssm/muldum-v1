import axiosInstance from "../../lib/axiosInatance";

export const deleteTemporaryItem = async (itemId: number) => {
  try {
    const response = await axiosInstance.delete(`std/items/emp/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("임시 신청 삭제 실패:", error);
    throw error;
  }
};