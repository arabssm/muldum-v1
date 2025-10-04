import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as _ from "./style";
import NavBar from "@_navbar/sidebar";
import { fetchTeamDetail, TeamDetail as TeamDetailType } from "@_api/teamspace/detail";
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
