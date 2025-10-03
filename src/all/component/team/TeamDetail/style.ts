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
  width: 60%;

  /* p 태그 줄바꿈 스타일 */
  p {
    margin: 0 0 1em 0;
    min-height: 1.2em;
    line-height: 1.6;
  }
  
  p:empty {
    margin: 0 0 1em 0;
    min-height: 1.2em;
  }
  
  p:last-child {
    margin-bottom: 0;
  }

  /* 이미지 크기 제한 */
  img {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }

  /* 테이블 스타일링 */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.9rem;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 6px 10px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: 600;
    color: #333;
  }

  tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f0f0f0;
  }
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