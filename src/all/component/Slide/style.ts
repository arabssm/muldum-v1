import styled from '@emotion/styled';
import Slider from 'react-slick';
import background1 from "@_assets/onboarding/background1.svg";

export const High = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    overflow: hidden;
    
    @media (max-width: 1440px) {
        padding: 0 1.5rem;
    }
    
    @media (max-width: 1200px) {
        padding: 0 1rem;
    }
`;

export const StyledSlider = styled(Slider)`
    width: 100%;
    
    .slick-list {
        overflow: hidden;
    }
    
    .slick-slide {
        outline: none;
        
        > div {
            height: 100%;
        }
    }
`;

export const CalendarContainer = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: 1rem;
`;

export const SlideWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 24vh;
    min-height: 200px;
    color: #FFFFFF;
    padding: 1% 0;
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 1440px) {
        height: 22vh;
        min-height: 180px;
    }
    
    @media (max-width: 1200px) {
        height: 20vh;
        min-height: 160px;
    }
`;

export const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
`;

export const Legendimg = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Title = styled.div`
    position: absolute;
    font-size: 2.5rem;
    font-weight: 500;
    top: 20%;
    left: 4%;
    width: 65%;
    line-height: 1.2;
    
    @media (max-width: 1440px) {
        font-size: 2.2rem;
        width: 60%;
    }
    
    @media (max-width: 1200px) {
        font-size: 1.8rem;
        width: 55%;
    }
    
    @media (max-width: 1024px) {
        font-size: 1.5rem;
        width: 50%;
    }
`;

export const SubTitle = styled.div`
    font-size: 1.5rem;
    position: absolute;
    font-weight: 400;
    left: 4%;
    top: 67%;
    
    @media (max-width: 1440px) {
        font-size: 1.3rem;
    }
    
    @media (max-width: 1200px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 1024px) {
        font-size: 1rem;
    }
`;

export const Date = styled.div`
    font-size: 1.5rem;
    font-weight: 400;
    position: absolute;
    left: 4%;
    top: 52%;
    
    @media (max-width: 1440px) {
        font-size: 1.3rem;
    }
    
    @media (max-width: 1200px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 1024px) {
        font-size: 1rem;
    }
`;

export const Ddate = styled.div`
    position: absolute;
    font-size: 5rem; 
    font-weight: 600;
    top: 27%;
    left: 74%;
`;

export const Index = styled.div`
    position: absolute;
    left: 96%;
    top: 84%;
`;

export const SlideContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
    background-image: url(${background1});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;