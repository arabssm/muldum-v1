import * as _ from "./style";
import "@_styles";
import NavBar from "@_all/component/sibebar/sidebar";
import Team from "@_components/Teamspace/Team";
import Plus from "@_all/assets/plus.svg";

export default function Teamspace() {
    return (
        <_.Wrapper>
            <NavBar />
        <_.Header>
            <_.TitleBox>
                <_.Title>동아리 팀원들을 배치해요</_.Title>
                <_.Subtitle>각 동아리 별로 팀원들을 배치하고 관리해요</_.Subtitle>
            </_.TitleBox>
            <_.Group>
                <_.Img src={Plus} alt="팀원추가" />
                <_.Plus>팀원추가</_.Plus>
            </_.Group>
        </_.Header>
        <Team />
        </_.Wrapper>
    );
}
