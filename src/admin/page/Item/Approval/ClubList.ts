import axiosInstance from "../../../../lib/axiosInatance";

export interface Member {
  userId: number;
  userName: string;
}

export interface TeamWithItems {
  teamId: number;
  teamName: string;
  members: Member[];
  hasNewItems: boolean;
}

export const getClubs = async () => {
  try {
    const res = await axiosInstance.get("/tch/teamspace/network/item");
    let teams: TeamWithItems[] = [];

    if (Array.isArray(res.data)) {
      teams = res.data;
    } else if (res.data && typeof res.data === 'object') {
      if (res.data.teams && Array.isArray(res.data.teams)) {
        teams = res.data.teams;
      } else {
        teams = [res.data];
      }
    } else {
      console.error(res.data);
      return [];
    }

    return teams.map(team => ({
      id: team.teamId,
      name: team.teamName,
      members: team.members || [],
      hasNewItems: team.hasNewItems || false
    }));
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return [];
  }
};

export default getClubs;