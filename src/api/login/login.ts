import axiosInstance from "../../lib/axiosInatance";

  export default async function googleLogin(code: string): Promise<string | null> {
    console.log(code)
    try {
      const res = await axiosInstance.post('/ara/auth/login/google', { 
        'authorizationCode' : code 
       })
      return res.data.token 
    } catch (err) {
      console.error('Google 로그인 실패:', err)
      return null
    }
  }