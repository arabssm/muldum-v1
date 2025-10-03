import { fetchTeams } from "../../../../api/teamspace/see";

export const getClubs = async () => {
  try {
    const teams = await fetchTeams();
    return teams.map(team => ({
      id: team.teamId,
      name: team.teamName
    }));
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return []; 
  }
};

export default getClubs;