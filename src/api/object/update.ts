import axiosInstance from "../../lib/axiosInatance";

export interface UpdateItemRequestDto {
  product_name?: string;
  quantity?: number;
  price?: string;
  productLink?: string;
  reason?: string;
}

// Update item request according to API specification
export const updateItemRequest = async (itemId: number, data: UpdateItemRequestDto) => {
  try {
    const response = await axiosInstance.patch(`std/items/${itemId}`, data);
    return response.data;
  } catch (error) {
    console.error("물품 신청 수정 실패:", error);
    throw error;
  }
};