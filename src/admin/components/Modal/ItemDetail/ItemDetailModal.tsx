import React, { useEffect } from 'react';
import * as _ from './style';

interface ItemDetailModalProps {
  item: {
    id: number;
    productName: string;
    quantity: number;
    price?: string;
    productLink?: string;
    reason: string;
    status?: string;
    teamName?: string;
  };
  onClose: () => void;
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ✅ ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // ✅ 가격 포맷 (예: "3000" → "3,000원")
  const formattedPrice = item.price
    ? `${Number(item.price).toLocaleString()}원`
    : undefined;

  return (
    <_.Backdrop onClick={handleBackdropClick}>
      <_.Modal>
        <_.Header>
          <_.Title>물품 상세 정보</_.Title>
          <_.CloseButton onClick={onClose}>×</_.CloseButton>
        </_.Header>
        
        <_.Content>
          {item.teamName && (
            <_.InfoRow>
              <_.Label>지원팀</_.Label>
              <_.Value>{item.teamName}</_.Value>
            </_.InfoRow>
          )}
          
          <_.InfoRow>
            <_.Label>물품명</_.Label>
            <_.Value>{item.productName}</_.Value>
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
          
          <_.InfoRow>
            <_.Label>신청 사유</_.Label>
            <_.ReasonValue>{item.reason}</_.ReasonValue>
          </_.InfoRow>

          {item.status && (
            <_.InfoRow>
              <_.Label>상태</_.Label>
              <_.StatusValue status={item.status}>{item.status}</_.StatusValue>
            </_.InfoRow>
          )}
        </_.Content>
        
        <_.Footer>
          <_.ConfirmButton onClick={onClose}>확인</_.ConfirmButton>
        </_.Footer>
      </_.Modal>
    </_.Backdrop>
  );
}
