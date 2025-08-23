import styled from '@emotion/styled';
import type data from './types';

export const MainArea = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 13%;
    height: 100vh;
    padding: 3% 2% 2% 2%;
    border-right: 1px solid #D1D1D1;
    background-color: white;
`;

export const BaseTag = styled.div<data>`
    display: flex;
    align-items: center;
    width: 100%;
    height: 6vh;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: ${({ isActive }) => (isActive ? '#FFF5EF' : 'transparent')};
`;

export const LoginTag = styled(BaseTag)`
    background-color: #FAFAFA;
    margin-bottom: 22%;
`;

export const SettingTag = styled(BaseTag)`
    margin-top: 80%;
`;

export const TagArea = styled(BaseTag)`
    margin-bottom: 8%;
`;

export const Icon = styled.img`
    display: flex;
    margin-left: 8%;
`;

export const Text = styled.div<data>`
    color: ${({ isActive }) => (isActive ? '#FF9B62' : '#545454')};
    margin-left: 4%;
`;

export const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
