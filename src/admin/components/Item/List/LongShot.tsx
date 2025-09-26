import { reason } from '@_pages/Item/Approval/Reason';
import * as _ from '@_pages/Item/Approval/style';
import { Props } from '@_pages/Item/Approval/type';
import { reason } from '@_pages/Item/Approval/Reason';
import '@_styles';

export default function RejectReasonSelector({ rejectReason, setRejectReason }: Props) {
    return (
        <_.RejectReasonArea>
            {reason.map((reasonText) => (
                <_.RejectButton
                    key={reasonText}
                    active={rejectReason === reasonText}
                    onClick={() => setRejectReason(reasonText)}
                >
                    {reasonText}
                </_.RejectButton>
            ))}
        </_.RejectReasonArea>
    );
}