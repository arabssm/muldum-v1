import { icons } from './icons';

export const IconMenu = [
    { label: '로그인', path: [''], icon: icons.login, iconActive: icons.profile },
    { label: '홈 화면', path: ['/'], icon: icons.home, iconActive: icons.homeActive },
    { label: '역대 동아리', path: ['/club-history'], icon: icons.club, iconActive: icons.clubActive },
    { label: '공유 캘린더', path: ['/shared-calendar'], icon: icons.date, iconActive: icons.dateActive },
    { label: '물품관리', path: ['/project-choice','/object/all','/object','/project-approval'], icon: icons.item, iconActive: icons.itemActive },
    { label: '월말평가', path: ['/evaluate'], icon: icons.alarm, iconActive: icons.alarmActive },
    { label: '공지사항', path: ['/notice','/create-notice','/notice/edit','notice/'], icon: icons.notice, iconActive: icons.noticeActive },
    { label: '팀스페이스', path: ['/team-space', '/club/1', '/club/2', '/club/3', '/club/4', '/club/5', '/club/6', '/club/7', '/club/8', '/club/9', '/club/10', '/club/11', '/club/12'], icon: icons.teamspace, iconActive: icons.teamspaceActive },
    { label: '설정', path: ['/setting'], icon: icons.setting, iconActive: icons.settingActive }
];