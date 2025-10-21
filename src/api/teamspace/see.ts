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

export const fetchTeams = async (classNumber?: number): Promise<Teamtype[]> => {
  const params = classNumber ? { class: classNumber } : {};
  const res = await axiosInstance.get<{ teams: Teamtype[] }>("/ara/teamspace/network", { params });
  return res.data.teams;
};



