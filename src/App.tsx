import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    box-sizing: border-box;
`

const ContentContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 0;
`;

const ContentWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ContentScrollContainer = styled.div`
    padding: 4rem 2rem;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    flex: 1;
`;

const ContentInner = styled.div`
    max-width: min(1200px, 100%);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
`;

export default function App() {
  const location = useLocation();
  const { isOpen } = useLoginModalStore();
  const { isLoading } = useLoadingStore();
  const { user, isLoading: userLoading } = useUserStore();
  const [isDesktopSize, setIsDesktopSize] = useState(true);
  
  const shouldShowFooter = !location.pathname.startsWith('/club/');

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
          {shouldShowFooter && <Footer />}
        </ContentWrapper>
      </ContentContainer>
      {isOpen && <LoginModal />}
    </MainContainer>
  );
}
