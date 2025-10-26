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
        if (!user) {
            alert("사용자 정보를 불러오는 중입니다.");
            return;
        }
        
        if (user.userType === "TEACHER") {
            navigate("/project-approval");
        } else if (user.userType === "STUDENT" && user.teamId) {
            navigate("/object/apply");
        } else {
            alert("권한 부족");
            navigate("/");
        }
    }
    return (
        <_.Container>
            <_.MenuArea onClick={Go}>
                <_.Icon src={specialty} alt='specialty' />
                <_.Projectname>네트워크 물품확인</_.Projectname>
            </_.MenuArea>

        </_.Container>
    );
}