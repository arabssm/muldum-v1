import styled from '@emotion/styled';

export const Container = styled.div`
    width: calc(100% - 13%);
    margin-left: 13%;
    padding: 2rem 3rem 2rem 1rem;
    box-sizing: border-box;
    
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

export const ContentItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
`;

export const Title = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 1%;
    margin-top: 3%;
    
    /* 작은 노트북에서 폰트 크기 조정 */
    @media (max-width: 1199px) and (min-width: 900px) {
        font-size: 1.4rem;
        margin-top: 2.5%;
    }
`;

export const Subtitle = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.2rem;
    color: #707070;
    margin-bottom: 3%;
    
    /* 작은 노트북에서 폰트 크기 조정 */
    @media (max-width: 1199px) and (min-width: 900px) {
        font-size: 1.1rem;
        margin-bottom: 2.5%;
    }
`;