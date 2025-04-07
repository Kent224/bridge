import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
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

// 利用規約のコンテンツ
const ContentSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--white);
`;

const SectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TermsSection = styled.div`
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

const List = styled.ol`
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
`;

const ListItem = styled.li`
  font-size: var(--font-size-md);
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
`;

const SubList = styled.ol`
  list-style-type: lower-alpha;
  padding-left: var(--spacing-lg);
  margin: var(--spacing-sm) 0 var(--spacing-md) 0;
`;

const UpdateDate = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: var(--spacing-xxl);
  font-style: italic;
`;

const Terms = () => {
  return (
    <TermsContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>利用規約</PageTitle>
          <PageDescription>
            Bridgeのサービスをご利用いただく際の条件と規約について説明します
          </PageDescription>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionContainer>
          <TermsSection>
            <SectionTitle>1. はじめに</SectionTitle>
            <SectionContent>
              <Paragraph>
                この利用規約（以下「本規約」といいます）は、Bridge（以下「当社」といいます）が提供するウェブサイト、LINEサービス、およびその他のサービス（以下総称して「本サービス」といいます）の利用条件を定めるものです。本サービスをご利用いただく際には、本規約に同意したものとみなされます。
              </Paragraph>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>2. サービスの利用</SectionTitle>
            <SectionContent>
              <Paragraph>
                本サービスを利用するにあたり、以下の点にご同意いただきます：
              </Paragraph>
              <List>
                <ListItem>利用者は日本国内に居住する方に限ります。</ListItem>
                <ListItem>当社が定める方法により、本サービスの利用登録を行う必要があります。</ListItem>
                <ListItem>登録情報は正確かつ最新の情報を提供していただきます。</ListItem>
                <ListItem>第三者に自分のアカウント情報を使用させないでください。</ListItem>
                <ListItem>本サービスの利用に関連して適用される法律や規制を遵守していただきます。</ListItem>
              </List>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>3. 禁止事項</SectionTitle>
            <SectionContent>
              <Paragraph>
                本サービスを利用するにあたり、以下の行為を禁止します：
              </Paragraph>
              <List>
                <ListItem>法令または公序良俗に違反する行為</ListItem>
                <ListItem>犯罪に関連する行為</ListItem>
                <ListItem>当社または第三者の知的財産権、名誉権、プライバシー権、その他の権利または利益を侵害する行為</ListItem>
                <ListItem>本サービスの運営を妨害する行為</ListItem>
                <ListItem>本サービスのネットワークやシステムに過度の負荷をかける行為</ListItem>
                <ListItem>当社または第三者になりすます行為</ListItem>
                <ListItem>他の利用者のアカウント情報を収集する行為</ListItem>
                <ListItem>当社が許可していない宣伝、広告、勧誘、営業行為</ListItem>
                <ListItem>他の利用者に対する嫌がらせや誹謗中傷を行う行為</ListItem>
                <ListItem>その他、当社が不適切と判断する行為</ListItem>
              </List>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>4. 知的財産権</SectionTitle>
            <SectionContent>
              <Paragraph>
                本サービスに関連するすべての知的財産権は当社または当社にライセンスを許諾している第三者に帰属します。本規約は、利用者に対して当社または第三者の知的財産権を譲渡または使用許諾するものではありません。
              </Paragraph>
              <Paragraph>
                利用者が本サービス上でコンテンツを投稿した場合、当該コンテンツに関する権利は利用者に帰属します。ただし、当社は本サービスの提供・運営・改善・宣伝のために、世界的、非独占的、無償、サブライセンス可能かつ譲渡可能な使用、複製、配布、派生著作物の作成、表示及び実行に関するライセンスを付与されるものとします。
              </Paragraph>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>5. 免責事項</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は、本サービスに関して、以下の事項について一切の責任を負いません：
              </Paragraph>
              <List>
                <ListItem>本サービスの内容の正確性、完全性、有用性等</ListItem>
                <ListItem>本サービスの中断、停止、終了、利用不能または変更</ListItem>
                <ListItem>利用者のデータの消失または機器の故障</ListItem>
                <ListItem>本サービスを通じた第三者との取引または連絡</ListItem>
                <ListItem>その他本サービスに関連して発生した損害</ListItem>
              </List>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>6. サービスの変更・中断・終了</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は、以下の場合に本サービスの全部または一部の提供を中断または停止することがあります：
              </Paragraph>
              <List>
                <ListItem>システムの保守点検または更新を行う場合</ListItem>
                <ListItem>地震、落雷、火災、停電、天災などの不可抗力により本サービスの提供が困難になった場合</ListItem>
                <ListItem>コンピュータまたは通信回線等が事故により停止した場合</ListItem>
                <ListItem>その他、当社が本サービスの提供が困難と判断した場合</ListItem>
              </List>
              <Paragraph>
                当社は、本サービスの提供の中断または停止により、利用者または第三者が被ったいかなる不利益または損害について、一切の責任を負わないものとします。
              </Paragraph>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>7. 利用規約の変更</SectionTitle>
            <SectionContent>
              <Paragraph>
                当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することがあります。変更後の利用規約は、当社ウェブサイト上に表示した時点から効力を生じるものとします。本規約の変更後に本サービスを利用した場合、利用者は変更後の規約に同意したものとみなされます。
              </Paragraph>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>8. 通知または連絡</SectionTitle>
            <SectionContent>
              <Paragraph>
                利用者と当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、利用者が登録した連絡先に通知または連絡を行った場合、利用者に通知または連絡が到達したものとみなします。
              </Paragraph>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionTitle>9. 準拠法と管轄裁判所</SectionTitle>
            <SectionContent>
              <Paragraph>
                本規約の解釈および適用は、日本国法に準拠するものとします。本サービスに関連して当社と利用者との間で紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </Paragraph>
            </SectionContent>
          </TermsSection>

          <UpdateDate>最終更新日: 2023年4月7日</UpdateDate>
        </SectionContainer>
      </ContentSection>
    </TermsContainer>
  );
};

export default Terms; 