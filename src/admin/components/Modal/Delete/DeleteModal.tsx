import * as _ from './style';
import '@_styles';
import { Props } from './type'

export default function DeleteModal({ onCancel, onConfirm, name }: Props) {
  const formatNameForTwoLines = (text: string) => {
    if (text.length <= 15) return text;

    const midPoint = Math.ceil(text.length / 2);
    const firstLine = text.substring(0, midPoint);
    const secondLine = text.substring(midPoint);

    return `${firstLine}\n${secondLine}`;
  };

  return (
    <_.Container>
      <_.Modal>
        <_.TextArea>
          <_.Title>{formatNameForTwoLines(name)}</_.Title>
          <_.SubTitle>을(를) 정말 삭제하시겠습니까?</_.SubTitle>
          <_.SubTitle>삭제한 내용은 되돌릴 수 없습니다.</_.SubTitle>
        </_.TextArea>
        <_.ButtonGroup>
          <_.Yes onClick={onConfirm}>네</_.Yes>
          <_.No onClick={onCancel}>취소</_.No>
        </_.ButtonGroup>
      </_.Modal>
    </_.Container>
  );
}
