import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { googleLogin } from '../../api/login/login'

export default function GogleLogin() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const code = params.get('code')
    if (code) {
      googleLogin(code).then((token) => {
        if (token) {
          localStorage.setItem('access_token', token)
          navigate('/') 
        } else {
          alert('로그인 실패')
        }
      })
    }
  }, [])

  return <div>구글 로그인 처리 중...</div>
}
