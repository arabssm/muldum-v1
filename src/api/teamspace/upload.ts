import axiosInstance from "../../lib/axiosInatance";

export interface UploadResponse {
  url: string;
  path: string;
}

export const uploadTeamIconImage = async (url :string) => {
  const userStore = localStorage.getItem('user-store');
  const team_id = userStore ? JSON.parse(userStore).state.user.teamId : null;
  if(team_id){
    axiosInstance.patch(`/std/teamspace/network/team/${team_id}/icon`,{"url":url})
  }
};

export const uploadTeamBannerImage = async (url :string) => {
  const userStore = localStorage.getItem('user-store');
  const team_id = userStore ? JSON.parse(userStore).state.user.teamId : null;
  if(team_id){
    const res=axiosInstance.patch(`/std/teamspace/network/team/${team_id}/banner`,{"url":url})
    alert((await res).data)
  }
};