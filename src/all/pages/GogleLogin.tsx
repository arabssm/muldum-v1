import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import googleLogin from '../../api/login/login'
export default function GoogleLogin() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const code = params.get('code')
    if (code) {
      googleLogin(code)
        .then((jwtToken) => {
        if (jwtToken) {
          localStorage.setItem('access_token', jwtToken)
          navigate('/')
        } else {
          alert('백엔드 로그인 실패')
        }
      })
    }
  }, [])

  return <div>구글 로그인 처리 중...</div>
}
