import axiosInstance from "../../lib/axiosInatance";

  export async function googleLogin(code: string): Promise<string | null> {
    try {
      const res = await axiosInstance.post('/ara/auth/login/google', { 
        'accessToken' : code 
       })
      return res.data.token 
    } catch (err) {
      console.error('Google 로그인 실패:', err)
      return null
    }
  }