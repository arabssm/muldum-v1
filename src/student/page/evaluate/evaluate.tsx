import * as _ from './style';
import NavBar from '@_navbar/sidebar';

export default function Evaluate(){
    return(
        <_.Container>
            <NavBar />
            <_.Wrapper>
                <_.Title>월말평가</_.Title>
                <_.BtnGroup>
                    <_.SaveBtn>임시저장</_.SaveBtn>
                    <_.Submit>저장</_.Submit>
                </_.BtnGroup>
            </_.Wrapper>
            <_.Form>
                <_.Section>
                    <_.Label>주제</_.Label>
                    <_.Input placeholder="프로젝트 구현 시 적용 기술 작성, 스터디 동아리일 경우 스터디 주제 작성" />
                </_.Section>
                <_.Section>
                    <_.Label>목표</_.Label>
                    <_.Input placeholder="1." />
                    <_.Input placeholder="2." style={{ marginTop: '1rem' }} />
                </_.Section>
                <_.Section>
                    <_.Label>사용한 언어, 기술 스택</_.Label>
                    <_.Input />
                </_.Section>
                <_.Section>
                    <_.Label>발생한 문제와 어려웠던 점, 해결방안</_.Label>
                    <_.TextArea />
                </_.Section>
                <_.FeedbackWrapper>
                    <_.FeedbackBox>
                        <_.Label>담당교사의 피드백</_.Label>
                        <_.TextArea />
                    </_.FeedbackBox>
                    <_.FeedbackBox>
                        <_.Label>멘토교사의 피드백</_.Label>
                        <_.TextArea />
                    </_.FeedbackBox>
                </_.FeedbackWrapper>
            </_.Form>
        </_.Container>
    );
}