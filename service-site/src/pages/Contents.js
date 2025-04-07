import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentsContainer = styled.div`
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

// コンテンツセクション
const ContentSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--white);
`;

const SectionContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

// フィルターコンポーネント
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--light-bg)'};
  }
`;

// 検索コンポーネント
const SearchContainer = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  transition: all var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(88, 52, 173, 0.2);
  }
`;

// コンテンツグリッド
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
`;

const ContentCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ContentImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  position: relative;
  overflow: hidden;
`;

const CategoryTag = styled.span`
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: rgba(0, 0, 0, 0.6);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
`;

const ContentInfo = styled.div`
  padding: var(--spacing-lg);
`;

const ContentTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
`;

const ContentDescription = styled.p`
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
`;

const ContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
`;

const ContentDate = styled.span``;

const ContentLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::after {
    content: '→';
    margin-left: var(--spacing-xs);
    transition: transform var(--transition-fast);
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

// モックデータ
const contentData = [
  {
    id: 1,
    title: 'AIの基礎知識',
    description: 'AIとは何か、どのように機能するのか、基本的な概念を分かりやすく解説します。',
    category: '基礎知識',
    date: '2023.10.15',
    url: '/contents/ai-basics'
  },
  {
    id: 2,
    title: 'ビジネスでのAI活用法',
    description: '業務効率化からマーケティングまで、ビジネスシーンでのAI活用方法を紹介します。',
    category: 'ビジネス',
    date: '2023.10.22',
    url: '/contents/business-ai'
  },
  {
    id: 3,
    title: 'AIとの上手な対話方法',
    description: 'AIから最適な回答を得るためのプロンプトの書き方や対話のコツを解説します。',
    category: 'スキル',
    date: '2023.10.29',
    url: '/contents/prompt-engineering'
  },
  {
    id: 4,
    title: 'ChatGPTの基本的な使い方',
    description: 'ChatGPTの基本機能と効果的な使い方を初心者向けに解説します。',
    category: 'ツール',
    date: '2023.11.05',
    url: '/contents/chatgpt-basics'
  },
  {
    id: 5,
    title: 'AI画像生成入門',
    description: 'Midjourney、Stable Diffusionなど、AI画像生成ツールの基本を学びます。',
    category: 'ツール',
    date: '2023.11.12',
    url: '/contents/ai-image-generation'
  },
  {
    id: 6,
    title: 'AIの歴史と発展',
    description: 'AIの歴史的な発展と現在のトレンド、未来の可能性について解説します。',
    category: '基礎知識',
    date: '2023.11.19',
    url: '/contents/ai-history'
  },
  {
    id: 7,
    title: 'AIと著作権',
    description: 'AI生成コンテンツに関する著作権問題と法的な考慮事項について解説します。',
    category: '法律',
    date: '2023.11.26',
    url: '/contents/ai-copyright'
  },
  {
    id: 8,
    title: 'AI倫理の基本',
    description: 'AIの倫理的な課題と、責任ある使用方法について考えます。',
    category: '倫理',
    date: '2023.12.03',
    url: '/contents/ai-ethics'
  },
  {
    id: 9,
    title: 'LINEボットの作り方',
    description: 'プログラミング経験がなくても作れるLINEボットの基本を解説します。',
    category: 'ツール',
    date: '2023.12.10',
    url: '/contents/line-bot'
  }
];

const Contents = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['all', '基礎知識', 'ビジネス', 'スキル', 'ツール', '法律', '倫理'];
  
  const filteredContent = contentData.filter(content => {
    const matchesFilter = activeFilter === 'all' || content.category === activeFilter;
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          content.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ContentsContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>コンテンツ一覧</PageTitle>
          <PageDescription>
            AIについて学ぶための厳選されたコンテンツをご紹介します。
            基礎知識から実践的な活用法まで、あなたのレベルに合わせてお選びください。
          </PageDescription>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionContainer>
          <FilterContainer>
            {categories.map(category => (
              <FilterButton 
                key={category}
                active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
              >
                {category === 'all' ? 'すべて' : category}
              </FilterButton>
            ))}
          </FilterContainer>
          
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="キーワードで検索..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <ContentGrid>
            {filteredContent.map(content => (
              <ContentCard key={content.id}>
                <ContentImage>
                  <CategoryTag>{content.category}</CategoryTag>
                </ContentImage>
                <ContentInfo>
                  <ContentTitle>{content.title}</ContentTitle>
                  <ContentDescription>
                    {content.description}
                  </ContentDescription>
                  <ContentMeta>
                    <ContentDate>{content.date}</ContentDate>
                    <ContentLink to={content.url}>詳しく見る</ContentLink>
                  </ContentMeta>
                </ContentInfo>
              </ContentCard>
            ))}
          </ContentGrid>
        </SectionContainer>
      </ContentSection>
    </ContentsContainer>
  );
};

export default Contents; 