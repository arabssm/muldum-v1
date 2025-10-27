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
let retryCount = 0;
let lastRetryTime = 0;
let retryTimeoutId: NodeJS.Timeout | null = null;

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GetUser = async (forceRetry: boolean = false) => {
  const { setUser, setLoading, user } = useUserStore.getState();

  const accessToken = getCookie('access_token');
  if (!accessToken) {
    setLoading(false);
    return null;
  }

  if (user && !isUserFetching && !forceRetry) {
    return user;
  }

  if (isUserFetching) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return useUserStore.getState().user;
  }

  const now = Date.now();

  if (!forceRetry && retryCount >= 3 && now - lastRetryTime < 30000) {
    return null;
  }

  if (retryCount >= 3 && now - lastRetryTime >= 30000) {
    retryCount = 0;
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
    retryCount = 0;
    lastRetryTime = 0;

    if (retryTimeoutId) {
      clearTimeout(retryTimeoutId);
      retryTimeoutId = null;
    }

    return userData;
  } catch (error) {
    retryCount++;
    lastRetryTime = now;

    if (retryCount >= 3 && !retryTimeoutId) {
      retryTimeoutId = setTimeout(() => {
        retryCount = 0;
        lastRetryTime = 0;
        retryTimeoutId = null;
      }, 30000);
    }

    // 사용자 정보 가져오기 실패 시 쿠키 삭제
    const deleteCookie = (name: string): void => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    };
    
    deleteCookie('access_token');
    deleteCookie('refresh_token');

    throw error;
  } finally {
    setLoading(false);
    isUserFetching = false;
  }
};

export const getUserRetryStatus = () => {
  const now = Date.now();
  const isInCooldown = retryCount >= 3 && now - lastRetryTime < 30000;
  const remainingCooldown = isInCooldown ? Math.ceil((30000 - (now - lastRetryTime)) / 1000) : 0;

  return {
    retryCount,
    isInCooldown,
    remainingCooldown,
    canRetry: !isInCooldown
  };
};

export const resetUserRetry = () => {
  retryCount = 0;
  lastRetryTime = 0;
  if (retryTimeoutId) {
    clearTimeout(retryTimeoutId);
    retryTimeoutId = null;
  }
};

export const useUser = () => {
  const { user, isLoading } = useUserStore();

  const fetchUser = async (forceRetry: boolean = false) => {
    if (!user || forceRetry) {
      try {
        await GetUser(forceRetry);
      } catch (error) {
        const status = getUserRetryStatus();
        if (status.isInCooldown) {
          return null;
        }
        throw error;
      }
    }
  };

  return {
    user,
    isLoading,
    fetchUser,
    retryStatus: getUserRetryStatus(),
    resetRetry: resetUserRetry
  };
};
