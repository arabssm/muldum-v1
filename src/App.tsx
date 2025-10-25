import { useEffect, useState } from 'react';
import { useLoginModalStore } from './atom/Modal';
import { useLoadingStore } from './atom/Loading';
import { useUserStore } from './atom/User';
import { GetUser } from './api/user/data';
import { getCookie } from './utils/cookie';
import LoginModal from './all/component/modal/login/login';
import Loading from './all/component/loading/loading';
import ScreenSizeWarning from './all/component/ScreenSizeWarning/ScreenSizeWarning';
import AppRoutes from "./AppRoutes";
import NavBar from "@_navbar/sidebar";
import styled from "@emotion/styled";

const MainContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`

const ContentContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 2rem;
`;

const ContentScrollContainer = styled.div`
    max-width: 1200px;
    min-width: 688px;
    margin: 4rem auto;
    box-sizing: border-box;
`;

export default function App() {
  const { isOpen } = useLoginModalStore();
  const { isLoading } = useLoadingStore();
  const { user, isLoading: userLoading } = useUserStore();
  const [isDesktopSize, setIsDesktopSize] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const desktopSize = window.innerWidth >= 1024;
      setIsDesktopSize(desktopSize);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const initializeUser = async () => {
      const accessToken = getCookie('access_token');
      if (accessToken && !user) {
        try {
          await GetUser();
        } catch (error) {
          console.error('Failed to initialize user:', error);
        }
      }
    };

    initializeUser();
  }, [user]);

  if (isLoading || userLoading) return <Loading />;
  if (!isDesktopSize) {
    return <ScreenSizeWarning />;
  }
  return (
    <MainContainer>
      <NavBar />
      <ContentContainer>
        <ContentScrollContainer>
          <AppRoutes />
        </ContentScrollContainer>
      </ContentContainer>
      {isOpen && <LoginModal />}
    </MainContainer>
  );
}
