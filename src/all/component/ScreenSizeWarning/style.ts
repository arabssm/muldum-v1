import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Content = styled.div`
  background: white;
  border-radius: 2rem;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

export const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  color: #333;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 2rem 0;
`;

export const SubMessage = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #999;
  margin: 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
`;