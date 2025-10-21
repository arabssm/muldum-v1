import styled from '@emotion/styled';

export const Container = styled.div`
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FAFAFA;
    border-radius: 1rem;
    width: 70%;
    height: 100%;    
    padding: 4%;
    flex: 0 0 auto;
    cursor: pointer;
    gap: 30%;
`;


export const BoxWrapper = styled.div`
    display: grid;
    gap: 2rem;
    padding-bottom: 1rem;
    margin-bottom: 4rem;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 3.5rem;
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
`;

export const FilterContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
    padding: 0.5rem 0;
    border: none;
    background: transparent;
    color: ${props => props.isActive ? '#FF9B62' : '#666'};
    cursor: pointer;
    font-size: 1rem;
    font-weight: ${props => props.isActive ? '600' : '400'};
    position: relative;
    transition: all 0.2s ease;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props => props.isActive ? '#FF9B62' : 'transparent'};
        transition: all 0.2s ease;
    }

    &:hover {
        color: #FF9B62;
        
        &::after {
            background-color: ${props => props.isActive ? '#FF9B62' : '#ccc'};
        }
    }
`;

export const ClubTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 500;
    color: #1D1D1D;
    display: flex;
`;

export const Name = styled.div`
    font-size: 1rem;
    color: #909090;
`;