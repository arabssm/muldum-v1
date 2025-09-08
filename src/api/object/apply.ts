import axiosInstance from "../../lib/axiosInatance";


export default async function Apply(name1,number,price,link,reason) {
   console.log(name1);
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
      console.log(err);
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
      console.log(err);
      throw err;
    }
  }
  export async function getallApply() {
    try {
      const res = await axiosInstance.get(`/std/items`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      throw err;
    }
  }
  export async function tchitem(teamid) {
    try {
      const res = await axiosInstance.get(`/tch/items/${teamid}`);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  export async function submititem(items) {
    try {
      const res = await axiosInstance.patch(`/tch/items/submit`,items);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  export async function nosubmititem(items) {
    try {
      const res = await axiosInstance.patch(`/tch/items/reject`,items);
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }