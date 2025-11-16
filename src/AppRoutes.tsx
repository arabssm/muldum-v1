import React from 'react';
import { Route, Routes } from "react-router-dom";
import Main from "@_main/Main";
import Notice from "@_notice/Notice";
import DetailNotice from "@_notice/Detail/DetailNotice";
import ClubHistory from "@_pages/ClubHistory/ClubHistory";
import GoogleLogin from "@_all/pages/GogleLogin";
import Teamspace from "@_pages/Teamspace/Teamspace";
import TeamDetail from "@_all/component/team/TeamDetail/TeamDetail";
import Selectwhatteam from "@_all/pages/selectwhatteam";
import AuthConfirm from "@_all/auth/auth";
import CreateNotice from "@_pages/Notice/Create/CreateNotice";
import NoticeEdit from "@_pages/Notice/Edit/NoticeEdit";
import Approval from "@_pages/Item/Approval/Approval";
import ProjectChoice from "@_pages/Item/Choice/ProjectChoice";
import All from "@_page/object/all";
import TeamEdit from "@_page/TeamEdit/TeamEdit";
import Object from "@_page/object/object";
import NotFound from "@_notfound/NotFound";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/notice" element={<Notice />} />
    <Route path="/notice/:id" element={<DetailNotice />} />
    <Route path="/club-history" element={<ClubHistory />} />
    <Route path="/google/login" element={<GoogleLogin />} />
    <Route path="/team-space" element={<Teamspace />} />
    <Route path="/club/:id" element={<TeamDetail />} />
    <Route path='/team-space-menu' element={<Selectwhatteam />} />
    <Route element={<AuthConfirm roles={['TEACHER', 'SUPERADMIN']} />}>
      <Route path="/create-notice" element={<CreateNotice />} />
      <Route path="/notice/edit/:id" element={<NoticeEdit />} />
      <Route path="/project-approval" element={<Approval />} />
    </Route>
    <Route element={<AuthConfirm roles={['STUDENT', 'SUPERADMIN']} />}>
      <Route path="/object/all" element={<All />} />
      <Route path="/club/edit/:id" element={<TeamEdit />} />
      <Route path="/object/apply" element={<Object />} />
    </Route>
    <Route element={<AuthConfirm roles={['STUDENT', 'TEACHER', 'SUPERADMIN']} />}>
      <Route path="/project-choice" element={<ProjectChoice />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes;