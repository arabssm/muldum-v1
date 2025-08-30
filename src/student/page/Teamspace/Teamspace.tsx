import { useState } from "react";
import * as _ from "./style";
import "@_styles";
import NavBar from "@_all/component/sibebar/sidebar";
import Team from "@_components/Teamspace/Team";
import Plus from "@_assets/team/plus.svg";

export default function Teamspace() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emails, setEmails] = useState([
        "24.008@bssm.hs.kr",
        "24.008@bssm.hs.kr"
    ]); 
    const [newEmail, setNewEmail] = useState("");

const handleInvite = () => {
    if (newEmail.trim() === "") return;
    if (!newEmail.includes("@")) return alert("올바른 이메일 주소를 입력하세요.");
    if (emails.includes(newEmail)) return alert("이미 추가된 이메일입니다.");
    setEmails((prev) => [...prev, newEmail]);
    setNewEmail("");
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
                    <_.Img src={Plus} alt="팀원추가" />
                    <_.Plus>팀원추가</_.Plus>
                </_.Group>
            </_.Header>
            <Team />
            {isModalOpen && (
                <_.ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <_.ModalContent onClick={(e) => e.stopPropagation()}>
                        <_.ModalHeader>
                            <_.ModalTitle>전공동아리 팀원 추가</_.ModalTitle>
                            <_.ModalSubtitle>모달 외의 영역을 누르면 나가져요</_.ModalSubtitle>
                        </_.ModalHeader>
                        <_.InviteRow>
                            <input
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <button onClick={handleInvite}>초대하기</button>
                        </_.InviteRow>
                        <_.EmailList>
                            {emails.map((email, idx) => (
                                <label key={idx}>
                                    <input type="checkbox" />
                                    {email}
                                </label>
                            ))}
                        </_.EmailList>
                    </_.ModalContent>
                </_.ModalOverlay>
            )}
        </_.Wrapper>
    );
}