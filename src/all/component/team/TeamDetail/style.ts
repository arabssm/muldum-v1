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
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

export const Banner = styled.div`
  width: 100%;
  z-index: -2;
  height: 12rem;
  background-color: #41f4bb; 
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin-left: 2.5%; /* TeamEdit와 동일하게 */
  padding: 0 !important;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  overflow-x: auto;

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

  img {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }

  table {
    width: 80%;
    border-collapse: collapse;
    margin: 6px 0 12px;
    min-width: 500px;
  }

  th, td {
    border: 1px solid #eaecef;
    padding: 8px;
    text-align: left;
  }

  th {
    background: #fafbfc;
    font-weight: 600;
  }

  tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f0f0f0;
  }

  hr {
    width: 80%;
    min-width: 500px;
    margin: 6px 0 12px;
    border: none;
    border-top: 1px solid #eaecef;
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
  width: 7rem;
  height: 7rem;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -5rem;
  margin-bottom: 1rem;
  margin-left: 12%;
  z-index: 2;
  position: relative;
  border-radius: 1rem;
`;

export const Logo = styled.img`
  height: 4rem; 
  width: 4rem;
  object-fit: cover;
  border-radius: 0.5rem;

  &.editable {
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      filter: brightness(0.9);
      transform: scale(0.95);
    }
  }
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

export const DeleteBtn = styled.button`
    background: none;
    border: none;
    color: #909090;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: 'Paperlogy';

    &:hover {
        color: #ff4444;
    }
`;