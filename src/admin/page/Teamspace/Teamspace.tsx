import { useState } from "react";
import * as _ from "./style";
import "@_styles";
import NavBar from "@_all/component/sibebar/sidebar";
import Team from "@_components/Teamspace/Team";
import Plus from "@_assets/team/ggsite.svg";
import Invite, { StudentTeamIdInvite } from "../../../api/teamspace/invite";
import { useUserStore } from "../../../atom/User";

export default function Teamspace() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'invite' | 'student'>('invite');
    const [newUrl, setNewUrl] = useState("");
    const { user } = useUserStore();

    const openModal = (type: 'invite' | 'student') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleAddUrl = async () => {
        try {
            if (modalType === 'invite') {
                await Invite(newUrl);
            } else {
                await StudentTeamIdInvite(newUrl);
            }
            setNewUrl("");
            setIsModalOpen(false);
            alert("링크가 추가되었습니다!");
        } catch (err) {
            console.error(err);
            alert("추가에 실패했습니다.");
        }
    };


    return (
        <_.Wrapper>
            <NavBar />
            <_.Header>
                <_.TitleBox>
                    <_.Title>동아리 팀원들을 배치해요</_.Title>
                    <_.Subtitle>각 동아리 별로 팀원들을 배치하고 관리해요</_.Subtitle>
                </_.TitleBox>
                {user && user.userType === "TEACHER" && (
                    <>
                        <_.Group onClick={() => openModal('invite')}>
                            <_.Img src={Plus} alt="링크추가" />
                            <_.Plus>링크추가</_.Plus>
                        </_.Group>
                        <_.Group onClick={() => openModal('student')}>
                            <_.Img src={Plus} alt="학생 팀원추가" />
                            <_.Plus>학생 팀원추가</_.Plus>
                        </_.Group>
                    </>
                )}
            </_.Header>
            <Team />
            {isModalOpen && (
                <_.ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <_.ModalContent onClick={(e) => e.stopPropagation()}>
                        <_.ModalHeader>
                            <_.ModalTitle>
                                {modalType === 'invite' ? '학생 초대 URL 추가' : '학생 팀원 추가 URL 추가'}
                            </_.ModalTitle>
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


