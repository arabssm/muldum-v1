import { useState, useEffect } from 'react';
import * as _ from './style';
import NavBar from '@_all/component/sibebar/sidebar';
import type { Props } from './types';
import { tchitem } from '../../../../api/object/apply';
import DetailItem from '@_components/Modal/Delete/DeleteModal';

export default function ApprovalList({
  id,
  selectedItems,
  setSelectedItems,
  setAllItemIds,
  reasons,
  setReasons,
}: Props & { setAllItemIds: (ids: number[]) => void; reasons: any; setReasons: any }) {
  const [data, setData] = useState<any[]>([]);

  const handleReasonChange = (id: number, value: string) => {
    setReasons((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  useEffect(() => {
    tchitem(id)
      .then((res) => {
        // ✅ 서버 응답 정규화
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
        console.error('API 실패', err);
      });
  }, [id, setAllItemIds]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const handleItemClick = (name: string) => {
    setSelectedName(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedName('');
  };

  return (
    <_.Container>
      <NavBar />
      <_.ListWrapper>
        {data.map((item, index) => (
          <_.ItemRow
            key={item.id ?? `row-${index}`}   // ✅ key 안전하게
            onClick={() => handleSelect(item.id)}
          >
            <_.ItemIndex selected={selectedItems.includes(item.id)}>
              {String(index + 1).padStart(2, '0')}
            </_.ItemIndex>
            <_.ItemName href={item.productLink} target="_blank">
              {item.productName}
            </_.ItemName>
            <_.ItemInput
              placeholder={item.reason}
              value={reasons[item.id] || ''}
              onChange={(e) => handleReasonChange(item.id, e.target.value)}
            />
          </_.ItemRow>
        ))}
      </_.ListWrapper>
      {modalOpen && (
        <DetailItem
          name={selectedName}
          onConfirm={() => {
            console.log(`${selectedName} 삭제!`);
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </_.Container>
  );
}
