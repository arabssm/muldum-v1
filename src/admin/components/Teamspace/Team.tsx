import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import { fetchTeams, Teamtype } from "@_api/teamspace/see";

export default function Team() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Teamtype[]>([]);

  useEffect(() => {
    fetchTeams()
      .then((data) => setTeams(data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (teamId: number) => {
    navigate(`/club/${teamId}`);
  };

  return (
    <_.Container>
      <_.Title>동아리 목록</_.Title>
      <_.BoxWrapper>
        {teams.map((team) => (
          <_.Box key={team.teamId} onClick={() => handleClick(team.teamId)}>
            <_.ClubTitle>{team.teamName}</_.ClubTitle>
            <_.Name>{team.members.map((m) => m.userName).join(", ")}</_.Name>
          </_.Box>
        ))}
      </_.BoxWrapper>
    </_.Container>
  );
}
