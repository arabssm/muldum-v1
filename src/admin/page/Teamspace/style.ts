import styled from '@emotion/styled';

export const Wrapper = styled.div`
    width: 100%;
    margin-left: 14.5%;
`; 

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2%;
    margin-bottom: 6%;
`;

export const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 0.5rem;
`;

export const Subtitle = styled.div`
    font-size: 1.2rem;
    color: #707070;
`;

export const Group = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border: none;
    margin-right: 8%;
    cursor: pointer;
`;

export const Img = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.4rem;
    cursor: pointer;
    object-fit: contain;
`;

export const Plus = styled.span`
    font-size: 0.9rem;
    color: #909090;
    font-family: 'Paperlogy';
    cursor: pointer;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 2.2rem;
    border-radius: 0.4rem;
    width: 27rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`;

export const ModalTitle = styled.div`
    display: flex;
    font-size: 1.4rem;
    font-weight: 500;
    color: #1D1D1D;
    margin-bottom: 0.5rem;
`;

export const ModalSubtitle = styled.div`
    font-size: 1rem;
    color: #707070;
`;

export const InviteRow = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;

    input {
        flex: 1;
        padding: 0.6rem;
        border: 1px solid #D1D1D1;
        border-radius: 0.4rem;
        font-size: 0.9rem;
        resize: none;
        font-family: 'Paperlogy';
    }

    button {
        padding: 0 1rem;
        background: #b5b5b5;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        font-family: 'Paperlogy';
        cursor: pointer;

        &:hover {
            background-color: #FF9B62;
        }
    }
`;

export const EmailList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #909090;
    }
`;

export const BtnGroup = styled.div`
    display: flex;
    width: 20%;
    justify-content: end;
`;