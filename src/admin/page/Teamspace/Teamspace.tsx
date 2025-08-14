import { useState } from "react";
import * as _ from "./style";
import "@_styles";
import NavBar from "@_all/component/sibebar/sidebar";
import Team from "@_components/Teamspace/Team";
import Plus from "@_all/assets/team/ggsite.svg";

export default function Teamspace() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUrl, setNewUrl] = useState("");

    const handleAddUrl = () => {
        if (newUrl.trim() === "") return;
        if (!newUrl.startsWith("https://")) return alert("올바른 URL을 입력하세요.");
        if (!newUrl.includes("docs.google.com/spreadsheets")) return alert("Google 시트 링크만 입력할 수 있습니다.");
        alert("Google 시트 링크가 저장되었습니다!");
        setNewUrl("");
        setIsModalOpen(false);
    };

    return (
        <_.Wrapper>
            <NavBar />
            <_.Header>
                <_.TitleBox>
                    <_.Title>동아리 팀원들을 배치해요</_.Title>
                    <_.Subtitle>각 동아리 별로 팀원들을 배치하고 관리해요</_.Subtitle>
                </_.TitleBox>
                <_.Group onClick={() => setIsModalOpen(true)}>
                    <_.Img src={Plus} alt="링크추가" />
                    <_.Plus>링크추가</_.Plus>
                </_.Group>
            </_.Header> 
            <Team />
            {isModalOpen && (
                <_.ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <_.ModalContent onClick={(e) => e.stopPropagation()}>
                        <_.ModalHeader>
                            <_.ModalTitle>Google URL 추가</_.ModalTitle>
                            <_.ModalSubtitle>모달 외의 영역을 누르면 나가져요</_.ModalSubtitle>
                        </_.ModalHeader>
                        <_.InviteRow>
                            <input
                                type="url"
                                placeholder="Google 시트 URL을 입력하세요"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                            />
                            <button onClick={handleAddUrl}>추가</button>
                        </_.InviteRow>
                    </_.ModalContent>
                </_.ModalOverlay>
            )}
        </_.Wrapper>
    );
}