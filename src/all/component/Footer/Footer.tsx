import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 2rem 2rem;
  border-top: 1px solid #D1D1D1;
  background-color: white;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #123957;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Logo = styled.img`
  width: 32px;
  height: 28px;
`;

const ContactInfo = styled.div`
  color: #545454;
  font-size: 0.875rem;
  line-height: 1.6;
  
  div {
    margin-bottom: 0.25rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SocialLink = styled.a`
  color: #545454;
  font-size: 1.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #FF9B62;
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid #D1D1D1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #B2B2B2;
  font-size: 0.875rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: #545454;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: #FF9B62;
    text-decoration: underline;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <CompanyInfo>
            <CompanyName>
              <Logo src="/muldum.svg" alt="Muldum Logo" />
              Muldum
            </CompanyName>
            <ContactInfo>
              <div>46708 부산 강서구 가락대로 1393 (봉림동 15)</div>
              <div>이메일 : bssmara2025@gmail.com</div>
              <div>문의 : bssmara인스타</div>
            </ContactInfo>
          </CompanyInfo>
          
          <SocialLinks>
            <SocialLink 
              href="https://github.com/arabssm" 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </SocialLink>
            <SocialLink 
              href="https://www.instagram.com/arabssm/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterTop>
        
        <FooterBottom>
          <Copyright>
            © 2025 Muldum. All rights reserved.
          </Copyright>
          <FooterLinks>
            <FooterLink 
              href="https://www.instagram.com/arabssm/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              버그 제보
            </FooterLink>
            <FooterLink href="#" onClick={(e) => e.preventDefault()}>
              이용약관
            </FooterLink>
            <FooterLink href="#" onClick={(e) => e.preventDefault()}>
              개인정보처리방침
            </FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}