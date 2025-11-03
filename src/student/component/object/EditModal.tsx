import React, { useState, useEffect } from 'react';
import * as _ from './modalStyle';
import { updateItemRequest } from '../../../api/object/update';
import Get from '../../../api/object/sss';

interface EditModalProps {
  item: {
    id: string;
    product_name: string;
    quantity: number;
    price?: string;
    productLink?: string;
    reason: string;
  };
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditModal({ item, onClose, onUpdate }: EditModalProps) {
  const [formData, setFormData] = useState({
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price || '',
    productLink: item.productLink || '',
    reason: item.reason
  });

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

  const handleGetLink = async (linkValue: string) => {
    if (!linkValue.trim()) {
      return;
    }

    try {
      const data = await Get(linkValue);
      if (data.name) {
        setFormData(prev => ({ ...prev, product_name: data.name }));
      }
      if (data.price) {
        setFormData(prev => ({ ...prev, price: data.regularPrice.toString() }));
      }
      alert("가격이 정가와 동일한지 확인해주세요.");
    } catch (err) {
      alert('링크 정보를 가져오는데 실패했습니다.');
    }
  };

  const handleLinkBlur = () => {
    if (formData.productLink.trim()) {
      handleGetLink(formData.productLink);
    }
  };

  const handleSubmit = async () => {
    if (!formData.product_name.trim() || formData.reason.trim().length < 10) {
      alert('물품명과 사유(10자 이상)를 입력하세요.');
      return;
    }

    const priceNum = parseInt(formData.price);
    if (!formData.price.trim() || isNaN(priceNum) || priceNum <= 0) {
      alert('유효한 가격을 입력하세요.');
      return;
    }

    try {
      await updateItemRequest(Number(item.id), {
        product_name: formData.product_name,
        quantity: formData.quantity,
        price: formData.price,
        productLink: formData.productLink,
        reason: formData.reason
      });
      
      alert('수정이 완료되었습니다.');
      onUpdate();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || '수정에 실패했습니다.');
    }
  };

  return (
    <_.Backdrop onClick={handleBackdropClick}>
      <_.Modal style={{ width: '500px', maxHeight: '80vh', overflow: 'auto' }}>
        <_.Header>
          <_.Title>물품 신청 수정</_.Title>
          <_.CloseButton onClick={onClose}>×</_.CloseButton>
        </_.Header>

        <_.Content>
          <_.FormRow>
            <_.Label>물품 링크</_.Label>
            <_.Input
              placeholder="구입할 물품의 링크를 입력해 주세요"
              value={formData.productLink}
              onChange={(e) => setFormData(prev => ({ ...prev, productLink: e.target.value }))}
              onBlur={handleLinkBlur}
            />
          </_.FormRow>

          <_.FormRow>
            <_.Label>구입물품</_.Label>
            <_.Input
              placeholder="구입할 물품을 입력해 주세요"
              value={formData.product_name}
              onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
            />
          </_.FormRow>

          <_.FormRow>
            <_.Label>정가</_.Label>
            <_.Input
              placeholder="가격을 입력해 주세요"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            />
          </_.FormRow>

          <_.FormRow>
            <_.Label>수량</_.Label>
            <_.QtyWrapper>
              <_.QtyButton onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}>
                –
              </_.QtyButton>
              <_.Qty>{formData.quantity}</_.Qty>
              <_.QtyButton onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>
                +
              </_.QtyButton>
            </_.QtyWrapper>
          </_.FormRow>

          <_.FormRow>
            <_.Label>신청 사유</_.Label>
            <_.TextArea
              placeholder="신청 사유를 10자 이상 입력해 주세요"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            />
          </_.FormRow>
        </_.Content>

        <_.Footer>
          <_.CancelButton onClick={onClose}>취소</_.CancelButton>
          <_.ConfirmButton onClick={handleSubmit}>수정 완료</_.ConfirmButton>
        </_.Footer>
      </_.Modal>
    </_.Backdrop>
  );
}