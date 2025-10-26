import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin: -3rem 0rem;
  position: fixed;
`;

export const Content = styled.div`
  position: absolute;
  right: 0; top: 0; left: 15rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

export const Banner = styled.div`
  width: 100%;
  height: 12rem;
  min-height: 12rem;
  flex-shrink: 0;
  background-color: #41f4bb; 
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding: 0 !important;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.editable {
    cursor: pointer;
    transition: all 0.2s ease;

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

export const ContentArea = styled.div`
  padding: 1rem 12%;
`;

export const Header = styled.div`
  padding: 0;
`;

export const ClubName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;



export const Section = styled.div`
  padding: 1rem 0;
  overflow-x: auto;

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
  min-width: 7rem;
  min-height: 7rem;
  flex-shrink: 0;
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
  min-width: 4rem;
  min-height: 4rem;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 0.5rem;

  &.editable {
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      filter: brightness(0.9);
      transform: scale(0.95);
    }

    &:hover::after {
      content: "클릭하여 로고 변경";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      z-index: 10000;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
    margin-top: 2%;
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