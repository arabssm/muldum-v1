import axiosInstance from "../../lib/axiosInatance";

// TypeScript interfaces for API requests and responses
export interface TempItemRequestDto {
  product_name?: string;
  quantity?: number;
  price?: string;
  productLink?: string;
  reason?: string;
}

export interface UpdateResponse {
  status: string;
  message: string;
}

export interface ErrorResponse {
  status: 'REJECTED';
  message: string;
}

export default async function Apply(name1: string, number: number, price: string, link: string, reason: string) {
    try {
      const res = await axiosInstance.post(`/std/items/temp`,{
        "product_name":name1,
        "quantity":number,
        "price":price,
        "productLink":link,
        "reason":reason
      });
  
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  export async function getApply() {
    try {
      const res = await axiosInstance.get(`/std/items/temp`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  export async function getallApply() {
    try {
      const res = await axiosInstance.get(`/std/items/temp`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      alert(err);
      throw err;
    }
  }
  export async function getApplyall() {
    try {
      const res = await axiosInstance.get(`/std/items`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  export async function getMoney() {
    try {
      const res = await axiosInstance.get(`/std/items/money`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }
export async function finalapply() {
    try {
      const res = await axiosInstance.patch(`/std/items`);
      if (res.status !== 200) {
        return res.status;
      }
    } catch (err) {
      throw err;
    }
  }
  export async function tchitem(teamid: string) {
    try {
      const res = await axiosInstance.get(`/tch/items/${teamid}/not-approved`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  export async function tchitem111(teamid: string) {
    try {
      const res = await axiosInstance.get(`/tch/items/${teamid}/approved`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  export async function submititem(items: any) {
    try {
      const res = await axiosInstance.patch(`/tch/items/submit`,items);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  export async function nosubmititem(items: any) {
    try {
      const res = await axiosInstance.patch(`/tch/items/reject`,items);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  export async function tchitemAll() {
    try {
      const res = await axiosInstance.get(`/tch/items`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  export async function tchitemAllApproved() {
    try {
      const res = await axiosInstance.get(`/tch/items/approved`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  export async function Getxlsx() {
    try{
      const res=await axiosInstance.get('/tch/items/xlsx', {
        responseType: 'blob'
      });
      if(res.status !== 200){
        return res.status;
      }
      return res.data;
    }catch(err){
        throw err;
      }
  }

// Update item request - PATCH /std/items/{item_id}
export async function updateItem(itemId: number, updateData: TempItemRequestDto): Promise<UpdateResponse> {
  try {
    const res = await axiosInstance.patch(`/std/items/${itemId}`, updateData);
    
    if (res.status !== 200) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    return res.data;
  } catch (err: any) {
    // Handle different error types based on HTTP status codes
    if (err.response) {
      const status = err.response.status;
      const errorData = err.response.data;
      
      switch (status) {
        case 400:
          // Bad Request - validation errors
          throw new Error(errorData.message || '유효하지 않은 요청입니다.');
        case 401:
          // Unauthorized
          throw new Error('인증이 필요합니다.');
        case 403:
          // Forbidden
          throw new Error('권한이 없습니다.');
        case 404:
          // Not Found
          throw new Error('물품 신청을 찾을 수 없습니다.');
        default:
          throw new Error(errorData.message || '물품 수정에 실패했습니다.');
      }
    }
    
    // Network or other errors
    throw new Error('네트워크 오류가 발생했습니다.');
  }
}

// Delete item request - DELETE /std/items/{item_id}
export async function deleteItem(itemId: number): Promise<UpdateResponse> {
  try {
    const res = await axiosInstance.delete(`/std/items/${itemId}`);
    
    if (res.status !== 200) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    return res.data;
  } catch (err: any) {
    // Handle different error types based on HTTP status codes
    if (err.response) {
      const status = err.response.status;
      const errorData = err.response.data;
      
      switch (status) {
        case 400:
          // Bad Request - item not in deletable state
          throw new Error(errorData.message || '삭제할 수 없는 상태입니다.');
        case 401:
          // Unauthorized
          throw new Error('인증이 필요합니다.');
        case 403:
          // Forbidden
          throw new Error('권한이 없습니다.');
        case 404:
          // Not Found
          throw new Error('물품 신청을 찾을 수 없습니다.');
        default:
          throw new Error(errorData.message || '물품 삭제에 실패했습니다.');
      }
    }
    
    // Network or other errors
    throw new Error('네트워크 오류가 발생했습니다.');
  }
}
