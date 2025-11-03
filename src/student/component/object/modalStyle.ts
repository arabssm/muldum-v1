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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
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

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.div`
  flex: 0 0 80px;
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
`;

export const Value = styled.div`
  flex: 1;
  color: #333;
  font-size: 0.9rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
`;

export const LinkValue = styled.a`
  flex: 1;
  color: #FF9B62;
  text-decoration: none;
  font-size: 0.9rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ReasonValue = styled.div`
  flex: 1;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StatusValue = styled.div<{ status: string }>`
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ status }) => {
    switch (status) {
      case 'APPROVED': return '#28a745';
      case 'REJECTED': return '#dc3545';
      case 'PENDING': return '#ffc107';
      case 'INTEMP': return '#6c757d';
      default: return '#333';
    }
  }};
`;

export const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const ConfirmButton = styled.button`
  background: #FF9B62;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Paperlogy';
  
  &:hover {
    background: #e8854e;
  }
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Paperlogy';
  margin-right: 8px;
  
  &:hover {
    background: #c82333;
  }
`;

export const EditButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Paperlogy';
  
  &:hover {
    background: #218838;
  }
`;

export const CancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Paperlogy';
  
  &:hover {
    background: #5a6268;
  }
`;

export const FormRow = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Paperlogy';
  
  &:focus {
    outline: none;
    border-color: #FF9B62;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Paperlogy';
  min-height: 80px;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #FF9B62;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const QtyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QtyButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: #f8f9fa;
  }
`;

export const Qty = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 500;
`;