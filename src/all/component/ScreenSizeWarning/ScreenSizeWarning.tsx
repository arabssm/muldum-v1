import * as _ from './style';

export default function ScreenSizeWarning() {
    return (
        <_.Container>
            <_.Content>
                <_.Icon>💻</_.Icon>
                <_.Title>화면 크기 알림</_.Title>
                <_.Message>
                    이 애플리케이션은 노트북 또는 데스크톱 환경에서 최적화되어 있습니다.
                    <br />
                    더 나은 사용 경험을 위해 큰 화면에서 이용해 주세요.
                </_.Message>
                <_.SubMessage>
                    현재 화면 크기: {window.innerWidth}px × {window.innerHeight}px
                    <br />
                    권장 화면 크기: 1024px 이상
                </_.SubMessage>
            </_.Content>
        </_.Container>
    );
}