/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { css, keyframes } from '@emotion/react'
import googleLogin from '../../api/login/login'
import { useUserStore } from '../../atom/User'
import Main from '@_main/Main';


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

useEffect(() => {
  let ignore = false
  const code = params.get('code')

  if (sessionStorage.getItem('googleLoginDone')) {
    setLoading(false)
    return
  }

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
        }
        navigate('/', { replace: true })
      })
      .catch(() => navigate('/', { replace: true }))
      .finally(() => setLoading(false))

    sessionStorage.setItem('googleLoginDone', 'true')
  } else {
    setLoading(false)
    navigate('/')
  }

  return () => {
    ignore = true
  }
}, [])

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
