import axiosInstance from "../../lib/axiosInatance";

export default async function TeacherInvite(content: string) {
  const userStore = localStorage.getItem('user-store');
  const team_id = userStore ? JSON.parse(userStore).state.user.teamId : null;

  if (!team_id) {
    throw new Error('team_id를 찾을 수 없습니다.');
  }

  try {
    const res = await axiosInstance.patch(`/std/teamspace/network/team/${team_id}`, {
      "content": content
    });
    return res.data;
  } catch (err) {
    console.error("TeacherInvite error:", err);
    throw err;
  }
}
