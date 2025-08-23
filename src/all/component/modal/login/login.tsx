import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useLoginModalStore } from '../../../../atom/Modal';
import styled from '@emotion/styled';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
export default function LoginModal() {
  const navigate=useNavigate();
  const { setIsOpen } = useLoginModalStore();
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const scope = 'openid email profile'
    const responseType = 'code'
    const state = crypto.randomUUID()
  
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`
  
    window.location.href = oauthUrl
  }
  
  return (
    <>
      <Overlay onClick={() => setIsOpen(false)} />
      <ModalContainer>
        <Title>로그인</Title>
        <LoginButton onClick={()=>handleGoogleLogin()}>
          구글로 로그인
        </LoginButton>
      </ModalContainer>
    </>
  );
}


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;          /* 고정 너비 */
  height: auto;          /* 콘텐츠에 따라 높이 자동 조정 */
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px 24px;    /* 상하 32px, 좌우 24px */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 24px;   /* 제목과 첫 입력칸 사이 여유 */
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;   /* 입력칸 간 세로 간격 */
`;

const IconImg = styled.img`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: 0.6;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 48px;               /* 입력창 높이 */
  padding: 0 12px 0 44px;     /* 왼쪽 아이콘 공간 확보(44px), 우측 12px 여백 */
  border: none;
  border-radius: 8px;
  background-color: #f0f0f0;
  font-size: 15px;
  color: #333333;
  outline: none;

  &::placeholder {
    color: #9e9e9e;
    font-size: 15px;
  }

  &:focus {
    background-color: #e8e8e8;
  }
`;

const LoginButton = styled.button`
  width: 80%;                   /* 버튼 너비를 컨테이너 대비 80%로 */
  height: 48px;                 /* 버튼 높이 */
  margin-top: 24px;             /* 입력창과 버튼 사이 간격 */
  background-color: #f2a161;
  color: #ffffff;
  border: none;
  border-radius: 32px;          /* 완만한 둥근 모서리 */
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #e59450;
  }
  &:active {
    background-color: #d88440;
  }
`;

const GoPassword = styled.div`
  margin-top: 12px;   
`;

const PasswordLink = styled.a`
  font-size: 14px;
  color: #707070;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #333333;
    text-decoration: underline;
  }
`;
