import axiosInstance from "../../lib/axiosInatance";

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