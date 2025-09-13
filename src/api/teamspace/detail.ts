import axiosInstance from "../../lib/axiosInatance";


export interface TeamConfig {
  theme: string | null;
  notificationsEnabled: boolean;
  language: string | null;
  maxMembers: number;
  backgroundImageUrl: string | null;
  backgroundImagePath: string | null;
  iconImageUrl: string | null;
}

export interface TeamDetail {
  teamId: number;
  teamName: string;
  content: string | null;
  config: TeamConfig;
}

export const fetchTeamDetail = async (teamId: number): Promise<TeamDetail> => {
  const res = await axiosInstance.get<TeamDetail>(`/ara/teamspace/network/team/${teamId}`);
  return res.data;
};
2