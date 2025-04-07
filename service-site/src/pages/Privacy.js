import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
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
  min-height: 30vh;
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

// プライバシーポリシーのコンテンツ
const ContentSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--white);
`;

const SectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PolicySection = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--primary-color);
`;

const SectionContent = styled.div`
  color: var(--text-secondary);
`;

const Paragraph = styled.p`
  font-size: var(--font-size-md);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
`;

const List = styled.ul`
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
`;

const ListItem = styled.li`
  font-size: var(--font-size-md);
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
`;

const UpdateDate = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: var(--spacing-xxl);
  font-style: italic;
`;

const Privacy = () => {
  return (
    <PrivacyContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>プライバシーポリシー</PageTitle>
          <PageDescription>
            Bridgeがどのようにお客様の個人情報を取り扱うかについて説明します
          </PageDescription>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionContainer>
          <PolicySection>
            <SectionTitle>1. はじめに</SectionTitle>
            <SectionContent>
              <Paragraph>
                Bridge（以下「当社」といいます）は、お客様のプライバシーを尊重し、個人情報保護に関する法令を遵守することをお約束します。本プライバシーポリシーでは、当社がどのようにお客様の個人情報を収集、使用、共有するかについて説明します。
              </Paragraph>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>2. 収集する情報</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は以下の情報を収集することがあります：
              </Paragraph>
              <List>
                <ListItem>LINE IDやアカウント情報など、ユーザー登録時に提供される情報</ListItem>
                <ListItem>サービス利用時に自動的に収集される情報（アクセスログ、IPアドレス、デバイス情報など）</ListItem>
                <ListItem>お問い合わせやフィードバックを通じて提供される情報</ListItem>
                <ListItem>サービス利用状況やコンテンツの閲覧履歴</ListItem>
              </List>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>3. 情報の利用目的</SectionTitle>
            <SectionContent>
              <Paragraph>
                収集した情報は以下の目的で利用します：
              </Paragraph>
              <List>
                <ListItem>サービスの提供、維持、改善</ListItem>
                <ListItem>お客様からのお問い合わせへの対応</ListItem>
                <ListItem>新機能やサービスのお知らせ</ListItem>
                <ListItem>サービスのパーソナライズと改善</ListItem>
                <ListItem>不正利用の検知と防止</ListItem>
              </List>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>4. 情報の共有</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は、以下の場合を除き、お客様の個人情報を第三者と共有することはありません：
              </Paragraph>
              <List>
                <ListItem>お客様の同意がある場合</ListItem>
                <ListItem>法律上の要請や義務がある場合</ListItem>
                <ListItem>サービス提供に必要なパートナー企業と共有する場合（これらの企業は当社のプライバシーポリシーに従って情報を取り扱います）</ListItem>
                <ListItem>当社の権利、財産、安全を保護するために必要な場合</ListItem>
              </List>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>5. 情報の保護</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は、お客様の個人情報を保護するために適切な技術的・組織的対策を講じています。しかし、インターネット上のデータ送信や電子ストレージは100%安全ではないことをご理解ください。
              </Paragraph>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>6. Cookieの使用</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社のウェブサイトではCookieを使用してユーザー体験を向上させています。お客様はブラウザの設定でCookieの使用を制限することができますが、一部のサービス機能に影響が出る可能性があります。
              </Paragraph>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>7. お客様の権利</SectionTitle>
            <SectionContent>
              <Paragraph>
                お客様には以下の権利があります：
              </Paragraph>
              <List>
                <ListItem>個人情報へのアクセス要求</ListItem>
                <ListItem>不正確な情報の訂正要求</ListItem>
                <ListItem>個人情報の削除要求</ListItem>
                <ListItem>データ処理の制限要求</ListItem>
                <ListItem>データポータビリティの要求</ListItem>
              </List>
              <Paragraph>
                これらの権利行使については、下記のお問い合わせ先までご連絡ください。
              </Paragraph>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>8. プライバシーポリシーの変更</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、サービス内の通知またはメールでお知らせします。
              </Paragraph>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionTitle>9. お問い合わせ</SectionTitle>
            <SectionContent>
              <Paragraph>
                プライバシーに関するご質問やご懸念がある場合は、LINE公式アカウントを通じてお問い合わせください。
              </Paragraph>
            </SectionContent>
          </PolicySection>

          <UpdateDate>最終更新日: 2023年4月7日</UpdateDate>
        </SectionContainer>
      </ContentSection>
    </PrivacyContainer>
  );
};

export default Privacy; 