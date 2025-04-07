import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// ヒーローセクション
const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 40vh;
  padding: var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
  color: var(--white);
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
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: var(--spacing-lg) 0;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--white);
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
`;

const PageDescription = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: var(--font-weight-medium);
  max-width: 800px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
`;

// ミッションセクション
const MissionSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--white);
`;

const SectionContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const MissionCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  border-left: 5px solid var(--primary-color);
`;

const MissionTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
`;

const MissionText = styled.p`
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
`;

// バリューセクション
const ValuesSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--light-bg);
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
`;

const ValueCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--white);
`;

const ValueTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
`;

const ValueDescription = styled.p`
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.6;
`;

// チームセクション
const TeamSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--white);
`;

const TeamMember = styled.div`
  text-align: center;
  margin-top: var(--spacing-xl);
`;

const TeamRole = styled.p`
  font-size: var(--font-size-md);
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
`;

const TeamName = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
`;

const TeamBio = styled.p`
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>私たちのミッション</PageTitle>
          <PageDescription>
            Bridgeは、テクノロジーの進化に取り残されることなく、誰もがAIの可能性を活かせる社会を目指しています。
          </PageDescription>
        </HeroContent>
      </HeroSection>

      <MissionSection>
        <SectionContainer>
          <SectionTitle>私たちの理念</SectionTitle>
          <SectionContent>
            <MissionCard>
              <MissionTitle>ミッション</MissionTitle>
              <MissionText>
                非エンジニア層がAIリテラシーを効率よく高め、テクノロジーの恩恵を受けられる橋渡しをすることで、
                社会全体のデジタルデバイドを減らし、より良い未来を築くことに貢献します。
              </MissionText>
              <MissionText>
                「Bridge」という名前には、AI技術と非エンジニアの間の隔たりを橋渡しするという意味が込められています。
                私たちは、専門知識がなくても理解できる形で情報を提供し、AIの可能性を最大限に活かせる社会を目指しています。
              </MissionText>
            </MissionCard>

            <MissionCard>
              <MissionTitle>ビジョン</MissionTitle>
              <MissionText>
                年齢、職業、教育背景に関わらず、誰もがAIの基本的な仕組みを理解し、
                日常生活やビジネスにおいて自信を持ってAIツールを活用できる世界を創ります。
              </MissionText>
              <MissionText>
                Bridgeを通じて、AIに対する不安や抵抗感を軽減し、テクノロジーの進化に取り残される人がいない社会の実現に貢献します。
              </MissionText>
            </MissionCard>
          </SectionContent>
        </SectionContainer>
      </MissionSection>

      <ValuesSection>
        <SectionContainer>
          <SectionTitle>私たちの価値観</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <ValueIcon>💡</ValueIcon>
              <ValueTitle>分かりやすさ</ValueTitle>
              <ValueDescription>
                専門用語や複雑な概念を避け、誰でも理解できる言葉でAIについて説明します。
                私たちは、すべてのコンテンツが実用的で日常生活に取り入れやすいものであることを大切にしています。
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🤝</ValueIcon>
              <ValueTitle>包括性</ValueTitle>
              <ValueDescription>
                年齢、職業、教育背景に関わらず、すべての人がAIについて学べるコンテンツを提供します。
                多様な視点と経験を尊重し、様々なニーズに応えることを目指しています。
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🔍</ValueIcon>
              <ValueTitle>透明性</ValueTitle>
              <ValueDescription>
                AIの可能性だけでなく、限界や課題についても正直に伝えます。
                バランスの取れた視点を提供し、ユーザーが情報に基づいた判断ができるようサポートします。
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🚀</ValueIcon>
              <ValueTitle>革新性</ValueTitle>
              <ValueDescription>
                常に最新のAI技術と教育方法を取り入れ、ユーザー体験を向上させます。
                フィードバックを積極的に取り入れ、サービスを継続的に改善しています。
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </SectionContainer>
      </ValuesSection>

      <TeamSection>
        <SectionContainer>
          <SectionTitle>チーム紹介</SectionTitle>
          <TeamMember>
            <TeamRole>創業者 / CEO</TeamRole>
            <TeamName>渡辺 健太郎</TeamName>
            <TeamBio>
              AIとHRテクノロジーの分野で10年以上の経験を持つ。
              テクノロジーの恩恵を社会全体に広げるというビジョンの下、Bridgeを創業。
              「誰もが簡単にAIを理解し活用できる社会」の実現を目指している。
            </TeamBio>
          </TeamMember>
        </SectionContainer>
      </TeamSection>
    </AboutContainer>
  );
};

export default About; 