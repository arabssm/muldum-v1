import styled from '@emotion/styled';

export const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 16px;
    padding: 2rem;
    width: 20%;
    height: 12vh;
    border-radius: 1rem;
    text-align: center;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.div`
    margin-bottom: 1rem;
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
`;

export const Message = styled.div`
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #555;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const Button = styled.button`
    cursor: pointer;
    border: none;
    background-color: #fff;
`;

export const Google = styled.img`
    width: 15%;
    margin-top: 0.6%;
`;