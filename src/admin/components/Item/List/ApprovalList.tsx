import { useState, useEffect } from 'react';
import * as _ from './style';
import type { Props } from './types';
import { tchitem, tchitem111, tchitemAll, tchitemAllApproved, tchitemAllRejected } from '../../../../api/object/apply';
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
  isRejected = false,
  isAllClubs = false,
  clubs = [],
}: Props & {
  setAllItemIds: (ids: number[]) => void;
  reasons: any;
  setReasons: any;
  isApproved?: boolean;
  isRejected?: boolean;
  isAllClubs?: boolean;
  clubs?: { id: number; name: string; hasNewItems: boolean }[];
}) {
  const [data, setData] = useState<any[]>([]);

  const handleReasonChange = (id: number, value: string) => {
    setReasons((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSelect = (id: number) => {
    if (isApproved || isRejected) return;

    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  useEffect(() => {
    if (isRejected) {
      // 거절된 물품은 전체 조회만 가능
      tchitemAllRejected()
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
          console.error('거절된 물품 조회 실패:', err);
          setData([]);
          setAllItemIds([]);
        });
    } else if (isAllClubs) {
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
          alert(err);
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
  }, [id, setAllItemIds, isApproved, isRejected, isAllClubs]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (name: string) => {
    setSelectedName(name);
    setModalOpen(true);
  };

  const handleDetailClick = (item: any) => {
    const teamInfo = clubs.find(club => club.id === item.team_id);
    const itemWithTeam = {
      ...item,
      teamName: teamInfo?.name || '알 수 없는 팀'
    };
    setSelectedItem(itemWithTeam);
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
        {data.length === 0 && (
          <_.EmptyMessage>
            {isRejected ? '거절된 물품이 없습니다.' : '물품이 없습니다.'}
          </_.EmptyMessage>
        )}
        {data.map((item, index) => (
          <_.ItemRow
            key={item.id ?? `row-${index}`}
            onClick={() => handleSelect(item.id)}
            style={{ cursor: (isApproved || isRejected) ? 'default' : 'pointer' }}
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
              {item.productName}&nbsp;
              {item.productLink && item.productLink.includes('devicemart') && '(디바이스마켓)'}
              {item.productLink && item.productLink.includes('11st') && '(11번가)'}
            </_.ItemName>
            {!isApproved && !isRejected && (
              <_.ItemInput
                placeholder="거절시, 이 부분에다가 거절사유를 입력해주세요"
                value={reasons[item.id] || ''}
                onChange={(e) => handleReasonChange(item.id, e.target.value)}
              />
            )}
            {(isApproved || isRejected) && (
              <_.ItemText onClick={() => handleDetailClick(item)}>
                {item.reason || (isRejected ? item.reject_reason : '')}
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
