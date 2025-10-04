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
          const accessibleChildren = menu.children.filter((child) => {
            if (child.roles.includes('ALL')) return true;
            if (child.roles.includes('GUEST') && !user) return true;
            if (user && child.roles.includes(user.userType)) return true;
            return false;
          });

          if (accessibleChildren.length === 0) return null;

          const isActive = accessibleChildren.some(
            (child) => {
              // 정확한 경로 매칭
              if (location.pathname === child.path) return true;

              // 시작 경로 매칭
              if (location.pathname.startsWith(child.path + '/')) return true;

              // 동적 경로 매칭 (예: /club/:id)
              if (child.path.includes(':')) {
                const pathPattern = child.path.replace(/:[^/]+/g, '[^/]+');
                const regex = new RegExp(`^${pathPattern}$`);
                return regex.test(location.pathname);
              }

              return false;
            }
          );

          const TagComponent =
            menu.label === '로그인'
              ? _.LoginTag
              : menu.label === '설정'
                ? _.SettingTag
                : _.TagArea;

          return (
            <TagComponent
              key={menu.label}
              onClick={() => {
                if (menu.label === '로그인') {
                  setIsOpen(true);
                } else if (menu.label === '설정') {
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
