import { useState } from "react";
import * as _ from "./style";
import type { ScheduleModalProps } from "./type";

export default function ScheduleModal({
    onClose,
    onSave,
    initialStartDate,
    }: ScheduleModalProps) {
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(initialStartDate || "");
    const [endDate, setEndDate] = useState(initialStartDate || "");

    const handleSave = () => {
        if (!text.trim()) return;
        if (!startDate || !endDate) return;
        if (startDate > endDate) {
        alert("종료일은 시작일 이후여야 합니다.");
        return;
        }
        onSave(startDate, endDate, text.trim());
    };

    return (
        <_.ModalBackground>
        <_.ModalBox>
            <_.Title>일정 추가</_.Title>

            <_.Label>시작일</_.Label>
            <_.InputDate
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <_.Label>종료일</_.Label>
            <_.InputDate
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
            />

            <_.Label>일정 입력</_.Label>
            <_.TextArea
                placeholder="일정 및 설명을 적으세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <_.BtnGroup>
                <_.CloseBtn onClick={onClose}>닫기</_.CloseBtn>
                <_.SaveBtn onClick={handleSave}>저장하기</_.SaveBtn>
            </_.BtnGroup>
        </_.ModalBox>
        </_.ModalBackground>
    );
}