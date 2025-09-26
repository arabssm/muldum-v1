import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { useUserStore } from "../../atom/User";

export default function AuthConfirm({ roles }: { roles: string[] }) {
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user || !user.userType) {
      setChecked(true);
      setAllowed(false);
      return;
    }

    if (roles.includes(user.userType)) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }

    setChecked(true);
  }, [user, roles]);

  if (!checked) {
    return (
      <Block>
        <h3>권한 확인 중...</h3>
      </Block>
    );
  }

  if (!allowed) {
    return (
      <Block>
        <h1>접근 불가</h1>
        <h3>권한이 부족합니다</h3>
        <h2>나가라</h2>
      </Block>
    );
  }

  return <Outlet />;
}

const Block = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  & > h3 {
    color: gray;
  }
`;
