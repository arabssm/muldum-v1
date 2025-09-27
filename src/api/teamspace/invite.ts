import axiosInstance from "../../lib/axiosInatance";


export default async function TeacherInvite(url: string) {
  try {
    const res = await axiosInstance.post('/tch/student/invite', {
      googleSheetUrl: url,
    });
    return res.data;
  } catch (err) {
    console.error("TeacherInvite error:", err);
    throw err;
  }
}

export async function StudentTeamIdInvite(url: string) {
  try {
    const res = await axiosInstance.post('/tch/team/invite', {
      googleSheetUrl: url,
    });
    return res.data;
  } catch (err) {
    console.error("StudentTeamIdInvite error:", err);
    throw err;
  }
}

