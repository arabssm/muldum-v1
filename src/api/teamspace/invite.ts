import axiosInstance from "../../lib/axiosInatance";


export default async function TeacherInvite(url: string) {
  try {
    const res = await axiosInstance.post('/tch/student/invite', {
      googleSheetUrl: url,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function StudentTeamIdInvite(url: string) {
  try {
    const res = await axiosInstance.post('/tch/teamspace/invite', {
      googleSheetUrl: url,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

