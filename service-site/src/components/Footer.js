import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo/master-logo.svg';

const FooterWrapper = styled.footer`
  background-color: var(--dark-bg);
  color: var(--white);
  padding: var(--spacing-xxl) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) 0;
  }
`;

const FooterContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: calc(var(--spacing-xl) * 0.5);
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    gap: calc(var(--spacing-lg) * 0.5);
  }
`;

const LogoSection = styled(FooterSection)`
  align-items: flex-start;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: var(--spacing-md);
`;

const LogoImage = styled.img`
  height: 35px;
  filter: brightness(0) invert(1);
`;

const FooterDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-lg);
`;

const LinkSection = styled(FooterSection)``;

const LinkTitle = styled.h4`
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-lg);
  color: var(--white);
  
  @media (max-width: 768px) {
    margin-bottom: calc(var(--spacing-lg) * 0.5);
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    margin-bottom: calc(var(--spacing-lg) * 0.5);
  }
`;

const FooterLink = styled(Link)`
  color: var(--text-tertiary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--white);
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    display: block;
    padding: var(--spacing-xs) 0;
  }
`;

const ContactSection = styled(FooterSection)``;

const ContactText = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-lg);
`;

const ButtonWrapper = styled.div`
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    display: none; /* スマホビューでは非表示 */
  }
`;

const Button = styled.a`
  display: inline-block;
  background: #06C755;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #05A847;
    transform: translateY(-2px);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 12px 16px;
    text-align: center;
    font-size: var(--font-size-md);
  }
`;

const BottomSection = styled.div`
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }
`;

const Copyright = styled.p`
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <LogoSection>
            <LogoWrapper to="/">
              <LogoImage src={Logo} alt="Bridge Logo" />
            </LogoWrapper>
            <FooterDescription>
              Bridge（ブリッジ）は、非エンジニアの方でもAI情報を効率よく取得・活用していけることを目的としたLINE媒体のAIメディアサービスです。
            </FooterDescription>
          </LogoSection>
          
          <LinkSection>
            <LinkTitle>サイトマップ</LinkTitle>
            <LinkList>
              <LinkItem>
                <FooterLink to="/">ホーム</FooterLink>
              </LinkItem>
              {/* 「ミッション」ページは準備中につき非表示
              <LinkItem>
                <FooterLink to="/about">ミッション</FooterLink>
              </LinkItem>
              */}
              <LinkItem>
                <FooterLink to="/contents">コンテンツ一覧</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink to="/privacy">プライバシーポリシー</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink to="/terms">利用規約</FooterLink>
              </LinkItem>
            </LinkList>
          </LinkSection>
          
          <ContactSection>
            <LinkTitle>お問い合わせ</LinkTitle>
            <ContactText>
              サービスに関するお問い合わせはLINE公式アカウントにて受け付けております。
              お気軽にご連絡ください。
            </ContactText>
            <ButtonWrapper>
              <Button 
                href="https://lin.ee/aTshCxr"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINE で友だち追加
              </Button>
            </ButtonWrapper>
          </ContactSection>
        </FooterContent>
        
        <BottomSection>
          <Copyright>© {new Date().getFullYear()} Create New One, Inc. All rights reserved.</Copyright>
        </BottomSection>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;