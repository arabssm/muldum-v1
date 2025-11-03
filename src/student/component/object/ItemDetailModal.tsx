import React, { useEffect, useState } from 'react';
import * as _ from './modalStyle';
import { deleteTemporaryItem } from '../../../api/object/delete';

interface ItemDetailModalProps {
  item: {
    id: string;
    product_name: string;
    quantity: number;
    price?: string;
    productLink?: string;
    reason: string;
    status?: string;
  };
  onClose: () => void;
  hideReason?: boolean;
  onDelete?: () => void;
  onEdit?: (formData: any) => void;
  allowEdit?: boolean;
}

export default function ItemDetailModal({
  item,
  onClose,
  hideReason = false,
  onDelete,
  onEdit,
  allowEdit = false
}: ItemDetailModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const formattedPrice = item.price
    ? `${Number(item.price).toLocaleString()}원`
    : undefined;

  const getStatusText = (status: string) => {
    switch (status) {
      case "INTEMP": return "임시 신청";
      case "PENDING": return "선생님 확인중";
      case "REJECTED": return "거절됨";
      case "APPROVED": return "승인됨";
      default: return status;
    }
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteTemporaryItem(Number(item.id));
        onDelete?.();
        onClose();
        alert("삭제되었습니다.");
      } catch (error) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // Handle edit button click - populate form and delete original item
  const handleEditClick = async () => {
    if (window.confirm("수정하시겠습니까? 기존 신청이 삭제되고 입력 폼에 데이터가 채워집니다.")) {
      try {
        // Delete the original item first
        await deleteTemporaryItem(Number(item.id));

        // Populate the form with item data
        if (onEdit) {
          onEdit({
            product_name: item.product_name,
            quantity: item.quantity,
            price: item.price || '',
            productLink: item.productLink || '',
            reason: item.reason,
          });
        }

        // Close modal and refresh list
        onDelete?.();
        onClose();
        alert('기존 신청이 삭제되었습니다. 입력 폼에서 수정해주세요.');

      } catch (error: any) {
        alert('수정 준비에 실패했습니다.');
      }
    }
  };

  return (
    <_.Backdrop onClick={handleBackdropClick}>
      <_.Modal>
        <_.Header>
          <_.Title>물품 상세 정보</_.Title>
          <_.CloseButton onClick={onClose}>×</_.CloseButton>
        </_.Header>

        <_.Content>
          <_.InfoRow>
            <_.Label>물품명</_.Label>
            <_.Value>{truncateText(item.product_name)}</_.Value>
          </_.InfoRow>

          <_.InfoRow>
            <_.Label>수량</_.Label>
            <_.Value>{item.quantity}개</_.Value>
          </_.InfoRow>

          {formattedPrice && (
            <_.InfoRow>
              <_.Label>가격</_.Label>
              <_.Value>{formattedPrice}</_.Value>
            </_.InfoRow>
          )}

          {item.productLink && (
            <_.InfoRow>
              <_.Label>링크</_.Label>
              <_.LinkValue href={item.productLink} target="_blank" rel="noopener noreferrer">
                상품 링크 보기
              </_.LinkValue>
            </_.InfoRow>
          )}

          {!hideReason && (
            <_.InfoRow>
              <_.Label>신청 사유</_.Label>
              <_.ReasonValue>{item.reason}</_.ReasonValue>
            </_.InfoRow>
          )}

          {item.status && (
            <_.InfoRow>
              <_.Label>상태</_.Label>
              <_.StatusValue status={item.status}>{getStatusText(item.status)}</_.StatusValue>
            </_.InfoRow>
          )}
        </_.Content>

        <_.Footer>
          <div>
            {item.status === "INTEMP" && onDelete && (
              <_.DeleteButton onClick={handleDelete}>삭제</_.DeleteButton>
            )}
            {item.status === "INTEMP" && allowEdit && onEdit && (
              <_.ConfirmButton
                onClick={handleEditClick}
                style={{ background: '#28a745', marginRight: '8px' }}
              >
                수정
              </_.ConfirmButton>
            )}
          </div>
          <_.ConfirmButton onClick={onClose}>확인</_.ConfirmButton>
        </_.Footer>
      </_.Modal>
    </_.Backdrop>
  );
}