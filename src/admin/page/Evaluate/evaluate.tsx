import { useState } from "react";
import * as _ from "./style";
import NavBar from "@_navbar/sidebar";
import Clubs from "@_pages/Item/Approval/ClubList";

export default function ClubTabs() {
    const [activeTab, setActiveTab] = useState<"작성완료" | "미완료">("작성완료");
    const [activeClubId, setActiveClubId] = useState<number>(1);

    const report = { month: 8 };
    const reports = Array(3).fill(report);

    return (
        <_.Container>
        <NavBar />
        <_.Title>월말평가</_.Title>
        <_.Subtitle>학생들이 작성한 월말평가를 확인해요</_.Subtitle>
        <_.TabWrapper>
            <_.Tab
            active={activeTab === "작성완료"}
            onClick={() => setActiveTab("작성완료")}
            >
            <_.Text>작성완료</_.Text>
            </_.Tab>
            <_.Tab
            active={activeTab === "미완료"}
            onClick={() => setActiveTab("미완료")}
            >
            <_.Text>미완료</_.Text>
            </_.Tab>
        </_.TabWrapper>
        <_.ClubList>
            {Clubs.map((club) => (
            <_.ClubButton
                key={club.id}
                active={club.id === activeClubId}
                onClick={() => setActiveClubId(club.id)}
            >
                {club.name}
            </_.ClubButton>
            ))}
        </_.ClubList>

        {reports.map((rpt, idx) =>
            idx === 0 ? (
            <_.ReportTextPrimary key={idx}>
                {`${rpt.month}월 월말평가 보고서 제출합니다`}
            </_.ReportTextPrimary>
            ) : (
            <_.ReportTextSecondary key={idx}>
                {`${rpt.month}월 월말평가 보고서 제출합니다`}
            </_.ReportTextSecondary>
            )
        )}
        </_.Container>
    );
}