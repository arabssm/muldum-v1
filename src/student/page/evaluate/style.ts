import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    margin-left: 15%;
`;

export const Title = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 1%;
    margin-top: 3%;
`;

export const Wrapper = styled.div`
    display: flex;
    width: 83%;
    justify-content: space-between;
`;

export const BtnGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ButtonBase = styled.button`
    display: flex;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    color: #fff;
    border: none;
    border-radius: 4rem;
    cursor: pointer;
    font-family: 'Paperlogy';
`;

export const Submit = styled(ButtonBase)`
    background-color: #FF9B62;

    :hover {
        background-color: #FF823A;
    }
`;

export const SaveBtn = styled(ButtonBase)`
    background-color: #909090;

    :hover {
        background-color: #707070;
    }
`;

export const Form = styled.div`
    width: 80%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: inherit;

    &:focus {
        outline: none;
    }

    &::placeholder{
        color: #CCCBCA;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 10rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: inherit;
    resize: none;

    &:focus {
        outline: none;
    }
`;

export const Label = styled.label`
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.4rem;
`;

export const FeedbackWrapper = styled.div`
    display: flex;
    gap: 3rem;
    margin-top: 1.5rem;
`;

export const FeedbackBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
`;
