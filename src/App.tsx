import { useEffect, useState } from 'react';
import { useLoginModalStore } from './atom/Modal';
import { useLoadingStore } from './atom/Loading';
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
    margin-left: 13%;
    padding: 2rem 3rem 2rem 1rem;
    box-sizing: border-box;
    overflow: auto;
    
    /* 큰 노트북 (1440px 이상) */
    @media (min-width: 1440px) {
        padding: 2rem 4rem 2rem 1.5rem;
    }
    
    /* 일반 노트북 (1200px - 1439px) */
    @media (max-width: 1439px) and (min-width: 1200px) {
        padding: 2rem 2.5rem 2rem 1.2rem;
    }
    
    /* 작은 노트북 (1024px - 1199px) */
    @media (max-width: 1199px) and (min-width: 1024px) {
        padding: 1.5rem 2rem 1.5rem 1rem;
    }
    
    /* 매우 작은 노트북 (900px - 1023px) */
    @media (max-width: 1023px) and (min-width: 900px) {
        padding: 1.5rem 1.5rem 1.5rem 0.8rem;
    }
`;

export default function App() {
  const { isOpen } = useLoginModalStore();
  const { isLoading } = useLoadingStore();
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

  if (isLoading) return <Loading />;
  if (!isDesktopSize) {
    return <ScreenSizeWarning />;
  }
  return (
    <MainContainer>
      <NavBar />
      <ContentContainer>
        <AppRoutes />
      </ContentContainer>
      {isOpen && <LoginModal />}
    </MainContainer>
  );
}
