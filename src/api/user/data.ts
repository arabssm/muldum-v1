import axiosInstance from "../../lib/axiosInatance";
import { useUserStore } from "../../atom/User";

const extractTeamId = (profile: string | object | null | undefined): number | null => {
  if (!profile) return null;

  if (typeof profile === "string") {
    const match = profile.match(/team[_\s]?id\s*=\s*(\d+)/i);
    if (match) return Number(match[1]);

    try {
      const jsonish = profile
        .replace(/([a-zA-Z_]+)\s*=/g, '"$1":') 
        .replace(/'/g, '"');
      const obj = JSON.parse(jsonish);
      return obj.team_id ? Number(obj.team_id) : null;
    } catch {
      return null;
    }
  }

  if (typeof profile === "object" && (profile as any).team_id) {
    return Number((profile as any).team_id);
  }

  return null;
};

export const GetUser = async () => {
  const setUser = useUserStore.getState().setUser; 

  const { data } = await axiosInstance.get("/user/me");

  const user = {
    userId: data.userId ?? data.id,
    name: data.name,
    role: data.role ?? data.user_type,
    userType: data.userType ?? data.user_type,
    teamId: extractTeamId(data.profile),
  };

  setUser(user);
};
