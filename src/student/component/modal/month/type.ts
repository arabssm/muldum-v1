export interface ScheduleModalProps {
    onClose: () => void;
    onSave: (startDate: string, endDate: string, text: string) => void;
    initialStartDate?: string;
}