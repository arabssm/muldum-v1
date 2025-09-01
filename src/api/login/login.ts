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
      alert("로그인에 성공하였습니다.")
      return res.data as LoginResponse;
    }
  } catch (err) {
    alert(err.message);
    return null;
  }
}
