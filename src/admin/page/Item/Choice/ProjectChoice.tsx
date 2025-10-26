import * as _ from './style';
import Menu from '@_menu/Menu';
import '@_styles';
import { useUserStore } from '../../../../atom/User';

export default function ProjectChoice() {
    const { user } = useUserStore();

    const isTeacher = user?.userType === "TEACHER";

    return (
        <>
            <_.Title>
                {isTeacher ? "물품 승인 프로젝트 선택" : "물품 신청 프로젝트 선택"}
            </_.Title>
            <_.Subtitle>
                {isTeacher ? "물품을 승인할 프로젝트를 선택해주세요" : "물품을 신청할 프로젝트를 선택해주세요"}
            </_.Subtitle>
            <Menu />
        </>
    )
}