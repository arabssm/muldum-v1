import { useNavigate, useLocation } from 'react-router-dom';
import { IconMenu } from './IconMenu';
import * as _ from './style';

import { useLoginModalStore } from '../../../atom/Modal';
import { useUserStore } from '../../../atom/User';
import DefaultProfile from '../../assets/profile.svg';

import SettingModal from '../Setting/SettingModal';
import { useSettingModalStore } from "../../../atom/Modal";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsOpen } = useLoginModalStore();
  const { user } = useUserStore();
  const hydrated = useUserStore((s) => s.hydrated);

  const { isOpen, open, close } = useSettingModalStore();

  if (!hydrated) return null;

  return (
    <>
      <_.MainArea>
        {user && (
          <_.ProfileArea>
            <_.ProfileImg src={DefaultProfile} alt="프로필" />
            <_.ProfileInfo>
              <_.Job>{user.userType}</_.Job>
              <_.UserName>{user.name || '이름'}</_.UserName>
            </_.ProfileInfo>
          </_.ProfileArea>
        )}

        {IconMenu.map((item) => {
          if (item.label === '로그인' && user) return null;

          const isExcluded = item.label === '로그인' || item.label === '설정';

          const isActive = !isExcluded && (
            Array.isArray(item.path)
              ? item.path.some(
                  (p) =>
                    location.pathname === p ||
                    location.pathname.startsWith(p + '/')
                )
              : location.pathname === item.path ||
                location.pathname.startsWith(item.path + '/')
          );

          const TagComponent =
            item.label === '로그인'
              ? _.LoginTag
              : item.label === '설정'
              ? _.SettingTag
              : _.TagArea;

          return (
            <TagComponent
              key={item.label}
              onClick={() => {
                if (item.label === '로그인') {
                  setIsOpen(true);
                } else if (item.label === '설정') {
                  open();
                } else {
                  navigate(item.path[0]);
                }
              }}
              isActive={isActive}
            >
              <_.Icon
                src={isActive ? item.iconActive : item.icon}
                alt={item.label}
              />
              <_.Text isActive={isActive}>{item.label}</_.Text>
            </TagComponent>
          );
        })}
      </_.MainArea>

      <SettingModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          close();
        }}
      />
    </>
  );
}