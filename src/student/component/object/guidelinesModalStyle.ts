import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  font-family: 'Paperlogy', sans-serif;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
`;

export const Content = styled.div`
  padding: 24px;
`;

export const GuidelineText = styled.p`
  margin: 0 0 16px 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  font-family: 'Paperlogy', sans-serif;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Highlight = styled.span`
  color: #FF9B62;
  font-weight: 600;
`;

export const WarningText = styled.p`
  margin: 20px 0 0 0;
  padding: 16px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #856404;
  font-family: 'Paperlogy', sans-serif;
`;

export const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  font-family: 'Paperlogy', sans-serif;
`;

export const CloseButtonStyled = styled.button`
  background: #FF9B62;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  
  &:hover {
    background: #e8854e;
  }
`;