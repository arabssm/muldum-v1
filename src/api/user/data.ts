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

let isUserFetching = false;

export const GetUser = async () => {
  const { setUser, setLoading, user } = useUserStore.getState();
  
  // 이미 사용자 정보가 있거나 현재 가져오는 중이면 기존 사용자 정보 반환
  if (user && !isUserFetching) {
    return user;
  }
  
  if (isUserFetching) {
    // 이미 요청 중이면 잠시 기다린 후 다시 확인
    await new Promise(resolve => setTimeout(resolve, 100));
    return useUserStore.getState().user;
  }
  
  try {
    isUserFetching = true;
    setLoading(true);
    const { data } = await axiosInstance.get("/user/me");

    const userData = {
      userId: data.userId ?? data.id,
      name: data.name,
      role: data.role ?? data.user_type,
      userType: data.userType ?? data.user_type,
      teamId: extractTeamId(data.profile),
    };

    setUser(userData);
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  } finally {
    setLoading(false);
    isUserFetching = false;
  }
};

// 사용자 정보를 가져오는 훅
export const useUser = () => {
  const { user, isLoading } = useUserStore();
  
  const fetchUser = async () => {
    if (!user) {
      await GetUser();
    }
  };

  return { user, isLoading, fetchUser };
};
