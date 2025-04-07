import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

// スタイル定義
const PageContainer = styled.div`
  padding-top: var(--header-height);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
  padding: calc(var(--spacing-xl) * 2) var(--spacing-lg);
  color: var(--white);
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 5vw, 2.5rem);
  }
`;

const PageDescription = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    padding: 0 var(--spacing-sm);
  }
`;

const ContentSection = styled.section`
  padding: calc(var(--spacing-xl) * 3) var(--spacing-lg);
  background: var(--white);
  
  @media (max-width: 768px) {
    padding: calc(var(--spacing-xl) * 1.5) var(--spacing-md);
  }
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: var(--spacing-md);
    overflow-x: auto;
    padding-bottom: var(--spacing-xs);
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--light-bg)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-secondary)'};
  border: none;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--gray-200)'};
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(88, 52, 173, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: var(--spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
`;

const ArticleCard = styled.article`
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const ArticleImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
  
  ${ArticleCard}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ArticleCategory = styled.span`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background: var(--primary-color);
  color: var(--white);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  z-index: 2;
`;

const ArticleSource = styled.span`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: ${props => props.type === 'note' ? '#41C9B4' : 'var(--primary-color)'};
  color: var(--white);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  z-index: 2;
`;

const ArticleContent = styled.div`
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
`;

const ArticleDate = styled.span`
  margin-right: var(--spacing-md);
`;

const ArticleTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  @media (max-width: 768px) {
    font-size: calc(var(--font-size-md) * 1.1);
  }
`;

const ArticleExcerpt = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex: 1;
`;

const ArticleReadMore = styled(Link)`
  font-size: var(--font-size-sm);
  color: var(--primary-color);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  display: inline-flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  span {
    margin-left: 4px;
    transition: transform var(--transition-fast);
  }
  
  &:hover span {
    transform: translateX(3px);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: calc(var(--spacing-xl) * 2);
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-xl);
    flex-wrap: wrap;
  }
`;

const PageButton = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--gray-200)'};
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--light-bg)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

// 記事一覧ページコンポーネント
const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  
  // カテゴリーの一覧を記事データから抽出
  const uniqueCategories = [...new Set(articles.map(article => article.category))];
  const categories = ['すべて', ...uniqueCategories];
  
  // カテゴリーと検索クエリによるフィルタリング
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'すべて' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 記事の抜粋を生成する関数
  const generateExcerpt = (content, maxLength = 150) => {
    // HTMLタグを除去
    const textContent = content.replace(/<[^>]*>/g, '');
    // 指定された長さで切り取り
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  return (
    <PageContainer>
      <HeroSection>
        <PageTitle>AI関連記事</PageTitle>
        <PageDescription>
          AI技術に関する最新情報や基礎知識、活用方法など、さまざまなコンテンツをご紹介します。
        </PageDescription>
      </HeroSection>
      
      <ContentSection>
        <Container>
          <FilterBar>
            <Categories>
              {categories.map(category => (
                <CategoryButton 
                  key={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </Categories>
            
            <SearchBar>
              <SearchInput 
                type="text" 
                placeholder="記事を検索..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon>🔍</SearchIcon>
            </SearchBar>
          </FilterBar>
          
          <ArticlesGrid>
            {filteredArticles.map(article => (
              <ArticleCard key={article.id}>
                <ArticleImage>
                  <img src={article.image} alt={article.title} />
                  <ArticleCategory>{article.category}</ArticleCategory>
                  {article.source && (
                    <ArticleSource type={article.source.type}>
                      {article.source.type === 'note' && 'note記事'}
                    </ArticleSource>
                  )}
                </ArticleImage>
                <ArticleContent>
                  <ArticleMeta>
                    <ArticleDate>{article.date}</ArticleDate>
                  </ArticleMeta>
                  <ArticleTitle>
                    <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                  </ArticleTitle>
                  <ArticleExcerpt>{generateExcerpt(article.content)}</ArticleExcerpt>
                  <ArticleReadMore to={`/articles/${article.slug}`}>
                    続きを読む<span>→</span>
                  </ArticleReadMore>
                </ArticleContent>
              </ArticleCard>
            ))}
          </ArticlesGrid>
          
          <Pagination>
            <PageButton disabled>«</PageButton>
            <PageButton active>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>»</PageButton>
          </Pagination>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

export default Articles; 