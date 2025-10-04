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
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.editable {
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 1;

    &:hover {
      filter: brightness(0.9);
    }

    &:hover::after {
      content: "클릭하여 배너 이미지 변경";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      white-space: nowrap;
      z-index: 10000;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
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
  overflow-x: hidden;

  /* NotionEditor 내부 p 태그 스타일 */
  .notion-editor p {
    margin: 0 0 1em 0 !important;
    min-height: 1.2em !important;
    line-height: 1.6 !important;
    display: block !important;
  }
  
  .notion-editor p:empty {
    margin: 0 0 1em 0 !important;
    min-height: 1.2em !important;
    display: block !important;
  }
  
  .notion-editor p:empty::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 1.2em;
  }
  
  .notion-editor p:last-child {
    margin-bottom: 0 !important;
  }

  /* 전체 에디터 영역 스타일 */
  .ProseMirror p {
    margin: 0 0 1em 0 !important;
    min-height: 1.2em !important;
    line-height: 1.6 !important;
  }
  
  .ProseMirror p:empty {
    margin: 0 0 1em 0 !important;
    min-height: 1.2em !important;
  }
  
  .ProseMirror p:empty::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 1.2em;
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
  z-index: 2;
  position: relative;
  border-radius: 1rem;
`;

export const Logo = styled.img`
  height: 4rem; 
  width: auto;
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

export const Input = styled.input`
    display: flex;
    width: 60%;
    margin-left: 12%;
    background-color: #e9e9e9ff;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;

    &:hover {
        outline: none;
    }
`;