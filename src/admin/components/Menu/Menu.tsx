import { useNavigate } from 'react-router-dom';
import * as _ from './style';
import '@_styles';
import specialty from '@_assets/Club/specialty.svg';
import { useUserStore } from "../../../atom/User";


export default function Menu() {
    const navigate = useNavigate();
    const { user } = useUserStore();
    function Go() {
        if (user.userType === "TEACHER") {
            navigate("/project-approval");
        } else if (user.userType === "STUDENT") {
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
            {/* <_.MenuArea>
        <_.UpGroup>
            <_.Icon src= {congrats} alt='congra ts'/>
            <_.Dday>D-30</_.Dday>
        </_.UpGroup>
        <_.DownGroup>
            <_.Projectname>졸업작품 물품확인</_.Projectname>
            <_.LastGroup>
                <_.ProjectSub>최근 신청한 동아리는 팀 아라에요</_.ProjectSub>
                <_.Deadline>마감 시간 설정</_.Deadline>
            </_.LastGroup>
        </_.DownGroup>
    </_.MenuArea>
            <_.MenuArea>
        <_.UpGroup>
            <_.Icon src= {autonomy} alt='autonomy'/>
            <_.Dday>D-30</_.Dday>
        </_.UpGroup>
        <_.DownGroup>
            <_.Projectname>자율동아리 물품확인</_.Projectname>
            <_.LastGroup>
                <_.ProjectSub>최근 신청한 동아리는 팀 아라에요</_.ProjectSub>
                <_.Deadline>마감 시간 설정</_.Deadline>
            </_.LastGroup>
        </_.DownGroup>
    </_.MenuArea>
            <_.MenuArea>
        <_.UpGroup>
            <_.Icon src= {net} alt='net'/>
            <_.Dday>D-30</_.Dday>
        </_.UpGroup>
        <_.DownGroup>
            <_.Projectname>네트워크 물품신청</_.Projectname>
            <_.LastGroup>
                <_.ProjectSub>최근 신청한 동아리는 팀 아라에요</_.ProjectSub>
                <_.Deadline>마감 시간 설정</_.Deadline>
            </_.LastGroup>
        </_.DownGroup>
    </_.MenuArea> */}
        </_.Container>
    );
}