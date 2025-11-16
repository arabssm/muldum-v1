import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 0.1rem solid #B2B2B2;
  border-radius: 0.25rem;
  padding: 1rem;
`;

export const ItemIndex = styled.div<{ selected?: boolean }>`
  width: 3%;
  padding: 1%;
  border: none;
  border-right: 1px solid #B2B2B2;
  color: ${({ selected }) => (selected ? '#FF9B62' : '#323232')};
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

export const ItemName = styled.a`
  flex: 1;
  font-size: 1rem;
  padding: 1% 2%;
  color: #333;
  text-decoration: none;
  border-right: 1px solid #B2B2B2;

  &:hover {
    text-decoration: underline;
  }
`;

export const ItemInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  font-size: 1rem;
  color: #323232;
  font-family: 'Paperlogy';

  &::placeholder {
    color: #909090;
  }

  &:focus {
    outline: none;
    border-color: #FF9B62;
  }
`;

export const ItemText = styled.div`
  width: 40%;
  padding: 1% 2%;
  font-size: 1rem;
  color: #323232;
  font-family: 'Paperlogy';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  
  &:hover {
    color: #FF9B62;
    text-decoration: underline;
  }
`;

export const EmptyMessage = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  text-align: center;
  font-size: 1.1rem;
  color: #909090;
  background-color: #FAFAFA;
  border-radius: 0.25rem;
`;

export const ReasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 40%;
  padding: 0 2%;
`;

export const TemplateSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  font-size: 1rem;
  color: #323232;
  font-family: 'Paperlogy';
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #FF9B62;
  }
`;
