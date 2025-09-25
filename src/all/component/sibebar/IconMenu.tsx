import { icons } from './icons';

export const IconMenu = [
  {
    label: '로그인',
    icon: icons.login,
    iconActive: icons.profile,
    children: [
      { path: '', roles: ['GUEST'] }, 
    ],
  },
  {
    label: '홈 화면',
    icon: icons.home,
    iconActive: icons.homeActive,
    children: [
      { path: '/', roles: ['ALL'] },
    ],
  },
  {
    label: '역대 동아리',
    icon: icons.club,
    iconActive: icons.clubActive,
    children: [
      { path: '/club-history', roles: ['ALL'] },
    ],
  },
  {
    label: '물품관리',
    icon: icons.item,
    iconActive: icons.itemActive,
    children: [
      { path: '/project-choice', roles: ['STUDENT', 'TEACHER', 'SUPERADMIN'] },
      { path: '/object/all', roles: ['STUDENT', 'TEACHER', 'SUPERADMIN'] },
      { path: '/object', roles: ['STUDENT', 'TEACHER', 'SUPERADMIN'] },
      { path: '/project-approval', roles: ['TEACHER', 'SUPERADMIN'] }, 
    ],
  },
  {
    label: '공지사항',
    icon: icons.notice,
    iconActive: icons.noticeActive,
    children: [
      { path: '/notice', roles: ['STUDENT', 'TEACHER', 'SUPERADMIN'] },
      { path: '/notice/edit', roles: ['TEACHER', 'SUPERADMIN'] },
      { path: '/create-notice', roles: ['TEACHER', 'SUPERADMIN'] }, 
    ],
  },
  {
    label: '팀스페이스',
    icon: icons.teamspace,
    iconActive: icons.teamspaceActive,
    children: [
      { path: '/team-space', roles: ['ALL'] },
      { path: '/club/:id', roles: ['ALL'] },
    ],
  },
  {
    label: '설정',
    icon: icons.setting,
    iconActive: icons.settingActive,
    children: [
      { path: '/setting', roles: ['ALL'] }, 
    ],
  },
];
