import axiosInstance from "../../lib/axiosInatance";

export interface LoginResponse {
  userId: number;
  name: string;
  role: string;
  userType: string;
  teamId: number | null;
  accessToken: string;
  refreshToken: string;
}

export default async function googleLogin(code: string): Promise<LoginResponse | null> {
  try {
    const res = await axiosInstance.post('/ara/auth/login/google', {
      authorizationCode: code,
    });

    if (res.status === 200) {
      return res.data as LoginResponse;
    } else {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      return null;
    }
  } catch (err) {
    console.error('[googleLogin] error:', err);
    return null;
  }
}
