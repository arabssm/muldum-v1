import axiosInstance from "../../lib/axiosInatance";
import { useUserStore } from "../../atom/User";

export default async function TeacherInvite(content: string) {
  try {
    const { user } = useUserStore.getState();
    const team_id = user?.teamId;

    if (!team_id) {
      throw new Error('team_id를 찾을 수 없습니다.');
    }

    const res = await axiosInstance.patch(`/std/teamspace/network/team/${team_id}`, {
      "content": content
    });
    return res.data;
  } catch (err) {
    console.error("TeacherInvite error:", err);
    throw err;
  }
}
