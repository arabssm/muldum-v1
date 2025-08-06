import { Routes, Route } from 'react-router-dom';
import Main from '@_main/Main';
import Notice from '@_notice/Notice';
import DetailNotice from '@_notice/Detail/DetailNotice';
import CreateNotice from '@_notice/Create/CreateNotice';
import NotFound from '@_components/NotFound/NotFound';
import NoticeEdit from '@_pages/Notice/Detail/Edit/NoticeEdit';
import ProjectChoice from '@_pages/Item/Choice/ProjectChoice';
import Approval from '@_pages/Item/Approval/Approval';
import Teamspace from '@_pages/Teamspace/Teamspace';
import ClubHistory from '@_pages/ClubHistory/ClubHistory';
import Onboarding from '@_page/onboarding/index';
import Object from '@_page/object/object';
import All from '@_page/object/all';
import Resendpage from '@_page/object/resend';
import { useRecoilValue } from 'recoil';
import { loginModalState } from "@_all/atom/Modal";
import LoginModal from './all/component/modal/login/login';
import SEvaluate from '@_page/evaluate/evaluate';
import Evaluate from '@_pages/Evaluate/evaluate';
import Month from '@_page/month/month';
import GogleLogin from '@_all/pages/GogleLogin';
export default function App() {
  //const role = "TEACHER"; 
  const role = "STUDENT";
  const isOpen = useRecoilValue(loginModalState)
  return (
    <>
      <Routes>
        <Route path="/kakao/login" element={<GogleLogin />} />
        <Route path="/" element={role === "STUDENT" ? <Onboarding /> : <Main />} />
        <Route path="/notice" element={ <Notice />} />
        <Route path="/project-approval" element={role === "STUDENT" ? <Object /> : <Approval />} />
        <Route path="/notice/:id" element={<DetailNotice />} />
        <Route path="/create-notice" element={<CreateNotice />} />
        <Route path="/notice/edit/:id" element={<NoticeEdit />} />
        <Route path="/project-choice" element={<ProjectChoice />} />
        <Route path="/object" element={<ProjectChoice />} />
        <Route path="/object/all" element={<All />} />
        <Route path="/object/detail/:id" element={<Resendpage />} />
        <Route path="/team-space" element={<Teamspace />} />
        <Route path="/club-history" element={<ClubHistory />} />
        <Route path="/shared-calendar" element={<Month />} />
        <Route path="/evaluate" element={role === "TEACHER" ? <Evaluate /> : <SEvaluate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isOpen && <LoginModal />}
    </>
  );
}
