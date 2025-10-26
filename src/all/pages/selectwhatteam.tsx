import * as _ from './style';
import Menu from '../component/team/menu';
import '@_styles';

export default function Selectwhatteam() {
    return (
        <>
            <_.Title>진행 중인 프로젝트를 확인하세요.</_.Title>
            <_.Subtitle>참여 중인 팀 목록을 볼 수 있습니다.</_.Subtitle>
            <Menu />
        </>
    )
}