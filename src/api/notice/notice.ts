import axiosInstance from "../../lib/axiosInatance";
import axios from 'axios';
export default async function getNoticeAra() {
  const res = await axiosInstance.get(`ara/notice`);
  return res.status === 200 ? res.data : res.status;
}

export async function getNoticeDetail(id: number) {
  const res = await axiosInstance.get(`ara/notice/${id}`);
  return res.status === 200 ? res.data : res.status;
}

export async function getNotice(page: number) {
  const res = await axiosInstance.get(`ara/notice?page=${page - 1}`);
  return res.status === 200 ? res.data : res.status;
}

export async function deleteNotice(id: number) {
  const res = await axiosInstance.delete(`/tch/notice/${id}`);
  return res.status === 200 ? res.data : res.status;
}



export async function saveFile(file: File) {
  const res = await axiosInstance.get(`/files/presigned?fileName=${file.name}`);
  if (res.status !== 200) throw new Error(`URL 발급 실패 (status: ${res.status})`);

  const presignedUrl = res.data; 
  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error(`업로드 실패 (status: ${uploadRes.status})`);
  }

  return presignedUrl.split("?")[0];
}


export type FilePayload = { url: string };
export type NoticeFile = { url: string };

type CreateNoticeBase = {
  title: string;
  content: string;
  files: NoticeFile[];
  deadlineDate: string;
};

type CreateNoticeBaseno = {
  title: string;
  content: string;
  deadlineDate: string;
};
type CreateGeneralNotice = CreateNoticeBase;
type CreateGeneralNoticeno = CreateNoticeBaseno;
type UpdateNotice = Partial<CreateGeneralNotice>;

export async function createNoticeGeneral(
  title: string,
  content: string,
  files: FilePayload[],
  deadlineDate: string
) {
  const payload: CreateGeneralNotice = { title, content, files, deadlineDate };
  const res = await axiosInstance.post("/tch/notice", payload);
  if (!(res.status >= 200 && res.status < 300)) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}
export async function createNoticeGeneralno(
  title: string,
  content: string,
  deadlineDate: string
) {
  const payload: CreateGeneralNoticeno = { title, content, deadlineDate };
  const res = await axiosInstance.post("/tch/notice", payload);
  if (!(res.status >= 200 && res.status < 300)) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}
export async function updateNotice(id: number, patch: UpdateNotice) {
  const res = await axiosInstance.patch(`/tch/notice/${id}`, patch);
  if (!(res.status >= 200 && res.status < 300)) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}


