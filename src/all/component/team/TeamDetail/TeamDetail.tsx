import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as _ from "./style";
import { fetchTeamDetail, deleteTeam, TeamDetail as TeamDetailType } from "@_api/teamspace/detail";
import { useUserStore } from '../../../../atom/User';
import { GetUser } from '../../../../api/user/data';

export default function TeamDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState<TeamDetailType | null>(null);
  const { user, isLoading } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        try {
          await GetUser();
        } catch (error) {
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!id) return;
    fetchTeamDetail(Number(id))
      .then((data) => setTeam(data))
      .catch((err) => {});
  }, [id]);

  if (!team || isLoading) {
    return <div>로딩중...</div>;
  }

  const handleDeleteTeam = async (teamId: number) => {
    if (window.confirm("정말로 이 팀을 삭제하시겠습니까?")) {
      try {
        await deleteTeam(teamId);
        alert("팀이 삭제되었습니다.");
        navigate("/team-space");
      } catch (error) {
        alert("팀 삭제에 실패했습니다.");
      }
    }
  };

  const renderContent = (html: string) => {
    if (!html) return "내용이 없습니다";
    return html.replace(/<p>\s*<\/p>/g, "<p><br></p>");
  };

  return (
    <>
      <_.Content>
        <_.Banner
          style={{ backgroundImage: `url(${team.config?.backgroundImageUrl ?? "https://muldumarabucket.s3.ap-northeast-2.amazonaws.com/default_banner.svg"})` }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        />
        {user && user.teamId !== null && Number(user.teamId) === Number(team.teamId) && (
          <_.ButtonGroup>
            <_.Btn onClick={() => navigate(`/club/edit/${team.teamId}`)}>수정하기</_.Btn>
          </_.ButtonGroup>
        )}
        {user && user.userType === "TEACHER" && (
          <_.ButtonGroup>
            <_.Btn onClick={() => handleDeleteTeam(team.teamId)}>삭제하기</_.Btn>
          </_.ButtonGroup>
        )}

        <_.LogoArea>
          <_.Logo
            src={team.config?.iconImageUrl ?? "https://muldumarabucket.s3.ap-northeast-2.amazonaws.com/default_logo.svg"}
            alt={`${team.teamName} 로고`}
          />
        </_.LogoArea>
        <_.ContentArea>
          <_.Header>
            <_.ClubName>{team.teamName}</_.ClubName>
          </_.Header>

          <_.Section
            dangerouslySetInnerHTML={{ __html: renderContent(team.content) }}
          />
        </_.ContentArea>
      </_.Content>
    </>
  );
}