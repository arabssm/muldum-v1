/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { css, keyframes } from '@emotion/react'
import googleLogin from '../../api/login/login'
import { useUserStore } from '../../atom/User'
import Main from '@_main/Main';

// 쿠키 유틸리티 함수
const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};


const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const spinnerStyle = css`
  width: 50px;
  height: 50px;
  border: 5px solid #eee;
  border-top: 5px solid #333;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export default function GoogleLogin() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const [loading, setLoading] = useState(true)
  const hasRequestedRef = useRef(false)

  useEffect(() => {
    const code = params.get('code')

    if (code && !hasRequestedRef.current) {
      hasRequestedRef.current = true
      googleLogin(code)
        .then((data) => {
          if (data) {
            // 쿠키에 토큰 저장 (access_token: 7일, refresh_token: 30일)
            setCookie('access_token', data.accessToken, 7)
            setCookie('refresh_token', data.refreshToken, 30)
            setUser({
              userId: data.userId,
              name: data.name,
              role: data.role,
              userType: data.userType,
              teamId: data.teamId,
            })
          }
          navigate('/', { replace: true })
        })
        .catch(() => navigate('/', { replace: true }))
        .finally(() => setLoading(false))

    } else if (!code) {
      setLoading(false)
      navigate('/')
    }
  }, [params, navigate, setUser])

  return (
    <>
      <Main />
      {loading && (
        <div css={overlayStyle}>
          <div css={spinnerStyle} />
        </div>
      )}
    </>
  )
}
