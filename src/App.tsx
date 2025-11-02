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
import Footer from './all/component/Footer/Footer';
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
`;

const ContentWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentScrollContainer = styled.div`
    flex: 1;
    padding: 0 2rem;
`;

const ContentInner = styled.div`
    max-width: 1200px;
    min-width: 688px;
    margin: 4rem auto;
    box-sizing: border-box;
    min-height: calc(100vh - 8rem);
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
        <ContentWrapper>
          <ContentScrollContainer>
            <ContentInner>
              <AppRoutes />
            </ContentInner>
          </ContentScrollContainer>
          <Footer />
        </ContentWrapper>
      </ContentContainer>
      {isOpen && <LoginModal />}
    </MainContainer>
  );
}
