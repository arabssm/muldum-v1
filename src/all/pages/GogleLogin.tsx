import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import googleLogin from '../../api/login/login'
import { useUserStore } from '../../atom/User' 

export default function GoogleLogin() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    let ignore = false

    const code = params.get('code')
    if (code && !ignore) {
      googleLogin(code)
        .then((data) => {
        if (data) {
          localStorage.setItem('access_token', data.accessToken)
          localStorage.setItem('refresh_token', data.refreshToken)
          setUser({
              userId: data.userId,
              name: data.name,
              role: data.role,
              userType: data.userType,
              teamId: data.teamId,
            })
          navigate('/')
        }
      })
    }

    return () => {
      ignore = true
    }
  }, [params, navigate, setUser])

  return <div>구글 로그인 처리 중...</div>
}
