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
import Selectwhatteam from '@_all/pages/selectwhatteam'
import { useLoginModalStore } from './atom/Modal';
import { useLoadingStore } from './atom/Loading';
import LoginModal from './all/component/modal/login/login';
import GoogleLogin from '@_all/pages/GogleLogin';
import Loading from './all/component/loading/loading';
import TeamDetail from '@_all/component/team/TeamDetail/TeamDetail';
import TeamEdit from '@_page/TeamEdit/TeamEdit';
import AuthConfirm from '@_all/auth/auth';
import ScreenSizeWarning from './all/component/ScreenSizeWarning/ScreenSizeWarning';
import AppRoutes from "./AppRoutes";
import NavBar from "@_navbar/sidebar";

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
  if (!isDesktopSize) {
    return <ScreenSizeWarning />;
  }
  return (
    <>
      <NavBar />
      <AppRoutes />
      {isOpen && <LoginModal />}
    </>
  );
}
