import { useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import NavBar from "@_navbar/sidebar";
import * as _ from "./style";
import styled from "@emotion/styled";
import ScheduleModal from "@_component/modal/month/month";

dayjs.extend(isSameOrAfter); dayjs.extend(isSameOrBefore);
const COLORS = ["#f8bebe", "#fdd9a0", "#fff3a6", "#b8f2c9", "#a0c4ff", "#d0bfff", "#f6c4ec"];
let colorIndex = 0;

export default function Month() {
    const [date, setDate] = useState(dayjs());
    const [sel, setSel] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [schedules, setSchedules] = useState<{ startDate: string; endDate: string; text: string; color: string }[]>([]);

    const save = (startDate: string, endDate: string, text: string) => {
        setSchedules((prev) => [...prev, { startDate, endDate, text, color: COLORS[colorIndex++ % COLORS.length] }]);
        setOpen(false); setSel(null);
    };

    const year = date.year(), month = date.month();
    const startDay = dayjs(new Date(year, month, 1)).day();
    const daysInMonth = date.daysInMonth();
    const total = Math.ceil((startDay + daysInMonth) / 7) * 7;

    return (
        <_.Container>
        <NavBar />
        <_.Title>공유캘린더</_.Title>
        <_.Subtitle>팀원들과 일정을 공유해요</_.Subtitle>
        <_.CalendarContainer>
            <_.CalendarHeader>
            <_.Months>{date.format("YYYY년 M월")}</_.Months>
            <_.NavButtonGroup>
                <_.NavButton onClick={() => setDate(date.subtract(1, "month"))}>&lt;</_.NavButton>
                <_.NavButton onClick={() => setDate(dayjs())}>오늘</_.NavButton>
                <_.NavButton onClick={() => setDate(date.add(1, "month"))}>&gt;</_.NavButton>
            </_.NavButtonGroup>
            </_.CalendarHeader>
            <_.Weekdays>{["일", "월", "화", "수", "목", "금", "토"].map((d) => <_.WeekdayItem key={d}>{d}</_.WeekdayItem>)}</_.Weekdays>
            <_.Dates>
            {Array.from({ length: total }, (_, i) => {
                const d = i - startDay + 1, inMonth = d > 0 && d <= daysInMonth;
                const full = dayjs(new Date(year, month, d)).format("YYYY-MM-DD");
                const events = schedules.filter(s => dayjs(full).isSameOrAfter(s.startDate, "day") && dayjs(full).isSameOrBefore(s.endDate, "day"));
                return (
                <DateCell key={i} inactive={!inMonth} onClick={() => inMonth && (setSel(full), setOpen(true))}>
                    {inMonth && d}
                    {events.map((s, idx) => <EventBadge key={idx} color={s.color} title={`${s.text} (${s.startDate} ~ ${s.endDate})`}>{s.text}</EventBadge>)}
                </DateCell>
                );
            })}
            </_.Dates>
        </_.CalendarContainer>
        {open && sel && <ScheduleModal onClose={() => setOpen(false)} onSave={save} initialStartDate={sel} />}
        </_.Container>
    );
}

const DateCell = styled.div<{ inactive?: boolean }>`
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0.5rem;
    border: 0.06rem solid #d1d1d1;
    color: ${({ inactive }) => (inactive ? "#ccc" : "#000")};
    cursor: pointer;
`;

const EventBadge = styled.div<{ color: string }>`
    margin-top: 0.3rem;
    padding: 0.2rem 0.3rem;
    background-color: ${({ color }) => color};
    border-radius: 4px;
    font-size: 0.6rem;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
`;