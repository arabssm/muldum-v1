import axiosInstance from "../../lib/axiosInatance";

export default async function getNoticeAra() {
  const res = await axiosInstance.get(`ara/notice`);
  return res.status === 200 ? res.data : res.status;
}

export async function getNoticeDetail(id: number) {
  const res = await axiosInstance.get(`ara/notice/${id}`);
  return res.status === 200 ? res.data : res.status;
}

export async function getNotice(page: number) {
  const res = await axiosInstance.get(`tch/notice?page=${page - 1}`);
  return res.status === 200 ? res.data : res.status;
}

export async function deleteNotice(id: number) {
  const res = await axiosInstance.delete(`/tch/notice/${id}`);
  return res.status === 200 ? res.data : res.status;
}

export async function saveFile(file: File) {
  const formData = new FormData();
  formData.append("files", file);
  const res = await axiosInstance.post("/ara/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (res.status !== 200) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}

export type FilePayload = { url: string };
export type NoticeFile = { url: string };
export type NoticeStatus = "GENERAL" | "TEAM";

type CreateNoticeBase = {
  title: string;
  content: string;
  files: NoticeFile[];
  deadlineDate: string;
};

type CreateGeneralNotice = CreateNoticeBase & { status: "GENERAL" };
type CreateTeamNotice = CreateNoticeBase & { status: "TEAM"; teamIds: number[] };
type UpdateNotice = Partial<CreateGeneralNotice & CreateTeamNotice>;

export async function createNoticeGeneral(
  title: string,
  content: string,
  files: FilePayload[],
  deadlineDate: string
) {
  const payload: CreateGeneralNotice = { title, content, files, deadlineDate, status: "GENERAL" };
  const res = await axiosInstance.post("/tch/notice", payload);
  if (!(res.status >= 200 && res.status < 300)) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}

export async function createNoticeTeam(
  title: string,
  content: string,
  files: FilePayload[],
  teamIds: number[],
  deadlineDate: string
) {
  const payload: CreateTeamNotice = { title, content, files, deadlineDate, status: "TEAM", teamIds };
  const res = await axiosInstance.post("/tch/notice", payload);
  if (!(res.status >= 200 && res.status < 300)) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}

// 공용 수정 함수
export async function updateNotice(id: number, patch: UpdateNotice) {
  const res = await axiosInstance.patch(`/tch/notice/${id}`, patch);
  if (!(res.status >= 200 && res.status < 300)) throw new Error(`업로드 실패 (status: ${res.status})`);
  return res.data;
}
