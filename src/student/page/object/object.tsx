import { useEffect, useState } from 'react';
import * as _ from './style';
import Box from '../../component/object/box';
import type { Request } from '../../component/object/types';
import Apply from '../../../api/object/apply';
import { getApply, getMoney, finalapply, getOpenStatus } from '../../../api/object/apply';
import { useNavigate } from 'react-router-dom';
import Get from '@_api/object/sss';
import GuidelinesModal from '../../component/object/GuidelinesModal';

export default function Object() {
  const nav = useNavigate();
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [usedmoney, setUsedMoney] = useState<number>(0);
  const [requests, setRequests] = useState<Request[]>([]);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [guidelines, setGuidelines] = useState<any>(null);

  const handleAdd = async () => {
    if (!item.trim() && !price.trim() && !link.trim() && !reason.trim()) {
      alert('입력된 내용이 없습니다. 물품을 추가하세요.');
      return;
    }

    if (!item.trim() || reason.trim().length < 10) {
      alert('물품명과 사유(10자 이상)를 입력하세요.');
      return;
    }

    const priceNum = parseInt(price);
    if (!price.trim() || isNaN(priceNum) || priceNum <= 0) {
      alert('유효한 가격을 입력하세요.');
      return;
    }

    // 가이드라인 검증
    if (guidelines && guidelines.guide && guidelines.guide.length > 0) {
      const guide = guidelines.guide[0];
      
      // 최소 금액 검증
      if (guide.minPrice && priceNum < guide.minPrice) {
        alert(`물품 가격은 최소 ${guide.minPrice.toLocaleString()}원 이상이어야 합니다.`);
        return;
      }

      // 배송비 필수 검증 (shipping이 true면 배송비가 0이어야 함)
      if (guide.shipping) {
        const deliveryPriceNum = parseInt(deliveryPrice);
        if (!deliveryPrice.trim() || isNaN(deliveryPriceNum)) {
          alert('배송비를 입력해주세요. (무료배송인 경우 0을 입력)');
          return;
        }
        if (deliveryPriceNum !== 0) {
          alert('배송비가 포함된 물품만 신청 가능합니다. 무료배송 물품을 선택해주세요.');
          return;
        }
      }
    }

    try {
      await Apply(item, qty, price, link, reason, deliveryPrice, deliveryTime);
      setItem('');
      setPrice('');
      setLink('');
      setQty(1);
      setReason('');
      setDeliveryPrice('');
      setDeliveryTime('');
      await refreshRequests();
      alert('물품이 추가되었습니다.');
    } catch (err: any) {
      alert(err.response?.data?.message || '물품 추가에 실패했습니다.');
    }
  };

  const handleGetLink = async (linkValue: string) => {
    if (!linkValue.trim()) return;
    try {
      const data = await Get(linkValue);
      if (data.name) setItem(data.name);
      if (data.price) setPrice(data.regularPrice.toString());
      alert('가격이 정가와 동일한지 확인해주세요.');
    } catch (err) {
      alert('링크 정보를 가져오는데 실패했습니다.');
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setLink(newLink);
  };

  const handleLinkBlur = () => {
    if (link.trim()) {
      handleGetLink(link);
    }
  };

  const finalApply = async () => {
    if (requests.length === 0) {
      alert('신청할 물품이 없습니다. 먼저 물품을 추가해주세요.');
      return;
    }

    try {
      await finalapply();
      alert('신청이 완료되었습니다.');
      await refreshRequests();
    } catch (err: any) {
      alert(err.response?.data?.message || '신청에 실패했습니다.');
    }
  };

  const handleShowGuidelines = () => {
    setShowGuidelinesModal(true);
  };

  const refreshRequests = async () => {
    try {
      const data = await getApply();
      setRequests(data);
      const budgetData = await getMoney();
      setUsedMoney(budgetData.usedBudget);
    } catch (err) { }
  };

  useEffect(() => {
    const hideGuidelines = localStorage.getItem('hideObjectGuidelines');
    if (!hideGuidelines) {
      setShowGuidelinesModal(true);
    }

    // 가이드라인 로드
    getOpenStatus()
      .then((data) => {
        setGuidelines(data);
      })
      .catch(() => {
        console.error('가이드라인 로드 실패');
      });

    getMoney().then((data1) => {
      setUsedMoney(data1.usedBudget);
    });

    getApply()
      .then((data2) => {
        setRequests(data2);
      })
      .catch(() => { });
  }, []);

  return (
    <>
      <GuidelinesModal
        isOpen={showGuidelinesModal}
        onClose={() => setShowGuidelinesModal(false)}
      />
      <_.Container>
        <_.Main>
          <_.Header>
            <_.Titles>
              <h1>네트워크 물품신청</h1>
              <h3>네크워크에 사용할 물품을 신청해요</h3>
            </_.Titles>
            <_.BudgetBox>
              <span>사용한 예산</span>
              <_.Used>{usedmoney}</_.Used>
            </_.BudgetBox>
          </_.Header>
          <_.FormSection>
            <_.FormSectionHeader>
              <_.SectionTitle>물품신청</_.SectionTitle>
              <_.AddButton onClick={handleAdd}>추가하기</_.AddButton>
            </_.FormSectionHeader>
            <_.FormRow>
              <_.Label2>물품 링크</_.Label2>
              <_.FullWidthInput
                placeholder="구입할 물품의 링크를 입력해 주세요"
                value={link}
                onChange={handleLinkChange}
                onBlur={handleLinkBlur}
              />
            </_.FormRow>

            <_.FormRow>
              <_.Label>구입물품</_.Label>
              <_.Input
                placeholder="구입할 물품을 입력해 주세요"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <_.PriceQtyWrapper>
                <_.Group>
                  <_.Label>정가</_.Label>
                  <_.SmallInput
                    placeholder="가격을 입력해 주세요"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </_.Group>
                <_.Group>
                  <_.Label>수량</_.Label>
                  <_.QtyWrapper>
                    <_.QtyButton onClick={() => setQty((q) => Math.max(1, q - 1))}>
                      –
                    </_.QtyButton>
                    <_.Qty>{qty}</_.Qty>
                    <_.QtyButton onClick={() => setQty((q) => q + 1)}>+</_.QtyButton>
                  </_.QtyWrapper>
                </_.Group>
              </_.PriceQtyWrapper>
            </_.FormRow>

            <_.FormRow>
              <_.Label>신청 사유</_.Label>
              <_.TextArea
                placeholder="신청 사유를 10자 이상 입력해 주세요"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </_.FormRow>

            <_.FormRow>
              <_.Label>배송비</_.Label>
              <_.Input
                placeholder="배송비를 입력해 주세요 (선택)"
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
              />
              <_.Group>
                <_.Label>배송 예정일</_.Label>
                <_.Input
                  type="date"
                  placeholder="배송 예정일 (선택)"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </_.Group>
            </_.FormRow>
          </_.FormSection>

          <_.ListSection>
            <_.ListSectionHeader>
              <_.SectionTitle>우리 팀이 신청한 물건 확인하기</_.SectionTitle>
              <_.ApplyButton onClick={() => finalApply()}>신청하기</_.ApplyButton>
            </_.ListSectionHeader>
            <_.ListWrapper>
              {Array.isArray(requests) &&
                requests.map((r, index) => (
                  <Box key={r.id} request={r} index={index} onDelete={refreshRequests} />
                ))}
            </_.ListWrapper>
          </_.ListSection>
        </_.Main>

        <_.Footer>
          <_.FooterLink onClick={handleShowGuidelines}>
            물품 신청 가이드 보기 &gt;
          </_.FooterLink>
          <_.FooterLink onClick={() => nav('/object/all')}>
            신청 물품 내역 조회 ›
          </_.FooterLink>
        </_.Footer>
      </_.Container>
    </>
  );
}