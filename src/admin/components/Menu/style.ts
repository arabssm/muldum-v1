import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2%;
    width: 100%;
    cursor: pointer;
`;

export const MenuArea = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: flex-start;
    width: 15%;
    background-color: #FAFAFA;
    border-radius: 12px;
    padding: 3% 3%;
    margin-bottom: 2%;
    cursor: pointer;
    gap: 12px;
`;

export const Projectname = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
`;

export const Icon = styled.img`
    width: 15%;
`;