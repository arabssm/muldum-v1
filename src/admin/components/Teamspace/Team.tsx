import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import { Maindata, SideClub } from "./data";

export default function Team() {
  const navigate = useNavigate();

  const handleClick = (idx: number) => {
    navigate(`/club/${idx}`);
  };

  return (
    <_.Container>
      <_.Title>전공동아리</_.Title>
      <_.BoxWrapper>
        {Maindata.map((item) => (
          <_.Box key={item.idx} onClick={() => handleClick(item.idx)}>
            <_.ClubTitle>{item.club}</_.ClubTitle>
            <_.Name>{item.team}</_.Name>
          </_.Box>
        ))}
      </_.BoxWrapper>
      <_.Title>자율동아리</_.Title>
      <_.BoxWrapper>
        {SideClub.map((item) => (
          <_.Box key={item.idx} onClick={() => handleClick(item.idx)}>
            <_.ClubTitle>{item.club}</_.ClubTitle>
            <_.Name>{item.team}</_.Name>
          </_.Box>
        ))}
      </_.BoxWrapper>
    </_.Container>
  );
}