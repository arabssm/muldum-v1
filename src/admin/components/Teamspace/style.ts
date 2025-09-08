import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    display: flex;
    background-color: #FAFAFA;
    border-radius: 0.5rem;
    width: 18rem;
    padding: 2% 5% 2% 2%;
    flex: 0 0 auto;
    cursor: pointer;
`;


export const BoxWrapper = styled.div`
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    margin-bottom: 4rem;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    &::-webkit-scrollbar {
        height: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background: #fff;
        border-radius: 0.25rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const Title = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 2%;
`;

export const ClubTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 500;
    color: #1D1D1D;
    margin-bottom: 4%;
`;

export const Name = styled.div`
    font-size: 1rem;
    color: #909090;
`;