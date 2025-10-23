import * as _ from './style';
import Back from '@_assets/arrow.svg';

const SkeletonBox = ({ width = '100%', height = '20px', marginTop = '0' }: {
    width?: string;
    height?: string;
    marginTop?: string;
}) => (
    <div
        style={{
            width,
            height,
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            marginTop,
            animation: 'pulse 1.5s ease-in-out infinite alternate',
        }}
    />
);

const SkeletonStyles = `
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.4;
    }
  }
`;

export default function DetailNoticeSkeleton() {
    return (
        <>
            <style>{SkeletonStyles}</style>
            <_.Wrapper>
                <_.Back src={Back} alt="뒤로가기" />

                <_.PageTitle>
                    <SkeletonBox width="300px" height="24px" />
                </_.PageTitle>


                <_.AdditionRow>
                    <_.AdditionLeft>
                        <SkeletonBox width="200px" height="16px" />
                        <SkeletonBox width="150px" height="16px" marginTop="8px" />
                        <SkeletonBox width="120px" height="16px" marginTop="8px" />
                    </_.AdditionLeft>
                    <_.ButtonGroup>
                        <SkeletonBox width="60px" height="16px" />
                        <SkeletonBox width="60px" height="16px" />
                    </_.ButtonGroup>
                </_.AdditionRow>


                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    <SkeletonBox width="300px" height="200px" />
                    <SkeletonBox width="300px" height="200px" />
                </div>

                <SkeletonBox width="90%" height="300px" marginTop="24px" />

                <SkeletonBox width="250px" height="16px" marginTop="8px" />

                <_.Content>
                    <SkeletonBox width="100%" height="20px" marginTop="16px" />
                    <SkeletonBox width="95%" height="20px" marginTop="8px" />
                    <SkeletonBox width="90%" height="20px" marginTop="8px" />
                    <SkeletonBox width="85%" height="20px" marginTop="8px" />
                    <SkeletonBox width="92%" height="20px" marginTop="8px" />
                    <SkeletonBox width="88%" height="20px" marginTop="8px" />
                </_.Content>
            </_.Wrapper>
        </>
    );
}