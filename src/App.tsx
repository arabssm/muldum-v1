import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '@_main/Main';
import Notice from '@_notice/Notice';
import DetailNotice from '@_notice/Detail/DetailNotice';
import CreateNotice from '@_pages/Notice/Create/CreateNotice';
import NotFound from '@_components/NotFound/NotFound';
import NoticeEdit from '@_pages/Notice/Edit/NoticeEdit';
import ProjectChoice from '@_pages/Item/Choice/ProjectChoice';
import Approval from '@_pages/Item/Approval/Approval';
import Teamspace from '@_pages/Teamspace/Teamspace';
import ClubHistory from '@_pages/ClubHistory/ClubHistory';
import Object from '@_page/object/object';
import All from '@_page/object/all';
import Resendpage from '@_page/object/resend';
import { useLoginModalStore } from './atom/Modal';
import { useLoadingStore } from './atom/Loading';
import LoginModal from './all/component/modal/login/login';
import GoogleLogin from '@_all/pages/GogleLogin';
import Loading from './all/component/loading/loading';
import TeamDetail from '@_all/component/team/TeamDetail/TeamDetail';
import TeamEdit from '@_page/TeamEdit/TeamEdit';
import AuthConfirm from '@_all/auth/auth';
import ScreenSizeWarning from './all/component/ScreenSizeWarning/ScreenSizeWarning';

export default function App() {
  const { isOpen } = useLoginModalStore();
  const { isLoading } = useLoadingStore();
  const [isDesktopSize, setIsDesktopSize] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const desktopSize = window.innerWidth >= 1024;
      setIsDesktopSize(desktopSize);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (isLoading) return <Loading />;

  // 화면 크기가 작으면 경고 화면만 표시
  if (!isDesktopSize) {
    return <ScreenSizeWarning />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<DetailNotice />} />
        <Route path="/club-history" element={<ClubHistory />} />
        <Route path="/google/login" element={<GoogleLogin />} />
        <Route path="/team-space" element={<Teamspace />} />
        <Route path="/club/:id" element={<TeamDetail />} />
        <Route element={<AuthConfirm roles={['TEACHER', 'SUPERADMIN']} />}>
          <Route path="/create-notice" element={<CreateNotice />} />
          <Route path="/notice/edit/:id" element={<NoticeEdit />} />
          <Route path="/project-approval" element={<Approval />} />
        </Route>
        <Route element={<AuthConfirm roles={['STUDENT', 'TEACHER', 'SUPERADMIN']} />}>
          <Route path="/project-choice" element={<ProjectChoice />} />
          <Route path="/object/all" element={<All />} />
          <Route path="/object/detail/:id" element={<Resendpage />} />
          <Route path="/club/edit/:id" element={<TeamEdit />} />
          <Route path="/object/apply" element={<Object />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isOpen && <LoginModal />}
    </>
  );
}
