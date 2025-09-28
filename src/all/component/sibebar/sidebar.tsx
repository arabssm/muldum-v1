import { useNavigate, useLocation } from 'react-router-dom';
import { IconMenu } from './IconMenu';
import * as _ from './style';

import { useLoginModalStore } from '../../../atom/Modal';
import { useUserStore } from '../../../atom/User';
import DefaultProfile from '@_assets/profile.svg';

import SettingModal from '../modal/Setting/SettingModal';
import { useSettingModalStore } from "../../../atom/Modal";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsOpen } = useLoginModalStore();
  const { user } = useUserStore();
  const hydrated = useUserStore((s) => s.hydrated);

  const { isOpen, open, close } = useSettingModalStore();

  if (!hydrated) return null;

  const role = user?.userType ?? 'GUEST';

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

        {IconMenu.map((menu) => {
          // 접근 가능한 child 필터링
          const accessibleChildren = menu.children.filter((child) => {
            if (child.roles.includes('ALL')) return true;       // 항상 허용
            if (child.roles.includes('GUEST') && !user) return true; // 로그인 안했을 때만
            if (user && child.roles.includes(user.userType)) return true; // 권한 일치
            return false;
          });

          if (accessibleChildren.length === 0) return null;

          const isActive = accessibleChildren.some(
            (child) =>
              location.pathname === child.path ||
              location.pathname.startsWith(child.path + '/')
          );

          const TagComponent =
            menu.label === '로그인'
              ? _.LoginTag
              : menu.label === '로그아웃'
              ? _.SettingTag
              : _.TagArea;

          return (
            <TagComponent
              key={menu.label}
              onClick={() => {
                if (menu.label === '로그인') {
                  setIsOpen(true);
                } else if (menu.label === '로그아웃') {
                  open();
                } else {
                  navigate(accessibleChildren[0].path);
                }
              }}
              isActive={isActive}
            >
              <_.Icon
                src={isActive ? menu.iconActive : menu.icon}
                alt={menu.label}
              />
              <_.Text isActive={isActive}>{menu.label}</_.Text>
            </TagComponent>
          );
        })}
      </_.MainArea>

      <SettingModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={close}
      />
    </>
  );
}
