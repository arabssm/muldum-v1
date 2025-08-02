import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    margin-left: 14.5%;
`;

export const Title = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 1%;
    margin-top: 2%;
`;

export const Text = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
`;

export const Subtitle = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.2rem;
    color: #707070;
    margin-bottom: 3%;
`;

export const TabWrapper = styled.div`
    display: flex;
    gap: 3rem;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 1rem;
`;

export const Tab = styled.button<{ active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    margin-top: 1rem;
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    color: ${({ active }) => (active ? 'black' : '#7d7d7d')};
    border-bottom: 0.2rem solid ${({ active }) => (active ? '#FF9B62' : 'transparent')};
    padding-bottom: 0.4rem;
    font-family: 'Paperlogy';
    cursor: pointer;
`;

export const ClubList = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 1rem;
`;

export const ClubButton = styled.button<{ active?: boolean }>`
    display: flex;
    font-size: 1rem;
    align-items: center;
    padding: 0.7rem 1rem;
    border: none;
    background-color: ${({ active }) => (active ? '#FF9B62' : 'B2B2B2')};
    color: ${({ active }) => (active ? '#fff' : '#000')};;
    border-radius: 4px;
    font-family: 'Paperlogy';
    cursor: pointer;
`;