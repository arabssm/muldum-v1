import styled from "@emotion/styled";

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

export const Subtitle = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.2rem;
    color: #707070;
    margin-bottom: 3%;
`;

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 30vh;
    padding: 1rem 0rem;
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const NavButton = styled.button`
    margin-left: 0.5rem;
    background: none;
    border: none;
    color: #3F3F3F;
    font-size: 1rem;
    font-family: 'Paperlogy';
    cursor: pointer;
`;

export const Months = styled.div`
    font-size: 1rem;
    color: #3F3F3F;
`;

export const Weekdays = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    color: #909090;
    list-style: none;
    padding: 0;
    margin-bottom: 0.5rem;
`;

export const Dates = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.2rem;
    color: #909090;
`;

export const WeekdayItem = styled.li`
    text-align: center;
    color: #909090;
    margin-bottom: 0.5rem;
    list-style: none;
`;

export const NavButtonGroup = styled.div`
    display: flex;
`;