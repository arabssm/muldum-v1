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
import STeamspace from '@_page/Teamspace/Teamspace';
import ClubHistory from '@_pages/ClubHistory/ClubHistory';
import Object from '@_page/object/object';
import All from '@_page/object/all';
import Resendpage from '@_page/object/resend';
import { useLoginModalStore } from './atom/Modal';
import { useUserStore } from './atom/User';
import LoginModal from './all/component/modal/login/login';
import SEvaluate from '@_page/evaluate/evaluate';
import Evaluate from '@_pages/Evaluate/evaluate';
import Month from '@_page/month/month';
import GoogleLogin from '@_all/pages/GogleLogin';
import { useLoadingStore } from './atom/Loading';
import Loading from './all/component/loading/loading';
import TeamDetail from '@_all/component/team/TeamDetail/TeamDetail';
import TeamEdit from '@_page/TeamEdit/TeamEdit';

export default function App() {
  const { isOpen } = useLoginModalStore();
  const { user } = useUserStore();
  const { isLoading } = useLoadingStore();
  if (isLoading) return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/google/login" element={<GoogleLogin />} />
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/project-approval" element={user?.userType === "TEACHER" ? <Approval /> : <Object />} />
        <Route path="/notice/:id" element={<DetailNotice />} />
        <Route path="/create-notice" element={<CreateNotice />} />
        <Route path="/notice/edit/:id" element={<NoticeEdit />} />
        <Route path="/project-choice" element={<ProjectChoice />} />
        <Route path="/object" element={<ProjectChoice />} />
        <Route path="/object/all" element={<All />} />
        <Route path="/object/detail/:id" element={<Resendpage />} />
        <Route path="/team-space" element={user?.userType === "TEACHER" ? <Teamspace /> : <STeamspace />} />
        <Route path="/club-history" element={<ClubHistory />} />
        <Route path="/shared-calendar" element={<Month />} />
        <Route path="/club/edit/:id" element={<TeamEdit />} />
        <Route path="/evaluate" element={user?.userType === "TEACHER" ? <Evaluate /> : <SEvaluate />} />
        <Route path="/club/:id" element={<TeamDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isOpen && <LoginModal />}
    </>
  );
}