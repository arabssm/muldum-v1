import * as _ from './style';
import { logout } from '@_api/login/login';

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SettingModal({ isOpen, onClose }: SettingModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    const refreshToken = localStorage.getItem('refresh_token'); 
    if (!refreshToken) {
      alert('로그인 정보가 없습니다.');
      onClose();
      return;
    }

    const success = await logout(refreshToken);
    if (success) {
      localStorage.removeItem('refresh_token'); 
      localStorage.removeItem('access_token');
      localStorage.removeItem('user-store');
      alert('로그아웃 되었습니다.');
      window.location.href = '/'; 
    } else {
      alert('로그아웃 실패');
    }

    onClose();
  };

  const handleOverlayClick = () => onClose();
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <_.Overlay onClick={handleOverlayClick}>
      <_.ModalContent onClick={handleModalClick}>
        <_.Title>로그아웃</_.Title>
        <_.Message>정말 로그아웃 하시겠습니까?</_.Message>
        <_.ButtonGroup>
          <_.Button onClick={handleConfirm}>로그아웃</_.Button>
          <_.Button className="cancel" onClick={onClose}>취소</_.Button>
        </_.ButtonGroup>
      </_.ModalContent>
    </_.Overlay>
  );
}
