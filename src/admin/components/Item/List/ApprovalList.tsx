import { useState, useEffect } from 'react';
import * as _ from './style';
import NavBar from '@_all/component/sibebar/sidebar';
import type { Props } from './types';
import { tchitem, tchitem111, tchitemAll, tchitemAllApproved } from '../../../../api/object/apply';
import DetailItem from '@_components/Modal/Delete/DeleteModal';
import ItemDetailModal from '../../Modal/ItemDetail/ItemDetailModal';

export default function ApprovalList({
  id,
  selectedItems,
  setSelectedItems,
  setAllItemIds,
  reasons,
  setReasons,
  isApproved = false,
  isAllClubs = false,
}: Props & { setAllItemIds: (ids: number[]) => void; reasons: any; setReasons: any; isAllClubs?: boolean }) {
  const [data, setData] = useState<any[]>([]);

  const handleReasonChange = (id: number, value: string) => {
    setReasons((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSelect = (id: number) => {
    if (isApproved) return;

    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  useEffect(() => {
    if (isAllClubs) {
      const apiCall = isApproved ? tchitemAllApproved : tchitemAll;

      apiCall()
        .then((res) => {
          const normalized = (res ?? []).map((raw: any, idx: number) => {
            const numId = Number(raw.item_id ?? idx);
            return {
              ...raw,
              id: numId,
              productName: raw.product_name ?? '이름 없음',
            };
          });

          setData(normalized);
          setAllItemIds(normalized.map((item) => item.id));
        })
        .catch((err) => {
        });
    } else if (id !== undefined) {
      const apiCall = isApproved ? tchitem111 : tchitem;

      apiCall(String(id))
        .then((res) => {
          const normalized = (res ?? []).map((raw: any, idx: number) => {
            const numId = Number(raw.item_id ?? idx);
            return {
              ...raw,
              id: numId,
              productName: raw.product_name ?? '이름 없음',
            };
          });

          setData(normalized);
          setAllItemIds(normalized.map((item) => item.id));
        })
        .catch((err) => {
        });
    }
  }, [id, setAllItemIds, isApproved, isAllClubs]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (name: string) => {
    setSelectedName(name);
    setModalOpen(true);
  };

  const handleDetailClick = (item: any) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedName('');
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <_.ListWrapper>
        {data.map((item, index) => (
          <_.ItemRow
            key={item.id ?? `row-${index}`}
            onClick={() => handleSelect(item.id)}
            style={{ cursor: isApproved ? 'default' : 'pointer' }}
          >
            <_.ItemIndex selected={selectedItems.includes(item.id)}>
              {String(index + 1).padStart(2, '0')}
            </_.ItemIndex>
            <_.ItemName 
              href={item.productLink} 
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                handleDetailClick(item);
              }}
            >
              {item.productName}
            </_.ItemName>
            {!isApproved && (
              <_.ItemInput
                placeholder="거절시, 이 부분에다가 거절사유를 입력해주세요"
                value={reasons[item.id] || ''}
                onChange={(e) => handleReasonChange(item.id, e.target.value)}
              />
            )}
            {isApproved && (
              <_.ItemText onClick={() => handleDetailClick(item)}>
                {item.reason}
              </_.ItemText>
            )}
          </_.ItemRow>
        ))}
      </_.ListWrapper>
      {modalOpen && (
        <DetailItem
          name={selectedName}
          onConfirm={() => {
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
      {detailModalOpen && selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={closeDetailModal}
        />
      )}
    </>
  );
}
