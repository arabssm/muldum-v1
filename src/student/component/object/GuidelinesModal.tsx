import { useEffect, useRef, useState } from 'react';
import * as _ from './guidelinesModalStyle';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuidelinesModal({ isOpen, onClose }: GuidelinesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideObjectGuidelines', 'true');
    }
    onClose();
  };

  const handleDontShowAgainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(e.target.checked);
  };

  if (!isOpen) return null;

  return (
    <_.Backdrop>
      <_.Modal ref={modalRef}>
        <_.Header>
          <_.Title>물품 신청 안내</_.Title>
          <_.CloseButton onClick={handleClose}>×</_.CloseButton>
        </_.Header>
        <_.Content>
          <_.GuidelineText>
            물품 신청은 <_.Highlight>11번가, 디바이스마켓</_.Highlight>에서만 가능합니다.
          </_.GuidelineText>
          <_.GuidelineText>
            11번가와 디바이스마켓의 링크를 넣게되면 자동으로 물품명과 가격이 들어오게 됩니다.
          </_.GuidelineText>
          <_.GuidelineText>
            이때 <_.Highlight>가격이 정가인지 한번 확인</_.Highlight>해주시면 감사하겠습니다.
          </_.GuidelineText>
          <_.GuidelineText>
            만일 동일한 물품 여러개를 신청할 경우 <_.Highlight>가격은 물품 1개의 가격</_.Highlight>을 입력합니다.
          </_.GuidelineText>
          <_.GuidelineText>
            물품신청을 하기전에 <_.Highlight>추가하기 버튼</_.Highlight>을 눌러 팀원들이 신청한 물품을 확인할수있게 해야 합니다.
          </_.GuidelineText>
          <_.GuidelineText>
            그 후 팀원들과의 상의를 통해 <_.Highlight>신청하기</_.Highlight>를 눌러주시면 됩니다.
          </_.GuidelineText>
          <_.WarningText>
            ⚠️ 추가하기를 누르기 전에 신청하기 버튼을 누르면 작성한 데이터가 날라갈수있으니 유의해주시길 바랍니다.
          </_.WarningText>
        </_.Content>
        <_.Footer>
          <_.CheckboxWrapper>
            <_.Checkbox
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={handleDontShowAgainChange}
            />
            <_.CheckboxLabel htmlFor="dontShowAgain">
              다시 보지 않기
            </_.CheckboxLabel>
          </_.CheckboxWrapper>
          <_.CloseButtonStyled onClick={handleClose}>
            닫기
          </_.CloseButtonStyled>
        </_.Footer>
      </_.Modal>
    </_.Backdrop>
  );
}