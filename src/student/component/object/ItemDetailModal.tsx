import React, { useEffect, useState } from 'react';
import * as _ from './modalStyle';
import { deleteTemporaryItem } from '../../../api/object/delete';
import { updateItem, TempItemRequestDto } from '../../../api/object/apply';

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
  onUpdate?: () => void;
  onEdit?: (formData: any) => void;
  allowEdit?: boolean;
}

interface EditState {
  isEditing: boolean;
  formData: {
    product_name: string;
    quantity: number;
    price: string;
    productLink: string;
    reason: string;
  };
  isLoading: boolean;
  errors: Record<string, string>;
}

export default function ItemDetailModal({
  item,
  onClose,
  hideReason = false,
  onDelete,
  onUpdate,
  onEdit,
  allowEdit = false
}: ItemDetailModalProps) {

  // Edit state management
  const [editState, setEditState] = useState<EditState>({
    isEditing: false,
    formData: {
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price || '',
      productLink: item.productLink || '',
      reason: item.reason,
    },
    isLoading: false,
    errors: {},
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

  // Toggle edit mode
  const handleEditToggle = () => {
    setEditState(prev => ({
      ...prev,
      isEditing: !prev.isEditing,
      errors: {}, // Clear errors when toggling
    }));
  };

  // Handle form field changes
  const handleFormChange = (field: keyof EditState['formData'], value: string | number) => {
    setEditState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
      errors: {
        ...prev.errors,
        [field]: '', // Clear field error when user types
      },
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const { product_name, quantity, price, reason } = editState.formData;

    if (!product_name.trim()) {
      errors.product_name = '물품명을 입력하세요.';
    }

    if (quantity <= 0) {
      errors.quantity = '수량은 1개 이상이어야 합니다.';
    }

    const priceNum = parseInt(price);
    if (!price.trim() || isNaN(priceNum) || priceNum <= 0) {
      errors.price = '유효한 가격을 입력하세요.';
    }

    if (reason.trim().length < 10) {
      errors.reason = '신청 사유를 10자 이상 입력하세요.';
    }

    setEditState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  // Handle edit button click - populate form and delete original item
  const handleEditClick = async () => {
    if (window.confirm("수정하시겠습니까? 기존 신청이 삭제되고 입력 폼에 데이터가 채워집니다.")) {
      try {
        // Delete the original item first
        await deleteTemporaryItem(Number(item.id));

        // Populate the form with item data (this would be handled by parent component)
        if (onEdit) {
          onEdit(editState.formData);
        }

        // Close modal and refresh list
        onDelete?.();
        onClose();
        alert('기존 신청이 삭제되었습니다. 입력 폼에서 수정해주세요.');

      } catch (error: any) {
        alert(error.message || '수정 준비에 실패했습니다.');
      }
    }
  };

  // Handle form submission (for direct edit mode if needed)
  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setEditState(prev => ({ ...prev, isLoading: true }));

    try {
      const updateData: TempItemRequestDto = {
        product_name: editState.formData.product_name,
        quantity: editState.formData.quantity,
        price: editState.formData.price,
        productLink: editState.formData.productLink,
        reason: editState.formData.reason,
      };

      await updateItem(Number(item.id), updateData);

      // Success - close modal and refresh
      onUpdate?.();
      onClose();
      alert('물품 정보가 수정되었습니다.');

    } catch (error: any) {
      alert(error.message || '물품 수정에 실패했습니다.');
    } finally {
      setEditState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, editState.formData.quantity + delta);
    handleFormChange('quantity', newQuantity);
  };

  return (
    <_.Backdrop onClick={handleBackdropClick}>
      <_.Modal>
        <_.Header>
          <_.Title>{editState.isEditing ? '물품 정보 수정' : '물품 상세 정보'}</_.Title>
          <_.CloseButton onClick={onClose}>×</_.CloseButton>
        </_.Header>

        <_.Content>
          {editState.isEditing ? (
            // Edit Mode
            <>
              <_.FormRow>
                <_.InfoRow>
                  <_.Label>물품 링크</_.Label>
                  <_.FormInput
                    type="text"
                    value={editState.formData.productLink}
                    onChange={(e) => handleFormChange('productLink', e.target.value)}
                    placeholder="구입할 물품의 링크를 입력해 주세요"
                  />
                </_.InfoRow>
                {editState.errors.productLink && (
                  <_.ErrorText>{editState.errors.productLink}</_.ErrorText>
                )}
              </_.FormRow>

              <_.FormRow>
                <_.InfoRow>
                  <_.Label>물품명</_.Label>
                  <_.FormInput
                    type="text"
                    value={editState.formData.product_name}
                    onChange={(e) => handleFormChange('product_name', e.target.value)}
                    placeholder="구입할 물품을 입력해 주세요"
                  />
                </_.InfoRow>
                {editState.errors.product_name && (
                  <_.ErrorText>{editState.errors.product_name}</_.ErrorText>
                )}
              </_.FormRow>

              <_.FormRow>
                <_.FormGroup>
                  <_.Label>가격</_.Label>
                  <_.FormInput
                    type="text"
                    value={editState.formData.price}
                    onChange={(e) => handleFormChange('price', e.target.value)}
                    placeholder="가격을 입력해 주세요"
                    style={{ width: '150px' }}
                  />
                  <_.Label>수량</_.Label>
                  <_.QtyWrapper>
                    <_.QtyButton onClick={() => handleQuantityChange(-1)}>–</_.QtyButton>
                    <_.QtyDisplay>{editState.formData.quantity}</_.QtyDisplay>
                    <_.QtyButton onClick={() => handleQuantityChange(1)}>+</_.QtyButton>
                  </_.QtyWrapper>
                </_.FormGroup>
                {(editState.errors.price || editState.errors.quantity) && (
                  <_.ErrorText>
                    {editState.errors.price || editState.errors.quantity}
                  </_.ErrorText>
                )}
              </_.FormRow>

              <_.FormRow>
                <_.InfoRow>
                  <_.Label>신청 사유</_.Label>
                  <_.FormTextArea
                    value={editState.formData.reason}
                    onChange={(e) => handleFormChange('reason', e.target.value)}
                    placeholder="신청 사유를 10자 이상 입력해 주세요"
                  />
                </_.InfoRow>
                {editState.errors.reason && (
                  <_.ErrorText>{editState.errors.reason}</_.ErrorText>
                )}
              </_.FormRow>
            </>
          ) : (
            // View Mode
            <>
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
            </>
          )}
        </_.Content>

        <_.Footer>
          {editState.isEditing ? (
            // Edit Mode Footer
            <>
              <_.CancelButton onClick={handleEditToggle}>취소</_.CancelButton>
              <_.SaveButton
                onClick={handleFormSubmit}
                disabled={editState.isLoading}
              >
                {editState.isLoading && <_.LoadingSpinner />}
                저장
              </_.SaveButton>
            </>
          ) : (
            // View Mode Footer
            <>
              <div>
                {item.status === "INTEMP" && onDelete && (
                  <_.DeleteButton onClick={handleDelete}>삭제</_.DeleteButton>
                )}
                {item.status === "INTEMP" && allowEdit && (
                  <_.EditButton onClick={handleEditClick}>수정</_.EditButton>
                )}
              </div>
              <_.ConfirmButton onClick={onClose}>확인</_.ConfirmButton>
            </>
          )}
        </_.Footer>
      </_.Modal>
    </_.Backdrop>
  );
}