import axiosInstance from "../../lib/axiosInatance";

export interface Member {
  userId: number;
  userName: string;
}

export interface Teamtype {
  teamId: number;
  teamName: string;
  members: Member[];
}

export const fetchTeams = async (): Promise<Teamtype[]> => {
  const res = await axiosInstance.get<{ teams: Teamtype[] }>("/ara/teamspace/network");
  return res.data.teams;
};



