import { useEffect, useState } from 'react';
import * as _ from './style';
import Box from '@_component/object/box';
import type { Request } from '@_component/object/types';
import { getApplyall } from '@_api/object/apply';

export default function All() {
  const [requests, setRequests] = useState<Request[]>([]);
  
  useEffect(() => {
    getApplyall()
      .then((data) => {
        setRequests(data);
      })
  }, []);
  return (
    <>
      <_.Container>
        <_.Main>
          <_.TextContainer>
            <_.AllTitle>물품 신청 현황</_.AllTitle>
            <_.Subtitle>현재 물품 현황을 확인해요</_.Subtitle>
          </_.TextContainer>
          <_.AllTitle>신청한 물품</_.AllTitle>
          <_.ListWrapper>
            { Array.isArray(requests) &&
              requests
                .map((r, index) => (
                  <Box
                    key={r.id}
                    request={{ ...r, }}
                    index={index}
                    hideReason={true}
                  />
                ))
            }
          </_.ListWrapper>
        </_.Main>
      </_.Container>
    </>
  );
}