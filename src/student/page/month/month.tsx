import { useState } from "react";
import dayjs from "dayjs";
import NavBar from "@_navbar/sidebar";
import * as _ from "./style";
import styled from "@emotion/styled";

export default function Month() {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
    const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
    const handleToday = () => setCurrentDate(dayjs());

    const year = currentDate.year();
    const month = currentDate.month();
    const startDay = dayjs(new Date(year, month, 1)).day();
    const endDate = currentDate.daysInMonth();
    const totalCells = Math.ceil((startDay + endDate) / 7) * 7;

    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <_.Container>
        <NavBar />
        <_.Title>공유캘린더</_.Title>
        <_.Subtitle>팀원들과 일정을 공유해요</_.Subtitle>
        <_.CalendarContainer>
            <_.CalendarHeader>
            <_.Months>{currentDate.format("YYYY년 M월")}</_.Months>
            <_.NavButtonGroup>
                <_.NavButton onClick={handlePrevMonth}>&lt;</_.NavButton>
                <_.NavButton onClick={handleToday}>오늘</_.NavButton>
                <_.NavButton onClick={handleNextMonth}>&gt;</_.NavButton>
            </_.NavButtonGroup>
            </_.CalendarHeader>
            <_.Weekdays>
            {weekdays.map((day) => (
                <_.WeekdayItem key={day}>{day}</_.WeekdayItem>
            ))}
            </_.Weekdays>
            <_.Dates>
            {Array.from({ length: totalCells }, (_, i) => {
                const date = i - startDay + 1;
                const isCurrentMonth = date > 0 && date <= endDate;

                return (
                <DateCell key={i} highlight={date === 20 && isCurrentMonth} inactive={!isCurrentMonth} >
                    {isCurrentMonth ? date : ""}
                </DateCell>
                );
            })}
            </_.Dates>
        </_.CalendarContainer>
        </_.Container>
    );
}

const DateCell = styled.div<{ highlight?: boolean; inactive?: boolean }>`
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0.5rem;
    border: 0.06rem solid #d1d1d1;
    color: ${({ inactive }) => (inactive ? "#ccc" : "#000")};
`;