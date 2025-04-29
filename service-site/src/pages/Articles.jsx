import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { articles as defaultArticles } from '../data/articles';

// スタイル定義
const PageContainer = styled.div``;

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

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--white);
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  
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
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    gap: var(--spacing-md);
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    width: 100%;
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
    padding: calc(var(--spacing-sm) * 0.8) var(--spacing-md);
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
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
  
  ${ArticleCard}:hover & img:not([src*="note.com"]) {
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
  position: relative;
  min-height: 280px;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
    min-height: 260px;
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
  width: 100%;
  display: block;
  margin-bottom: var(--spacing-lg);
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
`;

const ArticleTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
  width: 100%;
  padding: 0;
  
  a {
    color: inherit;
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
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: 80px;
  flex: 1;
  width: 100%;
  padding: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--white);
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: bold;
  width: 60%;
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    right: 24px;
    width: 16px;
    height: 2px;
    background: var(--white);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &::before {
    content: "";
    position: absolute;
    right: 24px;
    width: 8px;
    height: 8px;
    border-right: 2px solid var(--white);
    border-top: 2px solid var(--white);
    transform: rotate(45deg) scale(0);
    opacity: 0;
    transition: all 0.3s ease;
  }

  ${ArticleCard}:hover & {
    padding-right: 48px;
    
    &::after {
      transform: scaleX(1);
    }

    &::before {
      transform: rotate(45deg) scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    bottom: var(--spacing-md);
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

const ArticleCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  
  &:hover {
    text-decoration: none;
  }
`;

// 記事一覧ページコンポーネント
const Articles = () => {
  const [articles] = useState(defaultArticles);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // カテゴリーの一覧を取得
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  // 記事をフィルタリング
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer>
      <HeroSection>
        <PageTitle>Articles</PageTitle>
        <PageDescription>
          生成AIに関する最新の記事を紹介します。
        </PageDescription>
      </HeroSection>

      <ContentSection>
        <Container>
          <FilterBar>
            <Categories>
              {categories.map(category => (
                <CategoryButton
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'すべて' : category}
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
                <ArticleCardLink to={`/articles/${article.slug}`}>
                  <ArticleImage>
                    <img src={article.image} alt={article.title} />
                    <ArticleCategory>{article.category}</ArticleCategory>
                  </ArticleImage>
                  <ArticleContent>
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ArticleDate>{article.date}</ArticleDate>
                    <ArticleExcerpt>
                      {article.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
                    </ArticleExcerpt>
                    <ReadMoreButton>続きを読む</ReadMoreButton>
                  </ArticleContent>
                </ArticleCardLink>
              </ArticleCard>
            ))}
          </ArticlesGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

export default Articles; 