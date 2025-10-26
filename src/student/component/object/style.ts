import styled from '@emotion/styled';

export const Card = styled.div`
    background: #fff;
    border-radius: 0.75rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    overflow: hidden;
    border: 1px solid #eee;
`;

export const FieldGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
`;

export const Label = styled.label`
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    color: #1D1D1D;
    margin-bottom: 0.5rem;
    width: 10%;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #555;

    &:focus {
        outline: none;
        border-color: #ff9240;
        background-color: #fff;
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    min-height: 7.5rem;
    padding: 0.75rem 1rem;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    background-color: #fff;

    &:focus {
        outline: none;
        border-color: #ff9240;
    }
`;

export const TextareaDisplay = styled.div`
    width: 100%;
    min-height: 7.5rem;
    padding: 0.75rem 1rem;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #555;
    cursor: text;
`;

export const SubmitButton = styled.button`
    width: 7.5rem;
    padding: 0.75rem 0;
    background-color: #FF9B62;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    border-radius: 99px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-family: 'Paperlogy';
    margin-bottom: 2%;
    margin-left: 88%;

    &:hover {
        background-color: #ff7a1c;
    }
`;

export const CardRow = styled.div`
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
`;

export const Cell = styled.div<{ flex: string }>`
    flex: ${({ flex }) => flex};
    font-size: 0.875rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ReasonRow = styled.div`
    padding: 0.75rem 1rem;
    background: #fafafa;
    color: #555;
    cursor: text;
`;

export const ReasonTextarea = styled.textarea`
    width: 100%;
    border: none;
    resize: none;
    background: transparent;
    font-size: 0.875rem;
    line-height: 1.5;
    outline: none;
`;

export const ItemRow = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #fff;
    min-width: 0;
    width: 96.7%;
    box-sizing: border-box;
    
    &:hover {
        background-color: #f8f9fa;
        border-color: #FF9B62;
        box-shadow: 0 2px 4px rgba(255, 155, 98, 0.1);
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const ItemIndex = styled.div`
    flex: 0 0 40px;
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
`;

export const ItemName = styled.div`
    flex: 1;
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
    margin-right: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
`;

export const ItemStatus = styled.div<{ status: string }>`
    flex: 0 0 120px;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: right;
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

export const DeleteButton = styled.button`
    flex: 0 0 60px;
    margin-left: 12px;
    padding: 6px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #c82333;
    }
    
    &:active {
        background-color: #bd2130;
    }
`;