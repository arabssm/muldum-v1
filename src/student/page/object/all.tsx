import { useEffect, useState } from 'react';
import * as _ from './style';
import Sidebar from '@_all/component/sibebar/sidebar';
import Box from '@_component/object/box';
import type { Request } from '@_component/object/types';
import { getallApply } from '@_api/object/apply';

export default function All() {
  const [requests, setRequests] = useState<Request[]>([]);

  const handleReasonChange = (id: string, newReason: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, reason: newReason } : req
      )
    );
  };

  useEffect(() => {
    getallApply()
      .then((data) => {
        setRequests(data);
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
          <_.TextContainer>
            <_.AllTitle>물품 신청 현황</_.AllTitle>
            <_.Subtitle>현재 물품 현황을 확인해요</_.Subtitle>
          </_.TextContainer>
          <_.AllTitle>신청한 물품</_.AllTitle>
          <_.ListWrapper>
            {
              requests
                .map(r => (
                  <Box
                    key={r.id}
                    request={{
                      ...r,
                      status:
                        r.status === "REJECTED"
                          ? "거절됨"
                          : r.status === "APPROVED"
                            ? "승인됨"
                            : r.status === "PENDING"
                              ? "대기중"
                              : r.status,
                    }}
                    onReasonChange={handleReasonChange}
                  />
                ))
            }
          </_.ListWrapper>
        </_.Main>
      </_.Container>
    </_.PageWrapper>
  );
}