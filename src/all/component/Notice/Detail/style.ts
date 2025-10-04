import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    margin-left: 6%;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 2%;
    width: 100%;
    margin-left: 8%;
`;

export const PageTitle = styled.div`
    display: flex;
    justify-content: left;
    margin-bottom: 1%;
    font-weight: 600;
    font-size: 1.5rem;
    color: #1D1D1D;
`;

export const Addition = styled.span`
    font-size: 0.8rem;
    color: #B2B2B2;
`;

export const Image = styled.img`
    width: 90%;
    border-radius: 4px;
    margin-top: 3%;
`;

export const ImageCaption = styled.span`
    font-size: 0.8rem;
    margin-top: 1%;
    color: #B2B2B2;
`;

export const Content = styled.div`
    margin-top: 1%;
    line-height: 1;
    font-size: 1rem;
    width: 90%;
    line-height: 1.5;

`;

export const BackButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
    margin-left: 7%;
    color: #fff;
    background: none;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
    align-self: flex-start;
    font-family: 'Paperlogy';
`;

export const AdditionRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;
    margin-top: 1%;
`;

export const AdditionLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4%;
`;

export const ButtonGroup = styled.div`
    display: flex;

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

export const pic = styled.img`
    width: 100%;
    margin-top: 2%;
`; 

export const Back = styled.img`
    margin-bottom: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;