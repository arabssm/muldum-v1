import { useState, useEffect, useRef } from "react";
import type { Props, Request } from "./types";
import * as _ from "./style";
import { useNavigate } from "react-router-dom";
export default function Box({ request}) {

  const [reason, setReason] = useState(request.reason);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [state,setState]=useState(null);
  const nav=useNavigate();


  useEffect(() => {
      if(request.status==="INTEMP"){
        setState("임시 신청");
      }else if(request.status==="PENDING"){
        setState("선생님 확인중");
      }
    }
  );
  return (
    <_.Card>
      <_.CardRow
        onClick={() => {
          console.log(request.status);
          if (request.status.toUpperCase() === "거절됨") {
            nav(`/object/detail/${request.id}?name=${request.productName}`);
          }
        }}
      >
        <_.Cell flex="0 0 40px">{request.id}</_.Cell>
        <_.Cell flex="1">{request.productName}</_.Cell>
        <_.Cell flex="0 0 60px">수량 {request.quantity}</_.Cell>
        <_.Cell flex="0 0 100px">{state}</_.Cell>
      </_.CardRow>
      <_.ReasonRow>
        {!reason ? (
          <_.ReasonTextarea
            ref={textareaRef}
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        ) : (
          reason || "구매 사유를 입력해 주세요"
        )}
      </_.ReasonRow>
    </_.Card>
  );
}
