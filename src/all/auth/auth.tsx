import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { useUserStore } from "../../atom/User";
import { GetUser } from "../../api/user/data";
import NavBar from "@_navbar/sidebar";

export default function AuthConfirm({ roles }: { roles: string[] }) {
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const { user, isLoading } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          await GetUser();
        }
      } catch (error) {
        console.error('Failed to get user:', error);
        setChecked(true);
        setAllowed(false);
        return;
      }
    };

    checkAuth();
  }, [user]);

  useEffect(() => {
    if (isLoading) return;

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
  }, [user, roles, isLoading]);

  if (!checked || isLoading) {
    return (
      <Block>
        <NavBar />
        <h1>권한 확인 중...</h1>
      </Block>
    );
  }

  if (!allowed) {
    return (
      <Block>
        <h1>접근할 수 없는 페이지 입니다</h1>
      </Block>
    );
  }

  return <Outlet />;
}

const Block = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  margin-left: 10rem;
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
