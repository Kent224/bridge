import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Bold = styled.span`
  font-weight: bold;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// ヒーローセクション
const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
  padding: var(--spacing-xl) var(--spacing-lg);
  color: var(--white);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 20% 30%, rgba(149, 70, 207, 0.15) 0%, transparent 60%),
                      radial-gradient(circle at 80% 70%, rgba(79, 109, 205, 0.12) 0%, transparent 60%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--white);
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 5vw, 2.5rem);
  }
`;

const Section = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--white);
`;

const SectionContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

// 下線アニメーション
const lineExtendAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 80px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  text-align: left;
  margin-bottom: var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--gradient-primary);
    margin: 0.8rem 0 0 0;
    border-radius: 2px;
    animation: ${lineExtendAnimation} 1s ease-out;
  }
`;

const SectionText = styled.p`
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  text-align: left;
`;

const MissionVisionSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--light-bg);
`;

const MissionVisionContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const MVTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  text-align: left;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--gradient-primary);
    margin: 0.8rem 0 0 0;
    border-radius: 2px;
    animation: ${lineExtendAnimation} 1s ease-out;
  }
`;

const MVText = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--text-primary);
  text-align: left;
  font-weight: 600;
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
`;

const BackToHomeButton = styled(Link)`
  display: inline-block;
  padding: 12px 40px;
  background-color: var(--gray-200);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 30px;
  font-size: var(--font-size-sm);
  font-weight: bold;
  transition: transform 0.3s ease;
  margin: var(--spacing-xl) auto;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding-bottom: var(--spacing-xl);
  background: var(--light-bg);
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>Bridgeについて</PageTitle>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionContainer>
          <SectionTitle>サービス名「Bridge」</SectionTitle>
          <SectionText>
            私たちは、AIの専門知識がない人でも気軽に学べるメディアを実現したいと考えていました。<br />
            しかし、AIに興味はあっても、時間や知識のハードルから「どこから始めたらいいか分からない」方は多いのが現状です。そこで、<Bold>AIの世界</Bold>と<Bold>日常生活</Bold>とのあいだに<Bold>橋 (＝Bridge)</Bold>をかけたいという想いから、このサービス名をつけました。<br /><br />
            Bridgeは、普段使い慣れたLINEを介することで、新たなアプリや難しい専門サイトを開く手間を大きく減らし、誰でもスキマ時間にAIの基礎から最新トレンドまで学べる"架け橋"を提供します。ITリテラシーに自信のない方や、多忙で本格的な学習サイトにアクセスする時間が取りにくい方も、Bridgeを通じて"知識の彼岸"へ自然と一歩を踏み出せるようになることを目指しています。<br /><br />
          </SectionText>
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <SectionTitle>なぜBridgeが必要か</SectionTitle>
          <SectionText>
            新しい知識を身につけるには<Bold>「続けること」</Bold>が大切ですが、忙しい毎日の中で学びを習慣にするのは意外と難しいものです。<br />
            でも、もし<Bold>いつものLINE</Bold>で気軽にAIの話題に触れられたら、学びのハードルはぐっと下がるはず。<br />
            Bridgeは、あなたが普段から使っているLINEを活用することで、AI学習を特別なものではなく、日常の一部にしていきます。<br />
            「気づいたら、自然とAIの知識が身についていた」——そんな新しい学びの習慣を、Bridgeで始めてみませんか？
          </SectionText>
        </SectionContainer>
      </Section>

      <MissionVisionSection>
        <MissionVisionContainer>
          <MVTitle>ミッション</MVTitle>
          <MVText>専門知識がなくても手軽に最新のAI情報を学べる体験提供を通じて、日本のAIに関するリテラシーを向上させる</MVText>
          <MVTitle>ビジョン</MVTitle>
          <MVText>雑談するようにAIについて教えてもらえる「身近なAI学習アシスタント」を通じて、日常にAIを活用する人を増やしていく</MVText>
        </MissionVisionContainer>
      </MissionVisionSection>
      <ButtonWrapper>
        <BackToHomeButton to="/">ホームに戻る</BackToHomeButton>
      </ButtonWrapper>
    </AboutContainer>
  );
};

export default About; 