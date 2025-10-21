import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import { fetchTeams, Teamtype } from "@_api/teamspace/see";

type ClassFilter = "전체" | "1반" | "2반" | "3반" | "4반";

export default function Team() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Teamtype[]>([]);
  const [activeFilter, setActiveFilter] = useState<ClassFilter>("전체");

  const classFilters: ClassFilter[] = ["전체", "1반", "2반", "3반", "4반"];

  useEffect(() => {
    const classNumber = activeFilter === "전체" ? undefined : parseInt(activeFilter.replace("반", ""));

    fetchTeams(classNumber)
      .then((data) => {
        setTeams(data);
      });
  }, [activeFilter]);

  const handleClick = (teamId: number) => {
    navigate(`/club/${teamId}`);
  };

  const handleFilterClick = (filter: ClassFilter) => {
    setActiveFilter(filter);
  };

  return (
    <_.Container>
      <_.Title>네트워크 팀 목록</_.Title>
      <_.FilterContainer>
        {classFilters.map((filter) => (
          <_.FilterButton
            key={filter}
            isActive={activeFilter === filter}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </_.FilterButton>
        ))}
      </_.FilterContainer>
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
