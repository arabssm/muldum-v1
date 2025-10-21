import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as _ from "./style";
import NavBar from "@_navbar/sidebar";
import { fetchTeamDetail, deleteTeam, TeamDetail as TeamDetailType } from "@_api/teamspace/detail";
import { useUserStore } from '../../../../atom/User';

export default function TeamDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState<TeamDetailType | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (!id) return;
    fetchTeamDetail(Number(id))
      .then((data) => setTeam(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!team) {
    return <div>로딩중...</div>;
  }

  const handleDeleteTeam = async (teamId: number) => {
    if (window.confirm("정말로 이 팀을 삭제하시겠습니까?")) {
      try {
        await deleteTeam(teamId);
        alert("팀이 삭제되었습니다.");
        navigate("/team-space");
      } catch (error) {
        console.error("팀 삭제 실패:", error);
        alert("팀 삭제에 실패했습니다.");
      }
    }
  };

  const renderContent = (html: string) => {
    if (!html) return "내용이 없습니다";
    return html.replace(/<p>\s*<\/p>/g, "<p><br></p>");
  };

  return (
    <_.Container>
      <NavBar />
      <_.Content>
        <_.Banner
          style={{ backgroundImage: `url(${team.config.backgroundImageUrl ?? "/images/default-banner.png"})` }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        />
        {user && user.teamId === team.teamId && (
          <_.ButtonGroup>
            <_.Btn onClick={() => navigate(`/club/edit/${team.teamId}`)}>수정하기</_.Btn>
          </_.ButtonGroup>
        )}
        {user && user.userType === "TEACHER" && (
          <_.ButtonGroup>
            <_.DeleteBtn onClick={() => handleDeleteTeam(team.teamId)}>삭제하기</_.DeleteBtn>
          </_.ButtonGroup>
        )}

        <_.LogoArea>
          <_.Logo
            src={team.config.iconImageUrl ?? "/images/club-logo.png"}
            alt={`${team.teamName} 로고`}
          />
        </_.LogoArea>

        <_.Header>
          <_.ClubName>{team.teamName}</_.ClubName>
        </_.Header>

        <_.Section
          dangerouslySetInnerHTML={{ __html: renderContent(team.content) }}
        />
      </_.Content>
    </_.Container>
  );
}
