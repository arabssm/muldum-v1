import * as _ from './style';
import Menu from '../component/team/menu';
import '@_styles';

export default function Selectwhatteam(){
    return (
        <>
            <_.Title>확인 할 프로젝트를 선택하세요</_.Title>
            <_.Subtitle>어떤 팀이 있는지 조회하세요</_.Subtitle>
            <Menu />
        </>
    )
}