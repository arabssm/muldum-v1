import * as _ from "./style";
import NavBar from "@_navbar/sidebar";

export default function TeamDetail() {
    return (
        <_.Container>
            <NavBar />
            <_.Content>
                <_.Banner />
                <_.LogoArea>
                    <_.Logo src="/images/club-logo.png" alt="동아리 로고" />
                </_.LogoArea>
                <_.Header>
                    <_.ClubName>동아리 이름</_.ClubName>
                    <_.Slogan>동아리 슬로건</_.Slogan>
                </_.Header>
                <_.Section>
                    <_.SectionTitle>주제 1</_.SectionTitle>
                    <_.SectionText>서비스 기획 배경</_.SectionText>
                </_.Section>
                <_.Section>
                    <_.SectionTitle>주제 2</_.SectionTitle>
                    <_.SectionText>동아리 기능 설명</_.SectionText>
                </_.Section>
                <_.Section>
                    <_.SectionTitle>주제 3</_.SectionTitle>
                    <_.SectionText>시장 조사</_.SectionText>
                </_.Section>
                <_.Section>
                    <_.SectionTitle>주제 4</_.SectionTitle>
                    <_.SectionText>기여한 팀원과 깃허브 링크</_.SectionText>
                </_.Section>
            </_.Content>
        </_.Container>
    );
}
