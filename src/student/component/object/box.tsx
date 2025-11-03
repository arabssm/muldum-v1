import { useState, useEffect } from "react";
import type { Request } from "./types";
import * as _ from "./style";
import ItemDetailModal from "./ItemDetailModal";

export default function Box({ 
  request, 
  index, 
  hideReason = false, 
  onDelete, 
  onUpdate,
  onEdit
}: { 
  request: Request; 
  index: number; 
  hideReason?: boolean; 
  onDelete?: () => void;
  onUpdate?: () => void;
  onEdit?: (formData: any) => void;
}) {
  const [state, setState] = useState<string>("");
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  useEffect(() => {
    if (request.status === "INTEMP") {
      setState("임시 신청");
    } else if (request.status === "PENDING") {
      setState("선생님 확인중");
    } else if (request.status === "REJECTED") {
      setState("거절됨");
    } else if (request.status === "APPROVED") {
      setState("승인됨");
    }
  }, [request.status]);

  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleDetailClick = () => {
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
  };

  return (
    <>
      <_.ItemRow onClick={handleDetailClick}>
        <_.ItemIndex>
          {String((index ?? 0) + 1).padStart(2, '0')}
        </_.ItemIndex>
        <_.ItemName>
          {truncateText(request.product_name)}
        </_.ItemName>
        <_.ItemStatus status={request.status}>
          {state}
        </_.ItemStatus>
      </_.ItemRow>

      {detailModalOpen && (
        <ItemDetailModal
          item={request}
          onClose={closeDetailModal}
          hideReason={hideReason}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onEdit={onEdit}
          allowEdit={request.status === "INTEMP"}
        />
      )}
    </>
  );
}
