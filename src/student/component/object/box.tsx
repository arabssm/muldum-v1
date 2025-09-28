import { useState, useEffect, useRef } from "react";
import type { Props, Request } from "./types";
import * as _ from "./style";
import { useNavigate } from "react-router-dom";




export default function Box({request}) {

  const [reason, setReason] = useState(request.reason);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [state,setState]=useState(null);
  const nav=useNavigate();


  useEffect(() => {
      if(request.status==="INTEMP"){
        setState("임시 신청");
      }else if(request.status==="PENDING"){
        setState("선생님 확인중");
      }else if(request.status==="REJECTED"){
        setState("거절됨");
      }else if(request.status==="APPROVED"){
        setState("승인됨");
      }
    }
  );
  return (
    <_.Card>
      <_.CardRow
        onClick={() => {

          if (request.status==="REJECTED") {
            nav(`/object/detail/${request.id}?name=${request.product_name}`);
          }
        }}
      >
        <_.Cell flex="1">{request.product_name}</_.Cell>
        <_.Cell flex="0 0 60px">수량 {request.quantity}</_.Cell>
        <_.Cell flex="0 0 100px">{state}</_.Cell>
      </_.CardRow>
      <_.ReasonRow>
        불필요하다
      </_.ReasonRow>
    </_.Card>
  );
}
