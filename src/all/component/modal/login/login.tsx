import { useLoginModalStore } from '../../../../atom/Modal';
import google from '@_assets/google.svg';
import * as _ from './style';
import { useNavigate } from 'react-router-dom';

export default function LoginModal() {
  const navigate = useNavigate();
  const { setIsOpen } = useLoginModalStore();

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const scope = 'openid email profile';
    const responseType = 'code';
    const state = crypto.randomUUID();

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

    window.location.href = oauthUrl;
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <_.Overlay onClick={() => setIsOpen(false)}>
      <_.ModalContainer onClick={handleModalClick}>
        <_.Title>로그인</_.Title>
        <_.Button onClick={handleGoogleLogin}>
          <_.Google src={google} alt="Google 로그인" />
        </_.Button>
      </_.ModalContainer>
    </_.Overlay>
  );
}