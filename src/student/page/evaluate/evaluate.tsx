import { useState } from 'react';
import * as _ from './style';
import NavBar from '@_navbar/sidebar';
import SaveModal from '@_component/modal/evaluate/save';
import SubmitModal from '@_component/modal/evaluate/submit';

const Section = ({ label, children }) => (
    <_.Section>
        <_.Label>{label}</_.Label>
        {children}
    </_.Section>
);

export default function SEvaluate() {
    const [modalType, setModalType] = useState<'save' | 'submit' | null>(null);

    const handleSave = () => {
        setModalType('save');
    };

    const handleSubmit = () => {
        setModalType('submit');
    };

    const closeModal = () => {
        setModalType(null);
    };

    return (
        <_.Container>
            <NavBar />
            <_.Wrapper>
                <_.Title>월말평가</_.Title>
                <_.BtnGroup>
                    <_.SaveBtn onClick={handleSubmit}>임시저장</_.SaveBtn>
                    <_.Submit onClick={handleSave}>저장</_.Submit>
                </_.BtnGroup>
            </_.Wrapper>
            <_.Form>
                <Section label="주제">
                    <_.Input placeholder="프로젝트 구현 시 적용 기술 작성, 스터디 동아리일 경우 스터디 주제 작성" />
                </Section>
                <Section label="목표">
                    <_.Input placeholder="1." />
                    <_.Input placeholder="2." style={{ marginTop: '1rem' }} />
                </Section>
                <Section label="사용한 언어, 기술 스택">
                    <_.Input />
                </Section>
                <Section label="발생한 문제와 어려웠던 점, 해결방안">
                    <_.TextArea />
                </Section>
                <_.FeedbackWrapper>
                    <_.FeedbackBox>
                        <Section label="담당교사의 피드백">
                            <_.TextArea />
                        </Section>
                    </_.FeedbackBox>
                    <_.FeedbackBox>
                        <Section label="멘토교사의 피드백">
                            <_.TextArea />
                        </Section>
                    </_.FeedbackBox>
                </_.FeedbackWrapper>
            </_.Form>
            {modalType === 'save' && <SaveModal onClose={closeModal} />}
            {modalType === 'submit' && <SubmitModal onClose={closeModal} />}
        </_.Container>
    );
}
