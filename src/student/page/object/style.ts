import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    height: 100vh;
`;

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    margin-top: 0.2rem;
    margin-left: 14.5%;
    box-sizing: border-box;
`;

export const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
`;

export const Titles = styled.div`
    h1 { margin: 0; font-size: 1.5rem; font-weight: 600; margin-bottom: 4%; }
    h3 { margin: 0.25rem 0 0; font-size: 1rem; color: #666; font-weight: 400; }
`;

export const Subtitle = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.2rem;
    color: #707070;
    margin-bottom: 3%;
`;

export const AllTitle = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 1%;
    margin-top: 2%;
`;

export const BudgetBox = styled.div`
    text-align: right;
    background: #fff;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    span { display: block; font-size: 0.875rem; color: #999; }
    strong { display: block; font-size: 1.25rem; color: #333; margin-top: 0.25rem; }
`;

export const Used = styled.span`
    display: block;
    font-size: 0.875rem;
    color: #ff4d4f;
    margin-top: 0.125rem;
`;

export const SectionTitle = styled.h2`
    font-size: 1.125rem;
    font-weight: 500;
`;

export const FormSection = styled.div`
    background: #fff;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
`;

export const FormSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const AddButton = styled.button`
    background: #FF9B62;
    color: #fff;
    border: none;
    padding: 0 1.25rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    cursor: pointer;
    font-family: 'Paperlogy';
`;

export const FormRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    flex: 0 0 5rem;
    font-size: 0.875rem;
    color: #333;
`;

export const Input = styled.input`
  flex: 1 1 12.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Paperlogy';
`;

export const Input1 = styled.input`
  height: 3rem;
  font-size: 0.75rem;
  line-height: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Paperlogy';
`;



export const FullWidthInput = styled(Input)`
    flex: 1 1 100%;
`;

export const QtyWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    overflow: hidden;
`;

export const QtyButton = styled.button`
    width: 2rem;
    height: 2rem;
    background: #f0f0f0;
    border: none;
    font-size: 1.125rem;
    cursor: pointer;
`;

export const Qty = styled.div`
    width: 2.5rem;
    text-align: center;
    font-size: 0.875rem;
`;

export const TextArea = styled.textarea`
    flex: 1;
    height: 6.25rem;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    resize: vertical;
    font-family: 'Paperlogy';
`;

export const ListSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 2rem;
    min-height: 0;
`;

export const ListSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const ApplyButton = styled.button`
    background: #FF9B62;
    color: #fff;
    border: none;
    padding: 0 1.25rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    cursor: pointer;
    font-family: 'Paperlogy';
`;

export const ListWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-top: 3%;
`;

export const Footer = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    padding-top: 1rem;
    font-size: 0.875rem;
    color: #909090;
`;

export const FooterLink = styled.a`
    text-decoration: none;
    cursor: pointer;
    &:hover { text-decoration: underline; }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100px;
  resize: none;
`;

export const RejectButton = styled.button`
  align-self: flex-end;
  background-color: #ff9a5a;
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;

export const ProductList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export const ProductCard = styled.div`
  width: 160px;
  height: 120px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ProductCategory = styled.div`
  font-size: 12px;
  color: #ff6833;
`;

export const ProductName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const TextContainer = styled.div`
  margin-bottom: 30px;
`;
