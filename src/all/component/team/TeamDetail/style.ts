import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin: -3rem 0rem;
  position: fixed;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

export const Banner = styled.img`
  width: 200%;
  z-index: -2;
  height: 12rem;
  background-color: #41f4bb; 
  background-size: cover;
  background-position: center;
  margin: 0 !important;
  padding: 0 !important;
`;

export const Header = styled.div`
  padding: 0 2rem;
  margin-left: 10%;
`;

export const ClubName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;



export const Section = styled.div`
  padding: 1rem 2rem;
  margin-left: 10%;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
`;

export const SectionText = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0.4rem 0 1.5rem 0;
`;

export const LogoArea = styled.div`
  width: 6.5%;
  height: 7rem;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -5rem;
  margin-bottom: 1rem;
  margin-left: 12%;
  z-index: -1;
  position: relative;
  border-radius: 1rem;
`;

export const Logo = styled.img`
  height: 4rem; 
  width: auto;
`;

export const Btn = styled.button`
  display: flex;
  margin-left: 70%;
`;

export const ButtonGroup = styled.div`
    display: flex;
    margin-left: 20%;

    button {
        background: none;
        border: none;
        color: #909090;
        cursor: pointer;
        font-size: 0.8rem;
        font-family: 'Paperlogy';

        &:hover {
            color: #FF9B62;
        }
    }
`;