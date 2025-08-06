import styled from "@emotion/styled";

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 30%;
`;

export const Title = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 0.32rem;
    margin-top: 0.32rem;
`;

export const Label = styled.div`
    display: flex;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

export const InputDate = styled.input`
    width: 100%;
    padding: 0.6rem;
    font-size: 0.875rem;
    box-sizing: border-box;
    border: 0.063rem solid #D1D1D1;
    font-family: 'Paperlogy';
`;

export const TextArea = styled.textarea`
    width: 94%;
    height: 6.25rem;
    font-size: 0.875rem;
    padding: 1rem;
    border: 0.063rem solid #D1D1D1;
    resize: none;
    font-family: 'Paperlogy';
`;

export const BtnGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    gap: 0.5rem;
`;

export const SaveBtn = styled.button`
    background-color: #FF9B62;
    font-size: 1rem;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6.2rem;
    cursor: pointer;
    font-family: 'Paperlogy';

    &:hover {
        background-color: #FF8C49;
    }
`;

export const CloseBtn = styled.button`
    font-size: 1rem;
    background-color: #D1D1D1;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6.2rem;
    cursor: pointer;
    font-family: 'Paperlogy';

    &:hover {
        background-color: #B2B2B2;
    }
`;