import axiosInstance from "../../lib/axiosInatance";
import { useUserStore } from "../../atom/User";

export interface UploadResponse {
  url: string;
  path: string;
}

export const uploadTeamIconImage = async (url: string) => {
  try {
    const { user } = useUserStore.getState();
    const team_id = user?.teamId;
    
    if (team_id) {
      const res = await axiosInstance.patch(`/std/teamspace/network/team/${team_id}/icon`, {"url": url});
      alert(res.data);
    }
  } catch (error) {
    throw error;
  }
};

export const uploadTeamBannerImage = async (url: string) => {
  try {
    const { user } = useUserStore.getState();
    const team_id = user?.teamId;
    
    if (team_id) {
      const res = await axiosInstance.patch(`/std/teamspace/network/team/${team_id}/banner`, {"url": url});
      alert(res.data);
    }
  } catch (error) {
    throw error;
  }
};