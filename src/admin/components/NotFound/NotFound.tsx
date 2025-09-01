import { useNavigate, useLocation } from 'react-router-dom';
import * as _ from './style';
import NavBar from '@_all/component/sibebar/sidebar';
import type { LocationState } from './types';

export default function Notfound() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const errorCode = state?.errorCode || 404;
    const message = state?.message || '요청하신 화면을 찾을 수 없습니다';

    return (
        <_.Container>
        <NavBar />
        <_.Error>404</_.Error>
        <_.Title>요청하신 화면을 찾을 수 없습니다</_.Title>
        <_.SubTitle onClick={() => navigate('/')}>홈 화면으로 돌아가기</_.SubTitle>
    </_.Container>
);
}