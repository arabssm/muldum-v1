import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as _ from './style';
import '@_styles';
import specialty from '@_assets/Club/specialty.svg';
import { useUserStore } from "../../../atom/User";
import { GetUser } from "../../../api/user/data";


export default function Menu() {
    const navigate = useNavigate();
    const { user } = useUserStore();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                try {
                    await GetUser();
                } catch (error) {
                }
            }
        };

        fetchUserData();
    }, [user]);

    function Go() {
        navigate("/team-space")
    }
    return (
        <_.Container>
            <_.MenuArea onClick={Go}>
                <_.Icon src={specialty} alt='specialty' />
                <_.Projectname>네트워크 팀 조회하기</_.Projectname>
            </_.MenuArea>
        </_.Container>
    );
}