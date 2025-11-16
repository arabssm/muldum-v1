export interface Props {
    selectAll: boolean;
    selectedItems: number[];
    id?: number;
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
    isApproved?: boolean; // 승인된 항목을 보는지 여부
    nth?: number | null; // 차수 필터
}