import axiosInstance from "../../lib/axiosInatance";

export default async function Apply(
  name1: string, 
  number: number, 
  price: string, 
  link: string, 
  reason: string,
  deliveryPrice?: string,
  deliveryTime?: string
) {
  try {
    const res = await axiosInstance.post(`/std/items/temp`, {
      "product_name": name1,
      "quantity": number,
      "price": price,
      "productLink": link,
      "reason": reason,
      "deliveryPrice": deliveryPrice,
      "deliveryTime": deliveryTime
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
    const res = await axiosInstance.patch(`/tch/items/submit`, items);
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
    const res = await axiosInstance.patch(`/tch/items/reject`, items);
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

export async function tchitemAllRejected() {
  try {
    const res = await axiosInstance.get(`/tch/items/rejected`);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function Getxlsx(nth?: number) {
  try {
    const url = nth ? `/tch/items/xlsx?nth=${nth}` : '/tch/items/xlsx';
    const res = await axiosInstance.get(url, {
      responseType: 'blob'
    });
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function openNthApplication(nth: number, payload?: any) {
  try {
    const res = await axiosInstance.post(`/tch/items/open?nth=${nth}`, payload);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getRejectTemplates() {
  try {
    const res = await axiosInstance.get('/tch/items/reject-templates');
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function saveRejectTemplates(templates: string[]) {
  try {
    // 템플릿을 content 필드로 변환
    const payload = templates.map(content => ({ content }));
    const res = await axiosInstance.post('/tch/items/reject-templates', payload);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteRejectTemplate(templateId: number) {
  try {
    const res = await axiosInstance.delete(`/tch/items/reject-templates/${templateId}`);
    if (res.status !== 204 && res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getOpenStatus() {
  try {
    const res = await axiosInstance.get('/std/items/open-status');
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getTchOpenStatus() {
  try {
    const res = await axiosInstance.get('/tch/items/open-status');
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getOpenHistory() {
  try {
    const res = await axiosInstance.get('/tch/items/open-history');
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getOpenCount() {
  try {
    const res = await axiosInstance.get('/tch/items/open-count');
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getOpenNths() {
  try {
    const res = await axiosInstance.get('/tch/items/open-nths');
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

// nth별 필터링 함수들
export async function tchitemAllByNth(nth?: number) {
  try {
    const url = nth ? `/tch/items?nth=${nth}` : '/tch/items';
    const res = await axiosInstance.get(url);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function tchitemAllApprovedByNth(nth?: number) {
  try {
    const url = nth ? `/tch/items/approved?nth=${nth}` : '/tch/items/approved';
    const res = await axiosInstance.get(url);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function tchitemAllRejectedByNth(nth?: number) {
  try {
    const url = nth ? `/tch/items/rejected?nth=${nth}` : '/tch/items/rejected';
    const res = await axiosInstance.get(url);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function tchitemByNth(teamid: string, nth?: number) {
  try {
    const url = nth ? `/tch/items/${teamid}/not-approved?nth=${nth}` : `/tch/items/${teamid}/not-approved`;
    const res = await axiosInstance.get(url);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function tchitemApprovedByNth(teamid: string, nth?: number) {
  try {
    const url = nth ? `/tch/items/${teamid}/approved?nth=${nth}` : `/tch/items/${teamid}/approved`;
    const res = await axiosInstance.get(url);
    if (res.status !== 200) {
      return res.status;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
}
