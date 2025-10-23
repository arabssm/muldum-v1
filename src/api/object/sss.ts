import axiosInstance from "../../lib/axiosInatance";
export default async function Get(url: string) {
    try {
      const res = await axiosInstance.post(`/std/items/preview`,{
        "productLink": url
      });
      if (res.status !== 200) {
        return res.status;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  }