import { useEffect, useState } from 'react';
import * as _ from './style';
import Sidebar from '../../../all/component/sibebar/sidebar';
import Box from '../../component/object/box';
import type { Request } from '../../component/object/types';
import Apply from '../../../api/object/apply'
import {getApply,getMoney,finalapply} from '../../../api/object/apply'
import { useNavigate } from 'react-router-dom';
export default function Object() {
  const nav=useNavigate();
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState('');
  const [money, setMoney] = useState<number>(0);
  const [usedmoney, setUsedMoney] = useState<number>(0);
  const [requests, setRequests] = useState<Request[]>([]); 
  const handleAdd = async () => {
    if (!item.trim() || reason.trim().length < 10) {
      alert('물품명과 사유(10자 이상)를 입력하세요.');
      return;
    }
    try {

      await Apply(item, qty, price, link, reason);
      window.location.reload();
    } catch (err) {
      console.error("신청 실패:", err);
    }
  };
  const finalApply= () => {
    finalapply()
    .then(() => {
      alert('신청이 완료되었습니다.');
      window.location.reload();
    })
    .catch((err) => {
      // 에러 처리
    });
  }
  useEffect(() => {
    getMoney()
    .then((data1) => {
      setMoney(data1.remainingBudget);

      setUsedMoney(data1.usedBudget)
    })
    .catch((err) => {
      // 에러 처리
    });
    getApply()
      .then((data2) => {
        setRequests(data2);

      })
      .catch((err) => {
        // 에러 처리
      });
  }, []);
  return (
    <_.PageWrapper>
      <Sidebar />
      <_.Container>
        <_.Main>
          <_.Header>
            <_.Titles>
              <h1>전공동아리 물품신청</h1>
              <h3>전공동아리에 사용할 물품을 신청해요</h3>
            </_.Titles>
            <_.BudgetBox>
              <span>사용한 예산</span>
              <strong>{money}</strong>
              <_.Used>-{usedmoney}</_.Used>
            </_.BudgetBox>
          </_.Header>
          <_.FormSection>
            <_.FormSectionHeader>
              <_.SectionTitle>물품신청</_.SectionTitle>
              <_.AddButton onClick={handleAdd}>추가하기</_.AddButton>
            </_.FormSectionHeader>
            <_.FormRow>
              <_.Label>구입물품</_.Label>
              <_.Input
                placeholder="구입할 물품을 입력해 주세요"
                value={item}
                onChange={e => setItem(e.target.value)}
              />
              <_.Label>가격</_.Label>
              <_.Input
                placeholder="가격을 입력해 주세요"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <_.Label>수량</_.Label>
              <_.QtyWrapper>
                <_.QtyButton onClick={() => setQty(q => Math.max(1, q - 1))}>–</_.QtyButton>
                <_.Qty>{qty}</_.Qty>
                <_.QtyButton onClick={() => setQty(q => q + 1)}>+</_.QtyButton>
              </_.QtyWrapper>
            </_.FormRow>
            <_.FormRow>
              <_.Label>물품 링크</_.Label>
              <_.FullWidthInput
                placeholder="구입할 물품의 링크를 입력해 주세요"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
            </_.FormRow>
            <_.FormRow>
              <_.Label>신청 사유</_.Label>
              <_.TextArea
                placeholder="신청 사유를 10자 이상 입력해 주세요"
                value={reason}
                onChange={e => setReason(e.target.value)}
              />
            </_.FormRow>
          </_.FormSection>
          <_.ListSection>
            <_.ListSectionHeader>
              <_.SectionTitle>우리 팀이 신청한 물건 확인하기</_.SectionTitle>
              <_.ApplyButton onClick={() => finalApply()}>신청하기</_.ApplyButton>
            </_.ListSectionHeader>
            <_.ListWrapper>
              {requests.map(r => (
                <Box
                  key={r.id}
                  request={r}
                />
              ))} 
            </_.ListWrapper>
          </_.ListSection>
        </_.Main>

        <_.Footer>
          <_.FooterLink>물품 신청 가이드 보기 &gt;</_.FooterLink>
          <_.FooterLink onClick={()=>nav("/object/all")}>신청 물품 내역 조회 ›</_.FooterLink>
        </_.Footer>
      </_.Container>
    </_.PageWrapper>
  );
}