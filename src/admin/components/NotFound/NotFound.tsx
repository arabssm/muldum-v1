import { useNavigate, useLocation } from 'react-router-dom';
import * as _ from './style';
import type { LocationState } from './types';

export default function Notfound() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const errorCode = state?.errorCode || 404;
    const message = state?.message || '요청하신 화면을 찾을 수 없습니다';

    return (
        <>
            <_.Dohun>
                <_.Error>{errorCode}</_.Error>
                <_.Title>{message}</_.Title>
                <_.SubTitle onClick={() => navigate('/')}>홈 화면으로 돌아가기</_.SubTitle>
            </_.Dohun>
        </>
    );
}